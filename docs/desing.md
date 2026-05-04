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

# Arquitectura y Diseño del Sistema

## Arquitectura del Backend
Se ha implementado una arquitectura por capas para separar responsabilidades:
- Models:Definición del esquema de datos con Mongoose (`User.js`).
- Routes/Controllers: Lógica de rutas integrada en `index.js` (temporalmente) para gestionar peticiones HTTP.

## Flujo de Datos
1. El Frontend (React) realiza peticiones usando `fetch`.
2. El Backend (Express) procesa la petición y valida los datos.
3. MongoDB persiste la información de forma permanente.

## Decisiones Técnicas
- Base de Datos: Se eligió MongoDB por su flexibilidad con documentos JSON.
- Validación: Se usan validadores nativos de Mongoose para asegurar que el email sea único y la contraseña tenga una longitud mínima.