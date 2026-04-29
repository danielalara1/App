# Arquitectura 

## Componentes

* Principales
    - AuthContext: Gestionará si el usuario está logueado en toda la app.
    - VibeCard: Componente reutilizable para mostrar cada "Vibe".
    - VibeGrid: Galería principal que organiza las tarjetas.
    - UploadModal: Ventana emergente para subir nuevo contenido.

## Modelo de datos

* Usuario: Nombre, email, password, avatar.
* Cotenido: Imagenurl, título, descripción, autor, tags.

## Tecnologías clave

* Frontend: React +  TypeScript + Tailwind CSS.
* Estado: Context API para Auth y Hooks personalizados para datos.
* Backened: Express.js 
