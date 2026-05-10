import React from 'react';

interface VibeProps {
  image: string;
  title: string;
  category: string;
  mediaUrl: string; // La dejamos aunque no la usemos aquí, para que Home no de error
  id: string;
  onDelete: (id: string) => void;
}

export const VibeCard = ({ image, title, category, id, onDelete }: VibeProps) => {
  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 transition-all hover:border-purple-500/50 shadow-lg cursor-zoom-in">
      
      {/* BOTÓN ELIMINAR */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Para que no se abra la foto al borrar
          onDelete(id);
        }}
        className="absolute top-3 right-3 z-50 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
      >
        <span className="text-xs font-bold">✕</span>
      </button>

      {/* IMAGEN Y TEXTO */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40"></div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-medium italic">
          {category} — <span className="text-purple-500 font-bold italic">Ver detalle</span>
        </p>
      </div>
    </div>
  );
};