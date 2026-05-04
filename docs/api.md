# Documentación de la API - Batnie

Este backend está construido con Node.js, Express y MongoDB. Gestiona la persistencia de usuarios y la autenticación básica.

## Endpoints

### Registro de Usuario
- URL: `/register`
- Método: `POST`
- Cuerpo (JSON):
  ```json
  {
    "username": "nombre",
    "email": "correo@ejemplo.com",
    "password": "password123"
  }

### Respuesta

{
  "mensaje": "Usuario registrado con éxito",
  "usuario": { ... }
}

