import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

const Home = () => {
  // Datos de prueba para ver la galería
  const vibes = [
    { id: 1, title: "Atardecer Neón", user: "Alex88", img: "https://picsum.photos/id/10/400/600" },
    { id: 2, title: "Setup Minimalista", user: "TechGirl", img: "https://picsum.photos/id/20/400/600" },
    { id: 3, title: "Arquitectura Brutalista", user: "UrbanStyle", img: "https://picsum.photos/id/30/400/600" },
    { id: 4, title: "Café y Código", user: "DevMood", img: "https://picsum.photos/id/40/400/600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Descubre nuevos Vibes</h2>
          <p className="text-gray-500">Inspiración visual seleccionada para ti.</p>
        </header>

        {/* El Grid: la magia de Tailwind */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vibes.map((vibe) => (
            <VibeCard 
              key={vibe.id} 
              title={vibe.title} 
              user={vibe.user} 
              image={vibe.img} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;