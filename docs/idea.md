# Proyecto: Batnie (Creative Hub)

## 1. Concepto del Proyecto
"Batnie" es una aplicación Fullstack diseñada para artistas y creativos multidisciplinares. Surge de la necesidad de unificar en un solo espacio digital las diversas fuentes de inspiración que suelen estar dispersas: las referencias visuales (dibujo/moda), el ritmo (música) y la expresión corporal (baile). 

La plataforma funciona como un ecosistema híbrido que toma la organización visual de "Pinterest", la capacidad de descubrimiento multimedia de "TikTok" y la estructura sonora de "Spotify".


## 2. Definición del Problema
Actualmente, los creativos utilizan múltiples herramientas para documentar sus procesos: guardan imágenes en una red social, canciones en otra y vídeos de referencia en una tercera. Esta fragmentación rompe el "flujo creativo". 

"Batnie" resuelve este problema mediante la creación de "Vibes": tarjetas interactivas donde una imagen de moda o un boceto de dibujo conviven con el audio o vídeo que le da sentido.


## 3. Público Objetivo
* Artistas y Dibujantes: Que necesitan asociar una paleta de colores o estilo a una melodía específica.
* Diseñadores de Moda: Que buscan organizar sus colecciones junto a referencias de pasarela.
* Bailarines: Que desean guardar sus coreografías junto a las pistas musicales y referencias de vestuario.


## 4. Funcionalidades Principales (MVP)
Para esta Fase 5, el proyecto se centrará en:
* Vibe Grid : Una galería dinámica construida con CSS Grid y Flexbox que muestra todas las inspiraciones guardadas.
* Gestión Fullstack: Crear nuevas tarjetas con título, categoría y enlaces multimedia.
    * Editar la información de las "Vibes" existentes.
    * Eliminar inspiraciones que ya no sean necesarias.
* Categorización Inteligente: Sistema de filtrado por etiquetas (Dibujo, Moda, Baile, Música).
* Network Layer: Sincronización en tiempo real entre el Frontend (React) y la API (Node.js).


## 5. Funcionalidades Extra (Roadmap)
* Focus Mode: Visualización a pantalla completa con scroll infinito para una experiencia inmersiva.
* Global Player: Un reproductor persistente en la parte inferior de la pantalla.
* Drag & Drop: Capacidad de reordenar las tarjetas visualmente en el tablero.


## 6. Especificaciones Técnicas
Para garantizar un desarrollo profesional, se utilizará el siguiente stack:
* Frontend: React 18 + Vite.
* Lenguaje: TypeScript.
* Estilos: Tailwind CSS (Diseño responsive y moderno).
* Backend: Node.js + Express (Arquitectura de capas).
* Almacenamiento: API REST con persistencia de datos controlada.

