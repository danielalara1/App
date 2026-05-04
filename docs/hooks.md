# Estado y Hooks de React

En este proyecto hemos utilizado Hooks oficiales de React para gestionar la lógica y el ciclo de vida.

## Hooks Utilizados
*   useState: Para gestionar el estado local de los formularios y la lista de "vibes" obtenidas de la API.
*   useEffect: Utilizado para realizar la llamada a la API  en el momento en que el componente se monta.
*   Custom Hook (`useVibes`): He creado un hook personalizado para separar la lógica de petición de datos de la interfaz, mejorando la legibilidad del código.

## Optimización
Se han revisado las dependencias en los arrays de `useEffect` para evitar ejecuciones infinitas y asegurar un rendimiento óptimo.