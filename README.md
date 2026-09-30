# Atlas Lunar

Aplicación web interactiva y educativa para explorar la Luna y sus cráteres más famosos. Está hecha con HTML, CSS y JavaScript puros, sin dependencias ni paso de compilación, y se puede alojar tal cual en GitHub Pages.

**Demo:** `https://TU-USUARIO.github.io/atlas-lunar/` (cambia la dirección por la de tu repositorio)

## Qué puedes hacer

- Ver la cara visible de la Luna con una textura real de la NASA, relieve simulado y un terminador suave que le da volumen.
- Hacer clic en un cráter del mapa, o en la lista lateral, para acercarte con una transición fluida. El cráter seleccionado se marca con un anillo a su tamaño real.
- Leer en un panel el significado del nombre, el diámetro, la profundidad aproximada, las coordenadas selenográficas, la edad y curiosidades.
- Buscar cráteres por nombre (sin tildes; Enter abre el primer resultado).
- Volver a la vista completa con el botón **Reiniciar vista** o la tecla **Esc**.
- Compartir un cráter con un enlace directo, por ejemplo `.../#tycho`.
- Usarla en móvil: el panel de información sube desde abajo y la lista pasa a ser horizontal.

Cráteres incluidos: Copérnico, Tycho, Clavius, Platón, Aristarco, Kepler, Arquímedes, Aristóteles, Eratóstenes y Langrenus.

## Estructura

```
atlas-lunar/
├── index.html   # estructura de la página
├── style.css    # tema espacial, zoom, panel y diseño responsive
├── script.js    # datos, proyección, textura, zoom, panel y buscador
└── README.md
```

## Publicar en GitHub Pages

1. Crea un repositorio público, por ejemplo `atlas-lunar`.
2. Sube los archivos a la raíz del repositorio, sin carpetas intermedias.
3. Entra en **Settings → Pages**, elige **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
4. En uno o dos minutos la página estará disponible en `https://TU-USUARIO.github.io/atlas-lunar/`.

## Probarla en tu ordenador

Abre `index.html` en el navegador. Para que la textura de la NASA cargue sin restricciones, es mejor servirla desde un servidor local:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Cómo añadir un cráter

Agrega un objeto al arreglo `CRATERS` de `script.js`. Latitud norte y longitud este son positivas; sur y oeste, negativas.

```js
{ id: 'ptolomeo', name: 'Ptolomeo', lat: -9.3, lon: -1.9, diam: 153, depth: 2.4,
  age: 'Opcional',
  etym: 'Origen del nombre.',
  info: 'Datos y curiosidades.' }
```

Aparece solo en el mapa, en la lista y en el buscador. Revisa siempre los datos con una fuente fiable, como el Gazetteer of Planetary Nomenclature de la UAI (IAU) o el catálogo de cráteres de LRO.

## Cómo funciona

- **Proyección:** los cráteres se colocan con una proyección ortográfica a partir de su latitud y longitud, de modo que sus posiciones relativas coinciden con lo que se ve desde la Tierra.
- **Textura:** `script.js` descarga el mapa de color de la Luna de la NASA (formato cilíndrico lon/lat) y lo reproyecta a un disco con un `<canvas>`. Después aplica la iluminación, con la luminancia del mapa como relieve simulado. Si el mapa no se puede leer (sin conexión o sin permiso CORS), la app genera una Luna procedural con cráteres, mares y rayos.
- **Zoom:** se aplica una transformación CSS al contenedor de la Luna, con una escala que depende del tamaño del cráter. Los marcadores mantienen su tamaño con una variable CSS (`--inv`).

## Ajustes rápidos (en `script.js`)

| Qué | Dónde |
| --- | --- |
| Dirección de la luz | constante `L` en `paintPhoto` y en `paintMoon` |
| Fuerza del relieve simulado | el factor `3` y el límite `.5` en `paintPhoto` |
| Resolución de la textura | `N` (2048 en escritorio, 1400 en móvil) |
| Fuente de la textura | arreglo `TEXTURES` |

Si subes la resolución, la página tarda más en generar la Luna y usa más memoria, sobre todo en móviles.

## Limitaciones

- La textura de origen tiene 2048×1024 píxeles, así que con mucho zoom se ve suave y no perfectamente nítida.
- El relieve es simulado a partir de la luminancia del mapa, no a partir de un modelo de elevación real, por lo que puede marcar en exceso algunos bordes.
- Los datos de los cráteres son aproximados y tienen fines divulgativos.

## Créditos

- Textura lunar: NASA/Goddard Space Flight Center Scientific Visualization Studio, [CGI Moon Kit](https://svs.gsfc.nasa.gov/4720), creado con datos de las cámaras y el altímetro láser de la misión Lunar Reconnaissance Orbiter (LRO).
- Los nombres lunares fueron fijados en su mayoría por Giovanni Riccioli (1651) y hoy los regula la Unión Astronómica Internacional.

## Licencia

Elige la que prefieras para tu código (por ejemplo MIT) y añade un archivo `LICENSE` al repositorio. Las imágenes de la NASA se usan con el crédito indicado arriba.
