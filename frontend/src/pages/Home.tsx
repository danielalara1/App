import React, { useState, useEffect, useRef } from "react"; 
import axios from "axios";
import { auth, loginWithGoogle, logout } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import "./vibes-cute.css";

const API_URL = 'https://8wlzgqn7-5000.uks1.devtunnels.ms'; 

interface Vibe {
  _id: string;         
  title: string;
  category: string;
  imageUrl: string;
  mediaUrl: string;
  userEmail?: string; 
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<"all" | "mine">("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newVibe, setNewVibe] = useState({ title: "", category: "", imageUrl: "", mediaUrl: "" });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
      setUser(currentUser); 
    });
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/vibes`);
        setVibes(data);
      } catch {
        console.error("Error loading vibes");
      } finally {
        setLoading(false);
      }
    })();
    return () => unsubscribe();
  }, []); 

  const handleOpenUpload = () => {
    if (!user) {
      loginWithGoogle();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await axios.post(`${API_URL}/api/vibes`, { ...newVibe, userEmail: user.email });
      setIsModalOpen(false);
      setNewVibe({ title: "", category: "", imageUrl: "", mediaUrl: "" });
      const { data } = await axios.get(`${API_URL}/api/vibes`);
      setVibes(data);
    } catch {
      alert("Error uploading");
    }
  };

  const deleteVibe = async (id: string, vibeEmail?: string) => {
    if (!user || user.email !== vibeEmail) {
      alert("No tienes permiso para eliminar esta publicación.");
      return;
    }
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) return;
    try {
      await axios.delete(`${API_URL}/api/vibes/${id}`);
      setVibes((prev) => prev.filter((v) => v._id !== id));
    } catch {
      console.error("Error al eliminar");
    }
  };

  const filteredVibes = view === "all"
    ? vibes
    : vibes.filter(v => user && v.userEmail === user.email);

  return (
    <div className="home-container">
      <nav className="topbar">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BATNIE.
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <button className="btn-primary" onClick={handleOpenUpload}>+ Upload</button>
              <div className="user-profile" onClick={logout} title="Click to Logout">
                <span className="user-name-small">{user.displayName || user.email?.split('@')[0]}</span>
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=a855f7&color=fff`} 
                  alt="profile" 
                  className="user-avatar"
                />
              </div>
            </div>
          ) : (
            <button className="btn-primary" onClick={handleOpenUpload}>Login & Upload</button>
          )}
        </div>
      </nav>
      
      <header className="home-header">
        <h1 className="main-title">Batnie</h1>
      </header>

      <main ref={sectionRef} className="content-main">
        <div className="view-selector">
          <button onClick={() => setView("all")} className={view === "all" ? "active" : ""}>
            All Vibes
          </button>
          {user && (
            <button onClick={() => setView("mine")} className={view === "mine" ? "active" : ""}>
              My Collection
            </button>
          )}
        </div>

        {loading ? (
          <div className="loader">Loading Gallery...</div>
        ) : (
          <div className="vibes-grid">
            {filteredVibes.map((vibe) => (
              <div 
                key={vibe._id} 
                className="vibe-card"
                onClick={() => setSelectedImage(vibe.imageUrl)}
              >
                <img src={vibe.imageUrl} alt={vibe.title} loading="lazy" />
                <div className="vibe-info">
                  <p>{vibe.category}</p>
                  <h3>{vibe.title}</h3>
                  {user && user.email === vibe.userEmail && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVibe(vibe._id, vibe.userEmail);
                      }}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedImage && (
        <div className="zoom-overlay" onClick={() => setSelectedImage(null)}>
          <div className="expanded-container">
            <img src={selectedImage} className="expanded-img" alt="zoom view" />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">New Vibe ✦</h2>
            <form onSubmit={handleUpload} className="upload-form">
              <input type="text" placeholder="Title" required value={newVibe.title} onChange={e => setNewVibe({...newVibe, title: e.target.value})} />
              <input type="text" placeholder="Category" required value={newVibe.category} onChange={e => setNewVibe({...newVibe, category: e.target.value})} />
              <input type="url" placeholder="Image URL" required value={newVibe.imageUrl} onChange={e => setNewVibe({...newVibe, imageUrl: e.target.value})} />
              <input type="text" placeholder="Source URL" required value={newVibe.mediaUrl} onChange={e => setNewVibe({...newVibe, mediaUrl: e.target.value})} />
              <button type="submit" className="btn-submit">Post to Gallery</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;