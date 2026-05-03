const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);