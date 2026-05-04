import { useState, useEffect } from "react"; 
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

interface User {
  _id: string;        
  username: string;
  email: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error conectando con el backend:", error);
        setError("No se pudo cargar la información del servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Usuarios Registrados</h2>
        </header>

        {loading && <p className="animate-pulse">Cargando usuarios...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <VibeCard 
                key={user._id} 
                title={user.username} 
                user={user.email} 
                image="https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;