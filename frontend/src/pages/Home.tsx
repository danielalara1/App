import React, { useState, useEffect, useRef } from "react"; 
import axios from "axios";
import { auth, loginWithGoogle, logout } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { VibeCard } from "../components/VibeCard";

const API_URL = 'https://8wlzgqn7-5000.uks1.devtunnels.ms'; 

interface Vibe {
  _id: string;         
  title: string;
  category: string;
  imageUrl: string;
  mediaUrl: string;
  userEmail?: string; 
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<"all" | "mine">("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newVibe, setNewVibe] = useState({ title: "", category: "", imageUrl: "", mediaUrl: "" });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Efecto principal: Carga los datos directamente sin llamadas externas
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
      setUser(currentUser); 
    });

    // Lógica de carga integrada (IIFE)
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/vibes`);
        setVibes(data);
      } catch {
        console.log("Error loading");
      } finally {
        setLoading(false);
      }
    })();

    return () => unsubscribe();
  }, []); 

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await axios.post(`${API_URL}/api/vibes`, { ...newVibe, userEmail: user.email });
      setIsModalOpen(false);
      setNewVibe({ title: "", category: "", imageUrl: "", mediaUrl: "" });
      
      // En lugar de llamar a fetchVibes(), pedimos los datos de nuevo aquí mismo
      const { data } = await axios.get(`${API_URL}/api/vibes`);
      setVibes(data);
    } catch {
      alert("Error");
    }
  };

  const deleteVibe = async (id: string) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(`${API_URL}/api/vibes/${id}`);
      setVibes((prev) => prev.filter((v) => v._id !== id));
    } catch {
      console.log("Error deleting");
    }
  };

  const filteredVibes = view === "all" ? vibes : vibes.filter(v => v.userEmail === user?.email);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar 
        onExploreClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })} 
        onUploadClick={() => setIsModalOpen(true)} 
        user={user} onLogin={loginWithGoogle} onLogout={logout} 
      />
      
      <header className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Batnie</h2>
        <div className="flex gap-4 mt-12">
          <button onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3 border border-purple-500/50 text-purple-400 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-purple-400/10 transition-all">Explore</button>
          {user && <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-zinc-200 transition-all">Upload Vibe</button>}
        </div>
      </header>

      <main ref={sectionRef} className="max-w-7xl mx-auto p-8 min-h-screen">
        <div className="flex justify-center gap-8 mb-16 border-b border-zinc-900 pb-4">
          <button onClick={() => setView("all")} className={`text-[10px] uppercase tracking-widest font-bold ${view === "all" ? "text-purple-500 border-b border-purple-500" : "text-zinc-600"}`}>All Vibes</button>
          <button onClick={() => setView("mine")} className={`text-[10px] uppercase tracking-widest font-bold ${view === "mine" ? "text-purple-500 border-b border-purple-500" : "text-zinc-600"}`}>My Uploads</button>
        </div>

        {loading ? (
          <div className="text-center text-zinc-500 uppercase text-[10px] tracking-widest italic">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredVibes.map((vibe) => (
              <VibeCard key={vibe._id} id={vibe._id} title={vibe.title} category={vibe.category} image={vibe.imageUrl} mediaUrl={vibe.mediaUrl} onDelete={deleteVibe} showDelete={!!user && user.email === vibe.userEmail} />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md border border-zinc-800" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <input type="text" placeholder="Title" required className="bg-zinc-800 p-3 rounded-xl text-white outline-none" value={newVibe.title} onChange={e => setNewVibe({...newVibe, title: e.target.value})} />
              <input type="text" placeholder="Category" required className="bg-zinc-800 p-3 rounded-xl text-white outline-none" value={newVibe.category} onChange={e => setNewVibe({...newVibe, category: e.target.value})} />
              <input type="url" placeholder="Image URL" required className="bg-zinc-800 p-3 rounded-xl text-white outline-none" value={newVibe.imageUrl} onChange={e => setNewVibe({...newVibe, imageUrl: e.target.value})} />
              <input type="text" placeholder="Source URL" required className="bg-zinc-800 p-3 rounded-xl text-white outline-none" value={newVibe.mediaUrl} onChange={e => setNewVibe({...newVibe, mediaUrl: e.target.value})} />
              <button type="submit" className="bg-purple-600 py-4 rounded-xl font-bold uppercase text-[10px]">Post Vibe</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;