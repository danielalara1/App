import { type User } from "firebase/auth";

interface NavbarProps {
  onExploreClick?: () => void;
  onUploadClick?: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Navbar = ({ onExploreClick, onUploadClick, user, onLogin, onLogout }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#050507] border-b border-white/5 px-6 h-14 flex items-center justify-between">
      {/* LOGO IZQUIERDA */}
      <h1 className="text-sm font-black tracking-tighter text-white italic">BATNIE.</h1>
      
      {/* ACCIONES DERECHA */}
      <div className="flex items-center gap-6">
        <button 
          onClick={onExploreClick} 
          className="text-[10px] uppercase font-bold text-zinc-500 hover:text-white transition-colors tracking-widest"
        >
          Explore
        </button>

        {user ? (
          <div className="flex items-center gap-6">
            <button 
              onClick={onUploadClick} 
              className="text-[10px] uppercase font-bold text-purple-500 hover:text-purple-400 transition-all tracking-widest"
            >
              + Upload
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-[10px] text-white font-bold leading-none mb-1">
                  {user.displayName || user.email?.split('@')[0]}
                </p>
                <button 
                  onClick={onLogout} 
                  className="text-[9px] text-zinc-500 font-bold uppercase hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} className="w-8 h-8 rounded-md border border-white/10 object-cover" alt="profile" />
              ) : (
                <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center text-[12px] font-bold text-white">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        ) : (
          <button 
            onClick={onLogin} 
            className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};