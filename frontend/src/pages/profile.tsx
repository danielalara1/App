import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../index.css";

const API_URL = 'https://8wlzgqn7-5000.uks1.devtunnels.ms';

interface Vibe {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  userEmail?: string;
}

const Profile: React.FC = () => {
  const [myVibes, setMyVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
 const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userLogged) => {
      if (!userLogged) {
        navigate("/");
      } else {
        try {
          const { data } = await axios.get(`${API_URL}/api/vibes`);
          const userVibes = data.filter((v: Vibe) => v.userEmail === userLogged.email);
          setMyVibes(userVibes);
        } catch (error) {
          console.error("Error cargando tus vibes", error);
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

 if (!currentUser) return null;

  return (
    <div className="home-container">
      <nav className="topbar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>← VOLVER A BATNIE</div>
        <button className="btn-secondary" onClick={() => logout()}>Logout</button>
      </nav>

      <header className="home-header" style={{ padding: '40px 20px 20px' }}>
        <img 
          src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email || 'User'}`} 
          alt="Avatar" 
          style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid var(--pink)', marginBottom: '16px' }}
        />
        <h1 className="main-title" style={{ fontSize: '2.5rem' }}>{currentUser.displayName || 'Usuario'}</h1>
        <p style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>{currentUser.email}</p>
      </header>

      <main className="content-main">
        <h2 style={{ marginBottom: '20px', color: 'var(--text)', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Mi Colección Personal ({myVibes.length})
        </h2>

        {loading ? (
          <div className="loader">Cargando tus publicaciones...</div>
        ) : (
          <div className="vibes-grid">
            {myVibes.map((vibe) => (
              <div key={vibe._id} className="vibe-card">
                <img src={vibe.imageUrl} alt={vibe.title} />
                <div className="vibe-info">
                  <p>{vibe.category}</p>
                  <h3>{vibe.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;