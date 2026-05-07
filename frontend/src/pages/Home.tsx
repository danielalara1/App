import { useState, useEffect, useRef } from "react"; 
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

// --- CONFIGURACIÓN ---
// Asegúrate de que esta URL sea la de tu puerto 5000 de hoy
const API_URL = 'https://8wlzgqn7-5000.uks1.devtunnels.ms'; 

interface Vibe {
  _id: string;         
  title: string;
  category: string;
  imageUrl: string;
  mediaUrl: string;
}

const Home = () => {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Estados para el botón Explore
  const [limit, setLimit] = useState(4); 
  const sectionRef = useRef<HTMLDivElement>(null);

  // Función para bajar suavemente y mostrar más fotos
  const handleExplore = () => {
    setLimit(100); 
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  
  // Función para borrar (Corregida para evitar el error de 'any')
  const deleteVibe = async (id: string) => {
    if (window.confirm("¿Seguro que quieres borrar esta pieza?")) {
      try {
        await axios.delete(`${API_URL}/api/vibes/${id}`);
        setVibes((prev) => prev.filter((v) => v._id !== id));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error";
        console.error("Error al borrar:", msg);
        alert("No se pudo eliminar la Vibe");
      }
    }
  };

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/vibes`);
        
        if (response.data.length === 0) {
          setVibes([{
            _id: "1",
            title: "Inspiración Cyberpunk",
            category: "Dibujo",
            imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
            mediaUrl: "https://spotify.com"
          }]);
        } else {
          setVibes(response.data);
        }
      } catch (err) {
        console.error("Error conectando con el backend:", err);
        setError("No se pudo conectar con el servidor de Batnie.");
      } finally {
        setLoading(false);
      }
    };
    fetchVibes();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
      <Navbar />
      
      {/* SECCIÓN HERO (PORTADA) */}
      <header className="h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Efecto de luz de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full"></div>
        
        <h2 className="text-8xl md:text-9xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent animate-in fade-in zoom-in duration-1000">
          Batnie
        </h2>
        
        <p className="text-zinc-500 mt-8 uppercase tracking-[0.5em] text-[10px] font-bold">
          Creative Hub & Multidisciplinary Ecosystem
        </p>
        
        <button 
          onClick={handleExplore}
          className="mt-16 px-10 py-4 border border-zinc-800 text-zinc-400 hover:border-purple-500 hover:text-white transition-all duration-500 rounded-full font-bold tracking-[0.2em] text-[10px] uppercase group relative overflow-hidden"
        >
          <span className="relative z-10">Explore Project</span>
          <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main ref={sectionRef} className="max-w-7xl mx-auto p-8 pt-32 pb-40">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl text-center">
            <p className="text-red-500 font-mono text-xs tracking-widest uppercase">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-6 mb-16">
                <div className="h-[1px] w-16 bg-gradient-to-r from-purple-500 to-transparent"></div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">Latest Works</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {vibes.slice(0, limit).map((vibe) => (
                <VibeCard 
                  key={vibe._id} 
                  id={vibe._id}
                  title={vibe.title} 
                  category={vibe.category} 
                  image={vibe.imageUrl}
                  mediaUrl={vibe.mediaUrl}
                  onDelete={deleteVibe} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 text-center border-t border-zinc-900/50">
        <p className="text-zinc-700 text-[9px] tracking-[0.3em] uppercase">© 2024 Design by Batnie Team</p>
      </footer>
    </div>
  );
};

export default Home;