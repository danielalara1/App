import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = 'https://8wlzgqn7-5000.uks1.devtunnels.ms'; 

export const SubirVibe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dibujo");
  const [imageUrl, setImageUrl] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/vibes`, {
        title,
        category,
        imageUrl,
        mediaUrl 
      });
      navigate("/");
    } catch (error) {
      console.error("Error al subir:", error);
      alert("No se pudo subir la Vibe");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Nueva Inspiración</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Título del Artista/Obra</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-purple-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Pinturas de Van Gogh"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Categoría</label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Dibujo">Dibujo</option>
              <option value="Moda">Moda</option>
              <option value="Baile">Baile</option>
              <option value="Música">Música</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">URL de la Imagen</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Pega el link de la foto aquí"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Enlace de Referencia (Spotify/Web)</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="Opcional: link a la canción o fuente"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Subir al Hub
            </button>

            <button 
              type="button" 
              onClick={() => navigate("/")}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-semibold py-3 rounded-lg transition-colors border border-zinc-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};