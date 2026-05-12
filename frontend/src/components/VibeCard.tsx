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
    <div className="vibe-card-container">
      <div className="vibe-card-image-wrapper">
        <img src={image} alt={title} className="vibe-card-image" />
        
        <div className="vibe-card-overlay">
          <div className="flex justify-end">
            {showDelete && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                className="btn-action-float bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
          
          <div className="overlay-bottom-text">
            <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{category}</p>
          </div>
        </div>
      </div>
      
      <div className="vibe-card-info">
        <h3 className="vibe-card-title">{title}</h3>
      </div>
    </div>
  );
};