import { useState, useEffect } from "react"; 
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

// 1. Definimos qué tiene un Vibe para que TypeScript no sufra
interface Vibe {
  id: number;
  title: string;
  user: string;
  img: string;
}

const Home = () => {
  // 2. Le decimos que el estado es una lista de "Vibes"
  const [vibes, setVibes] = useState<Vibe[]>([]);

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vibes");
        setVibes(response.data);
      } catch (error) {
        console.error("Error conectando con el backend:", error);
      }
    };
    fetchVibes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Descubre nuevos Vibes</h2>
          <p className="text-gray-500">Datos servidos desde tu propio Backend.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 3. Ahora ya no necesitas el ": any", TypeScript ya sabe qué es "vibe" */}
          {vibes.map((vibe) => (
            <VibeCard key={vibe.id} title={vibe.title} user={vibe.user} image={vibe.img} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;