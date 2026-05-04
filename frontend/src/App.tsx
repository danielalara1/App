import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { SubirVibe } from "./pages/SubirVibe"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/subir" element={<SubirVibe />} />
      </Routes>
    </Router>
  );
}

export default App;