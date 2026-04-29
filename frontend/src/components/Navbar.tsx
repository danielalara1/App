export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-600">Batnie</h1>
      <div className="space-x-4">
        <button className="text-gray-600">Explorar</button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Subir Vibe</button>
      </div>
    </nav>
  );
};