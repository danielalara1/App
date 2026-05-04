# Documentación de Componentes

La interfaz se ha construido de forma modular utilizando componentes reutilizables y tipados con TypeScript.

## Componentes Principales
*   Navbar: Barra de navegación persistente con enlaces a la Home y al creador de posts.
*   VibeCard: Componente encargado de renderizar cada publicación individual . Recibe los datos mediante `props` tipadas con una interfaz `Vibe`.
*   VibeForm: Formulario controlado para la captura de nuevos datos.
*   Layout: Componente contenedor que mantiene la estructura visual consistente en toda la app.

## Metodología
Cada componente utiliza Tailwind CSS para los estilos y define sus propios tipos/interfaces para asegurar que los datos que fluyen por la aplicación sean correctos.