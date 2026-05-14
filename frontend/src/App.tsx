import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { SubirVibe } from "./pages/SubirVibe"; 
import Profile from "./pages/profile"; 
import NotFound from "./pages/NotFound"; 

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
       <Route path="/subir" element={<SubirVibe />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;