# BATNIE


### Logline

Your aesthetic, curated. El rincón digital donde el minimalismo dark se encuentra con la inspiración visual. Un tablero de sueños personal diseñado para coleccionar contenido de manera fluida y ultraestilizada.


### ¿De qué va esto? (Concepto del Proyecto)

Batnie es una plataforma web de curación visual inspirada en la dinámica de descubrimiento de Pinterest, pero reimaginada bajo una dirección de arte orientada al diseño dark premium. La plataforma ofrece a los usuarios un espacio limpio, rápido y libre de distracciones donde pueden explorar tendencias visuales globales, guardar ideas inspiradoras y catalogar sus propias imágenes en colecciones privadas.

La interfaz ha sido construida cuidando cada detalle visual: fondos oscuros profundos, contrastes geométricos limpios, tipografías marcadas y acentos en morado neón con degradados difuminados. El objetivo principal es que el código pase a un segundo plano y las fotografías sean las verdaderas protagonistas de la experiencia.

Despliegue Oficial en Producción: [Visitar Batnie en Vercel](https://app-iota-beige-95.vercel.app/)


### Lo más top (Funcionalidades Detalladas)

* Galería Dinámica Autoadaptable: Implementación de una cuadrícula inteligente que calcula las proporciones de las imágenes en tiempo real. Las publicaciones se acomodan de forma orgánica en columnas, optimizando el espacio de la pantalla sin importar si el usuario navega desde un monitor de escritorio, una tablet o un teléfono móvil.

* Sistema de Navegación Multisección: Integración completa de `react-router-dom` para fragmentar la aplicación en rutas independientes y reales. Esto permite pasar de la galería a las zonas privadas instantáneamente sin recargar el navegador, mejorando la experiencia de usuario y cambiando la URL visible de la barra de direcciones.

* Barra de Navegación Inteligente y Horizontal: La cabecera superior muta dinámicamente según el estado del usuario. Al iniciar sesión, el diseño organiza en una sola línea horizontal el botón de subida, el nombre del creador y su avatar circular de Google, logrando una estética limpia y simétrica.

* Zoom Pinterest-Style con Aislamiento de Clics: Al pulsar una imagen, se despliega un visor flotante a pantalla completa sobre una capa translúcida oscurecida. El código incluye la detención de la propagación del evento `e.stopPropagation()` para asegurar que el usuario pueda cerrar el visor o interactuar con él sin activar accidentalmente otros elementos del fondo.

* Panel de Perfil con Filtro de Base de Datos: Una sección privada `/profile` que actúa de manera inteligente: lee el identificador del usuario conectado y realiza una criba automática sobre la colección de MongoDB, mostrando única y exclusivamente los elementos que pertenecen a ese creador junto con un contador dinámico de su colección.


### ¿Cómo está hecho? 

Para dar vida a Batnie, se ha desarrollado un ecosistema Full-Stack integrado donde el cliente, el servidor, la base de datos y el proveedor de identidad se comunican en tiempo real mediante un flujo asíncrono continuo:


#### 1. Frontend - React & TypeScript

La interfaz de usuario está desarrollada en React estructurado con TypeScript para garantizar un código libre de errores tipográficos en los datos de las publicaciones. Los estilos se manejan de forma híbrida: la distribución y el comportamiento responsivo se controlan con Tailwind CSS, mientras que los efectos visuales complejos  se manejan mediante CSS puro customizado. Las llamadas hacia el servidor se gestionan de forma asíncrona mediante la librería Axios.


#### 2. Backend - Node.js & Express

El servidor de la aplicación está construido sobre Node.js utilizando el framework Express para administrar una API REST robusta. El backend actúa como el intermediario lógico y el guardián de la aplicación: intercepta las peticiones de los usuarios, gestiona las rutas de lectura/escritura/borrado, parsea el cuerpo de los datos entrantes en formato JSON y valida las solicitudes antes de tocar la base de datos.


#### 3. La Base de Datos - MongoDB Atlas

La persistencia de la información se delega en un clúster en la nube de MongoDB Atlas. Al ser una base de datos NoSQL basada en documentos flexibles, encaja a la perfección con el formato de las publicaciones. Cada "Vibe" se almacena como un documento JSON con el siguiente modelo de datos exacto:

* `_id`: Identificador único y correlativo autogenerado por MongoDB.

* `title`: Cadena de texto con el título de la publicación.

* `category`: Etiqueta de indexación para clasificar el contenido.

* `imageUrl`: Enlace absoluto a la ubicación de la imagen en la red.

* `mediaUrl`: Enlace de referencia a la fuente original del contenido.

* `userEmail`: Dirección de correo del creador, utilizada como clave de vinculación e integración.


#### 4. La Seguridad y Autenticación  - Firebase Auth

La gestión del estado de los usuarios y el inicio de sesión se delega en Firebase Authentication a través del proveedor oficial de Google. La integración funciona de la siguiente manera:

* El cliente inicia el flujo y Firebase abre una pasarela segura con las cuentas de Google del usuario.

* Tras la validación, Firebase nos devuelve un objeto con el token de sesión, el nombre público, el correo y la foto en alta resolución.

* El componente `App.tsx` utiliza un observador en tiempo real que escucha este estado constantemente. Si detecta que no hay sesión, protege la ruta `/profile` expulsando de inmediato a cualquier intruso que intente forzar la URL de manera manual.

* Para operaciones críticas como el borrado de contenido, el frontend valida que el correo de la sesión activa de Firebase coincida exactamente con el campo `userEmail` guardado en el documento de MongoDB, denegando la acción si los datos no son idénticos.


#### 5. El Despliegue (Hosting & Cloud) - Vercel

Todo el ecosistema está desplegado en la infraestructura en la nube de Vercel:

* El Frontend se distribuye como un bundle estático optimizado de alto rendimiento.

* El Backend está configurado mediante un archivo de entorno `vercel.json` que transforma el servidor Express clásico en funciones Serverless independientes que se ejecutan bajo demanda en la nube, garantizando que la web soporte tráfico y esté disponible las 24 horas sin costes fijos de mantenimiento.


##   Abstracción con ODM/ORM (Mongoose)

Trabajar con el driver nativo de MongoDB en Node.js nos da un control absoluto sobre los documentos JSON. Sin embargo, en entornos de producción y desarrollo profesional, se suele implementar un ODM (Object Document Mapper) como Mongoose para estructurar, validar y asegurar la integridad de los datos antes de que impacten la base de datos.


### ¿Qué es Mongoose?

Mongoose es una librería de modelado de objetos para MongoDB que actúa como una capa de abstracción sobre el driver nativo. Permite definir esquemas estrictos con tipado fuertemente estructurado, lógica de validación por defecto y ganchos de ciclo de vida dentro del propio código de nuestra API en Express.


### Ejemplo de Modelado de Esquema con Mongoose y TypeScript

Si integráramos Mongoose en el ecosistema de Batnie para definir el modelo de nuestras publicaciones "Vibes", crearíamos el siguiente archivo `Vibe.ts`:

```
import { Schema, model, Document } from 'mongoose';
export interface IVibe extends Document {
  title: string;
  category: string;
  imageUrl: string;
  mediaUrl?: string;
  userEmail: string;
  createdAt: Date;
}
const VibeSchema = new Schema<IVibe>({
  title: { 
    type: String, 
    required: [true, 'El título es completamente obligatorio'], 
    trim: true,
    maxlength: [100, 'El título no puede superar los 100 caracteres']
  },
  category: { 
    type: String, 
    required: true,
    index: true 
  },
  imageUrl: { 
    type: String, 
    required: true,
    match: [/^https?:\/\//, 'Por favor, introduce una URL de imagen válida']
  },
  mediaUrl: { 
    type: String, 
    default: '' 
  },
  userEmail: { 
    type: String, 
    required: true,
    lowercase: true,
    index: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const VibeModel = model<IVibe>('Vibe', VibeSchema);``` 


## Ventajas de usar Mongoose en el ecosistema de Batnie

Validación Nativa en el Servidor: Impide que entren documentos corruptos o incompletos a MongoDB Atlas. Si un cliente intenta mandar una publicación sin imageUrl o con un formato de texto incorrecto, Mongoose frena la petición automáticamente y devuelve un mensaje de error personalizado antes de consumir recursos de la base de datos.

* Type Safety e IntelliSense: Al vincular la interfaz de TypeScript con el esquema de Mongoose, todo el backend adquiere autocompletado automático. El editor de código sabe exactamente qué propiedades tiene un objeto vibe, evitando errores en tiempo de desarrollo.

* Control de Consultas Saneadas: Simplifica y protege la construcción de queries complejas para las vistas de perfil o filtros de categorías mediante métodos directos como VibeModel.find, previniendo inyecciones de operadores maliciosos de MongoDB.

* Estructura del Proyecto (Arquitectura de Archivos)
El código de la plataforma se encuentra estrictamente estructurado y modularizado, separando las responsabilidades de la vista del cliente de las operaciones lógicas del servidor:

### Plaintext

batnie/
├── frontend/                 
│   ├── index.html            
│   ├── package.json          
│   ├── vite.config.ts        
│   └── src/
│       ├── main.tsx          
│       ├── App.tsx           
│       ├── firebase.ts       
│       ├── index.css         
│       └── pages/            
│           ├── Home.tsx      
│           ├── Profile.tsx   
│           └── NotFound.tsx  
│
├── server/                   
│   ├── vercel.json           
│   ├── package.json          
│   └── src/
│       ├── index.js          
│       ├── config/           
│       ├── routes/           
│       └── controllers/      
│
└── docs/                     
    ├── design/               
    ├── routing.md            
    └── ai/