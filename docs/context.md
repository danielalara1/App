# Context y Estado Global

Para evitar el "prop drilling",pasar datos a través de muchos niveles, hemos implementado la Context API.

## Implementación
*   VibeContext. Almacena la lista global de publicaciones y las funciones para actualizar el estado tras una creación exitosa.
*   VibeProvider: Envuelve la aplicación para que cualquier componente  pueda acceder a los datos sin intermediarios.

## Utilidad
Esto permite que, al crear una nueva "vibe" en la página de formulario, la lista en la página de inicio se actualice automáticamente al compartir el mismo estado global.