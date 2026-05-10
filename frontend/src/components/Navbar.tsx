interface NavbarProps {
  onExploreClick?: () => void;
}

export const Navbar = ({ onExploreClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[50] bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tighter italic">BATNIE.</h1>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={onExploreClick}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-purple-500 transition-colors"
          >
            Explore
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20"></div>
        </div>
      </div>
    </nav>
  );
};