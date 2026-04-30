const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Datos de prueba (Esto es lo que enviará el servidor)
const initialVibes = [
  { id: 1, title: "Atardecer Neón (desde Server)", user: "Alex88", img: "https://picsum.photos/id/10/400/600" },
  { id: 2, title: "Setup Minimalista (desde Server)", user: "TechGirl", img: "https://picsum.photos/id/20/400/600" },
  { id: 3, title: "Arquitectura Brutalista", user: "UrbanStyle", img: "https://picsum.photos/id/30/400/600" },
  { id: 4, title: "Café y Código", user: "DevMood", img: "https://picsum.photos/id/40/400/600" },
];

// Ruta para obtener los vibes
app.get('/api/vibes', (req, res) => {
  res.json(initialVibes);
});

app.listen(PORT, () => {
  console.log(`Servidor de Batnie corriendo en http://localhost:${PORT}`);
});