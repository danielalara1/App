import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '20px' }}>
      <header className="home-header">
        <h1 className="main-title" style={{ fontSize: '8rem', marginBottom: '10px' }}>404</h1>
        <h2 style={{ color: 'var(--text)', fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>
          ¡Ups! Vibe No Encontrada ✦
        </h2>
        <p style={{ color: 'var(--text-subtle)', maxWidth: '400px', margin: '0 auto 32px', fontWeight: 600, lineHeight: 1.6 }}>
          La página que buscas no existe, ha cambiado de lugar o se ha desconfigurado por el camino.
        </p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Volver a la Galería
        </button>
      </header>
    </div>
  );
};

export default NotFound;