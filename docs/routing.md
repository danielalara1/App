# Estructura de Rutas y Navegación

Para la navegación de la aplicación utilizamos **React Router**, permitiendo una experiencia de Single Page Application (SPA).

## Rutas Definidas
*   `/` (Home):Muestra el feed principal con todas las "Vibes" cargadas desde la base de datos.
*   `/create` (Formulario):** Página dedicada a la creación de una nueva publicación.
*   `*` (Página 404):Captura cualquier ruta inexistente y muestra un mensaje de error amigable al usuario para volver al inicio.

## Implementación
Se ha utilizado el componente `BrowserRouter` en el punto de entrada y `Routes`/`Route` para definir la jerarquía. La navegación se realiza mediante el componente `Link` para evitar recargas de página innecesarias.