import { useState, useEffect, useRef } from "react"; // Añadido useRef
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

  const handleExplore = () => {
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
      
      <header className="h-[70vh] flex flex-col items-center justify-center text-center px-4 border-b border-zinc-900">
        <h2 className="text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-fade-in">
          Batnie
        </h2>
        <p className="text-zinc-400 mt-6 uppercase tracking-[0.3em] text-xs font-bold max-w-md leading-loose">
          Creative Hub & Multidisciplinary Ecosystem
        </p>
        
        <button 
          onClick={handleExplore}
          className="mt-12 px-10 py-4 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-500 rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        >
          Explore
        </button>
      </header>

      <main ref={sectionRef} className="max-w-7xl mx-auto p-8 pt-20">
        {loading && (
          <div className="flex justify-center">
            <p className="animate-pulse text-purple-500 tracking-widest uppercase text-xs">Iniciando flujo creativo...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg text-center">
            <p className="text-red-500 text-sm font-mono">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-10 font-bold">Latest Vibes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
          </>
        )}
      </main>
    </div>
  );
};

export default Home;