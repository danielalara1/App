require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('node:dns');

const User = require('./models/User');

dns.setDefaultResultOrder('ipv4first');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const nuevoUsuario = new User({ username, email, password });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const usuarios = await User.find(); 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users/:nombre', async (req, res) => {
    try {
        const nombreBusqueda = req.params.nombre;
        const usuarioEncontrado = await User.findOne({ username: nombreBusqueda });

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuarioEncontrado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(" Conectado a MongoDB y listo para el Paso 11");
        app.listen(PORT, () => console.log(` Servidor en puerto ${PORT}`));
    })
    .catch(err => console.error(" Error:", err.message));