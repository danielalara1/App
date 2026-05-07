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
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 transition-all hover:border-purple-500/50">
      
      <button 
        onClick={(e) => {
          e.preventDefault(); 
          e.stopPropagation(); 
          onDelete(id);
        }}
        className="absolute top-3 right-3 z-50 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
      >
        <span className="text-xs font-bold">✕</span>
      </button>

      <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-medium">
            {category}
          </p>
        </div>
      </a>
    </div>
  );
};