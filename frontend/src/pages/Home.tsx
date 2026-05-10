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
    if (window.confirm("¿Seguro que quieres borrar?")) {
      try {
        await axios.delete(`${API_URL}/api/vibes/${id}`);
        setVibes((prev) => prev.filter((v) => v._id !== id));
        if (selectedVibe?._id === id) setSelectedVibe(null);
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/vibes`);
        setVibes(response.data);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVibes();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar onExploreClick={handleExplore} />
      
      <header className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Batnie
        </h2>
        <button 
          onClick={handleExplore} 
          className="mt-12 px-8 py-3 border border-purple-500/50 text-purple-400 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-purple-500/10 transition-all"
        >
          Explore
        </button>
      </header>

      <main ref={sectionRef} className="max-w-7xl mx-auto p-8 pt-24 min-h-screen">
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {vibes.slice(0, limit).map((vibe) => (
              <div 
                key={vibe._id} 
                onClick={() => setSelectedVibe(vibe)}
              >
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

      {selectedVibe && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedVibe(null)} 
        >
          <div 
            className="bg-zinc-900 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setSelectedVibe(null)}
              className="absolute top-5 right-5 z-[10000] text-white bg-black/50 w-10 h-10 rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center"
            >
              ✕
            </button>

            <div className="md:w-2/3 bg-black flex items-center justify-center">
              <img 
                src={selectedVibe.imageUrl} 
                className="w-full h-full object-contain max-h-[85vh]" 
                alt={selectedVibe.title}
              />
            </div>

            <div className="md:w-1/3 p-10 flex flex-col justify-center bg-zinc-900 text-left">
              <h3 className="text-4xl font-bold mb-4 leading-tight">{selectedVibe.title}</h3>
              <p className="text-purple-500 uppercase tracking-widest text-xs mb-6">{selectedVibe.category}</p>
              <div className="h-px bg-zinc-800 w-full mb-8"></div>
              <a 
                href={selectedVibe.mediaUrl.startsWith('http') ? selectedVibe.mediaUrl : `https://${selectedVibe.mediaUrl}`} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full bg-white text-black py-4 rounded-full font-bold text-center uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all"
              >
                Visit Source ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;