import { Navbar } from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-8">
        <h2 className="text-3xl font-semibold text-gray-800">Descubre nuevos Vibes</h2>
        <p className="text-gray-500 mt-2">Tu espacio creativo comienza aquí.</p>
        {/* Aquí irán las tarjetas mañana */}
      </main>
    </div>
  );
};

export default Home;