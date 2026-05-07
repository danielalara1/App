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
  
  // Estado para controlar cuántas imágenes se ven al principio
  const [limit, setLimit] = useState(4); 
  // Referencia para que el botón "Explore" sepa a dónde bajar
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    // Al pulsar, mostramos "todas" (un número alto) y bajamos la pantalla
    setLimit(100); 
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/vibes`);
        
        if (response.data.length === 0) {
          // Datos de prueba por si la base de datos está vacía
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
      } catch (error) {
        console.error("Error conectando con el backend:", error);
        setError("No se pudo conectar con el servidor de Batnie.");
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
        <p className="text-zinc-500 mt-6 uppercase tracking-[0.4em] text-[10px] font-bold">
          Creative Hub & Multidisciplinary Ecosystem
        </p>
        
        <button 
          onClick={handleExplore}
          className="mt-12 px-8 py-3 border border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-500 rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-lg shadow-purple-500/10"
        >
          Explore
        </button>
      </header>

      <main ref={sectionRef} className="max-w-7xl mx-auto p-8 pt-24">
        {loading && (
          <div className="flex justify-center py-20">
            <p className="animate-pulse text-purple-500 tracking-widest text-xs uppercase">Conectando con el flujo creativo...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-center">
            <p className="text-red-500 font-mono text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-purple-500"></div>
                <h3 className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-bold">Latest Discoveries</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {vibes.slice(0, limit).map((vibe) => (
                <VibeCard 
                  key={vibe._id} 
                  title={vibe.title} 
                  category={vibe.category} 
                  image={vibe.imageUrl}
                  mediaUrl={vibe.mediaUrl}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 text-center border-t border-zinc-900 mt-20">
        <p className="text-zinc-600 text-[9px] tracking-widest uppercase">© 2024 Batnie Platform</p>
      </footer>
    </div>
  );
};

export default Home;