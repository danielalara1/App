interface NavbarProps {
  onExploreClick?: () => void;
}

export const Navbar = ({ onExploreClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[50] bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-black tracking-tighter italic text-white">
            BATNIE.
          </h1>
        </div>
        
        <div className="flex items-center gap-10">
          <button 
            onClick={onExploreClick}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-purple-400 transition-all"
          >
            Explore
          </button>
          
          <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-white transition-all">
            About
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
            <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-medium">Admin</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-[1px]">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Batnie" 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};