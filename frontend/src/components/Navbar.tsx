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
    <nav className="fixed top-0 left-0 right-0 z-[50] bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-8 h-20 flex items-center justify-between">
      <h1 className="text-xl font-black italic tracking-tighter text-white">BATNIE.</h1>
      <div className="flex items-center gap-6">
        <button onClick={onExploreClick} className="text-[10px] uppercase font-bold text-zinc-400 hover:text-purple-400 transition-colors tracking-widest">
          Explore
        </button>
        {user && (
          <button onClick={onUploadClick} className="text-[10px] uppercase font-bold text-purple-400 border border-purple-500/30 px-3 py-1 rounded-md hover:bg-purple-500/10 transition-all tracking-widest">
            + Upload
          </button>
        )}
        {user ? (
          <div className="flex items-center gap-4 pl-6 border-l border-zinc-800">
            <div className="text-right">
              <p className="text-[10px] text-white font-bold leading-none">{user.displayName || "User"}</p>
              <button onClick={onLogout} className="text-[9px] text-red-500 font-bold uppercase hover:text-red-400">Logout</button>
            </div>
            <img src={user.photoURL || ""} className="w-9 h-9 rounded-full border-2 border-purple-500/50 object-cover" alt="profile" />
          </div>
        ) : (
          <button onClick={onLogin} className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 shadow-lg">Login</button>
        )}
      </div>
    </nav>
  );
};