import { Link } from "react-router-dom"; 
export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-purple-600">
        Batnie
      </Link>
      
      <div className="space-x-4 flex items-center">
        <button className="text-gray-600 hover:text-purple-600 transition-colors">
          Explorar
        </button>
       <Link 
          to="/subir" 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors"
        >
          Subir Vibe
        </Link>
      </div>
    </nav>
  );
};