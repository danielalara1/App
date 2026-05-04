# Capa de Red en el Frontend

## Cliente de API
Se ha creado un cliente tipado en `src/api/client.ts` utilizando TypeScript para asegurar la integridad de los datos entre el servidor y el cliente.

## Gestión de Estados
Para cada petición a la API, el frontend gestiona:
- Loading: Estado de carga mientras se espera la respuesta.
- Data: Los datos recibidos tras una petición exitosa.
- Error: Captura de excepciones en caso de que el servidor esté caído o la validación falle.

## Contratos de Datos (Interfaces)
Se define la interfaz `User` para que coincida exactamente con el modelo del backend.