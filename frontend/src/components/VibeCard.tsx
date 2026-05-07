interface VibeProps {
  image: string;
  title: string;
  category: string;
  mediaUrl: string; 
  id: string;
  onDelete: (id: string) => void;
}

export const VibeCard = ({ image, title, category, mediaUrl, id, onDelete }: VibeProps) => {
  return (
    <div className="group relative bg-zinc-900 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-zinc-800">
      
      {/* Botón de eliminar */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Importante para que no se abra el link al borrar
          onDelete(id);
        }}
        className="absolute top-3 right-3 z-20 bg-red-500/80 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
      >
        ✕
      </button>

      {/* AQUÍ ES DONDE USAMOS MEDIAURL PARA QUE SE QUITE EL ROJO */}
      <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
        <div className="overflow-hidden h-64">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </div>

        <div className="p-4 bg-zinc-900">
          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-sm text-zinc-500">{category}</p>
        </div>
      </a>

    </div>
  );
};