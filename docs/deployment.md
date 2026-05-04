# Estrategia de Despliegue (Punto 14)

Este documento describe el proceso para poner la aplicación Batnie en producción.

## Plataformas Utilizadas
- Frontend: Vercel, optimizado para Single Page Applications de React.
- Backend: Render, entorno de ejecución para Node.js.
- Base de Datos: MongoDB Atlas, database as a Service en la nube.

## Configuración de Variables de Entorno
Para la seguridad de la aplicación, se han configurado las siguientes variables en los paneles de control de los servidores:
- MONGO_URI: Cadena de conexión encriptada a la base de datos.
- PORT: Puerto dinámico asignado por el hosting.
- VITE_API_URL: URL del backend para que el frontend sepa a dónde realizar las peticiones.

## Proceso de CI/CD
Se ha establecido una conexión entre GitHub y las plataformas de despliegue, permitiendo que cada vez que se haga un `push` a la rama principal, la aplicación se actualice automáticamente.