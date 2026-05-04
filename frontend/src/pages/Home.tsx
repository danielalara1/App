import { useState, useEffect } from "react"; 
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

// --- AÑADIDO: Definición de la URL del Túnel ---
// SUSTITUYE el link de abajo por el tuyo del puerto 5000 que termina en .devtunnels.ms
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

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        setLoading(true);
        // Ahora API_URL ya existe y Axios sabe a dónde ir
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
      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-12 text-center">
          <h2 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Batnie
          </h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-xs font-bold">
            Creative Hub & Multidisciplinary Ecosystem
          </p>
        </header>

        {loading && (
          <div className="flex justify-center">
            <p className="animate-pulse text-purple-500">Iniciando flujo creativo...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {vibes.map((vibe) => (
              <VibeCard 
                key={vibe._id} 
                title={vibe.title} 
                category={vibe.category} 
                image={vibe.imageUrl}
                mediaUrl={vibe.mediaUrl}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;