require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('node:dns');

const app = express(); 

app.use(cors({
  origin: '*' 
}));
app.use(express.json());

const vibeSchema = new mongoose.Schema({
    title: String,      
    category: String,   
    imageUrl: String,   
    mediaUrl: String    
});

const Vibe = mongoose.model('Vibe', vibeSchema);

dns.setDefaultResultOrder('ipv4first');

const PORT = process.env.PORT || 5000;

app.post('/api/vibes', async (req, res) => {
    try {
        const { title, category, imageUrl, mediaUrl } = req.body;
        const nuevaVibe = new Vibe({ title, category, imageUrl, mediaUrl });
        await nuevaVibe.save();
        res.status(201).json({ mensaje: "Vibe creada con éxito", vibe: nuevaVibe });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/vibes', async (req, res) => {
    try {
        const vibes = await Vibe.find(); 
        res.json(vibes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/vibes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Vibe.findByIdAndDelete(id);
        res.json({ mensaje: "Vibe eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(" Conectado a MongoDB: El motor de Batnie está listo");
        app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
    })
    .catch(err => console.error(" Error de conexión:", err.message));