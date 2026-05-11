import React, { useState, useEffect, useRef } from "react"; 
import axios from "axios";
import { auth, loginWithGoogle, logout } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

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

  const deleteVibe = async (id: string) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(`${API_URL}/api/vibes/${id}`);
      setVibes((prev) => prev.filter((v) => v._id !== id));
    } catch {
      console.error("Error deleting");
    }
  };

  const filteredVibes = view === "all" ? vibes : vibes.filter(v => v.userEmail === user?.email);

  return (
    <div className="home-container">
      <Navbar 
        onExploreClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })} 
        onUploadClick={() => setIsModalOpen(true)} 
        user={user} onLogin={loginWithGoogle} onLogout={logout} 
      />
      
      <header className="home-header">
        <h2 className="main-title">Batnie</h2>
        <div className="header-actions">
          <button onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn-secondary">
            Explore
          </button>
          {user && (
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              Upload Vibe
            </button>
          )}
        </div>
      </header>

      <main ref={sectionRef} className="content-main">
        <div className="view-selector">
          <button onClick={() => setView("all")} className={view === "all" ? "active" : ""}>
            All Vibes
          </button>
          <button onClick={() => setView("mine")} className={view === "mine" ? "active" : ""}>
            My Uploads
          </button>
        </div>

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="vibes-grid">
            {filteredVibes.map((vibe) => (
              <VibeCard 
                key={vibe._id} 
                id={vibe._id} 
                title={vibe.title} 
                category={vibe.category} 
                image={vibe.imageUrl} 
                mediaUrl={vibe.mediaUrl} 
                onDelete={deleteVibe} 
                showDelete={!!user && user.email === vibe.userEmail} 
              />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleUpload} className="upload-form">
              <input type="text" placeholder="Title" required value={newVibe.title} onChange={e => setNewVibe({...newVibe, title: e.target.value})} />
              <input type="text" placeholder="Category" required value={newVibe.category} onChange={e => setNewVibe({...newVibe, category: e.target.value})} />
              <input type="url" placeholder="Image URL" required value={newVibe.imageUrl} onChange={e => setNewVibe({...newVibe, imageUrl: e.target.value})} />
              <input type="text" placeholder="Source URL" required value={newVibe.mediaUrl} onChange={e => setNewVibe({...newVibe, mediaUrl: e.target.value})} />
              <button type="submit" className="btn-submit">Post Vibe</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;