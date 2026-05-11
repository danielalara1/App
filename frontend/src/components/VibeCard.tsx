import React from 'react';

export interface VibeCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  mediaUrl: string;
  onDelete: (id: string) => void;
  showDelete?: boolean;
}

export const VibeCard: React.FC<VibeCardProps> = ({ 
  id, title, category, image, onDelete, showDelete 
}) => {
  return (
    <div className="relative group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer">
      <img src={image} alt={title} className="w-full aspect-[4/5] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
        <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {showDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(id); }}
            className="mt-4 text-[9px] bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase font-bold"
          >
            Delete Vibe
          </button>
        )}
      </div>
    </div>
  );
};