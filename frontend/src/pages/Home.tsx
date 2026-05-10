import { useState, useEffect, useRef } from "react"; 
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

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
  const [limit, setLimit] = useState(4);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);

  const handleExplore = () => {
    setLimit(100); 
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const deleteVibe = async (id: string) => {
    if (window.confirm("¿Seguro que quieres borrar esta pieza?")) {
      try {
        await axios.delete(`${API_URL}/api/vibes/${id}`);
        setVibes((prev) => prev.filter((v) => v._id !== id));
        // Si borramos la que está abierta, cerramos el modal
        if (selectedVibe?._id === id) setSelectedVibe(null);
      } catch (err) {
        console.error("Error al borrar", err);
      }
    }
  };

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/vibes`);
        setVibes(response.data);
      } catch (err) {
        console.error(err);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };
    fetchVibes();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      
      <header className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Batnie
        </h2>
        <button onClick={handleExplore} className="mt-12 px-8 py-3 border border-purple-500/50 text-purple-400 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-purple-500/10 transition-all">
          Explore
        </button>
      </header>

      <main ref={sectionRef} className="max-w-7xl mx-auto p-8 pt-24">
        {loading ? (
           <div className="text-center py-20 text-zinc-500 animate-pulse">Cargando inspiración...</div>
        ) : error ? (
           <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {vibes.slice(0, limit).map((vibe) => (
              <div key={vibe._id} onClick={() => setSelectedVibe(vibe)}>
                <VibeCard 
                  id={vibe._id}
                  title={vibe.title} 
                  category={vibe.category} 
                  image={vibe.imageUrl}
                  mediaUrl={vibe.mediaUrl}
                  onDelete={deleteVibe} 
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL ESTILO PINTEREST */}
      {selectedVibe && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm transition-all"
          onClick={() => setSelectedVibe(null)} 
        >
          <div 
            className="relative max-w-5xl w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Imagen Izquierda */}
            <div className="md:w-2/3 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedVibe.imageUrl} 
                alt={selectedVibe.title} 
                className="max-h-[90vh] w-full object-contain"
              />
            </div>

            {/* Info Derecha */}
            <div className="md:w-1/3 p-8 flex flex-col justify-between bg-zinc-900">
              <div>
                <div className="flex justify-end md:justify-start">
                    <button 
                    onClick={() => setSelectedVibe(null)}
                    className="text-zinc-500 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                    ✕ Cerrar
                    </button>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 leading-tight">{selectedVibe.title}</h3>
                <p className="text-purple-500 font-mono text-xs uppercase tracking-[0.3em] mb-8">{selectedVibe.category}</p>
                <div className="h-[1px] w-12 bg-zinc-700 mb-8"></div>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Esta pieza ha sido seleccionada para el ecosistema de Batnie. Explora la visión del artista y la narrativa detrás de esta creación única.
                </p>
              </div>

              <div className="mt-12">
                <a 
                    href={selectedVibe.mediaUrl.startsWith('http') ? selectedVibe.mediaUrl : `https://${selectedVibe.mediaUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-black text-center py-4 rounded-full font-bold hover:bg-zinc-200 transition-all uppercase text-[10px] tracking-widest"
                >
                    Visitar Fuente Original ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;