# BATNIE

### Logline

Your aesthetic, curated. El rincón donde guardas todo lo que te inspira con un estilo visual increíble.

### ¿De qué va esto?

Batnie es básicamente tu tablero de sueños personal. Es una plataforma tipo Pinterest pero con una vibra *dark premium* mucho más cuidada. La idea es que puedas navegar por fotos, dejarte llevar por la estética y subir tus propias "vibes" sin complicaciones. Todo es negro, minimalista y con ese toque morado neón que tanto nos gusta para que las fotos sean las verdaderas protagonistas.

https://app-iota-beige-95.vercel.app/


### Lo más top

* Galería que fluye Las fotos se acomodan solas en un diseño dinámico que se ve bien en cualquier pantalla.
* Diseño con chispa: No es solo un fondo negro; tiene efectos de brillo y detalles morados que lo hacen sentir de lujo.
* Zoom estilo Pinterest Si te gusta una foto, haces clic y se expande, dejándote ver más cosas relacionadas si sigues bajando.
* Tu propio espacio Te logueas con Google en un segundo, y desde tu foto de perfil manejas todo: subes posts o cierras sesión con un menú súper limpio.
* Cero líos para subir: Un formulario sencillo que aparece cuando lo necesitas para que compartas tu contenido al instante.


### ¿Cómo está hecho

En el Frontend,  usamos React y TypeScript para que todo vaya como la seda, junto con Tailwind CSS y unos toques de CSS propio para lograr esos efectos de luces moradas.

Para el Backend, montamos un servidor con Node.js y Express que se comunica con una base de datos en MongoDB. De la seguridad y el login se encarga Firebase, así que no hay de qué preocuparse.

Como Extras, usamos Axios para conectar el frente con el fondo y Vercel para que la web esté online las 24 horas.


### Estructura del Proyecto

Así es como está organizado el código:

```text
project/
├── index.html              # La base de todo.
├── style.css               # El maquillaje: los colores morados y los brillos.
├── app.js                  # La magia que hace que todo funcione.
├── src/
│   └── api/
│       └── client.js       # El mensajero que habla con el servidor.
├── server/                 # Donde vive el cerebro (Backend).
│   ├── README.md           # Notas sobre el servidor.
│   ├── vercel.json         # El "manual" para subirlo a la nube.
│   ├── package.json
│   └── src/
│       ├── index.js        # El interruptor principal del server.
│       ├── config/         # Conexiones a la base de datos.
│       ├── routes/         # Los caminos por donde viaja la info.
│       ├── controllers/    # Los que deciden qué foto mostrar.
│       └── services/       # Ayudantes para tareas pesadas.
├── docs/
│   ├── design/             # Dibujos y paletas de colores.
│   └── ai/                 # Charlas con la IA para pulir el código.
└── README.md

```


### Para jugar con el código

Si quieres probarlo en tu PC, haz esto:

```bash
git clone https://github.com/user/batnie.git
cd batnie
npm install
npm run dev

```

### Lanzarlo a Vercel

En el Frontend

1. Sube tu repo a Vercel.
2. Pon la URL de tu API en las variables de entorno (`VITE_API_URL`).
3. ¡Y listo!

En el Backend

1. Crea el proyecto desde la carpeta `/server`.
2. No olvides conectar tu MongoDB y Firebase en la configuración de Vercel.
3. Dale a desplegar y a disfrutar.