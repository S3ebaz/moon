/* ==========================================================
   Atlas Lunar: lógica de la aplicación
   Convención: latitud N (+) / S (-), longitud E (+) / O (-)
   ========================================================== */

/* ---------- 1. Datos de los cráteres (añade más aquí) ---------- */
const CRATERS = [
  { id: 'copernico', name: 'Copérnico', lat: 9.7, lon: -20.1, diam: 93, depth: 3.8, age: '≈800 millones de años',
    etym: 'Nicolás Copérnico (1473-1543), astrónomo polaco que propuso el modelo heliocéntrico.',
    info: 'Cráter joven y espectacular, con paredes aterrazadas, picos centrales y un sistema de rayos brillantes visible con prismáticos. Apolo 12 recogió muestras que se cree que incluyen material de sus eyecciones.' },
  { id: 'tycho', name: 'Tycho', lat: -43.3, lon: -11.4, diam: 85, depth: 4.7, age: '≈108 millones de años',
    etym: 'Tycho Brahe (1546-1601), astrónomo danés, el gran observador anterior al telescopio.',
    info: 'Uno de los cráteres más jóvenes y reconocibles. Sus rayos se extienden más de 1.500 km y dominan la Luna llena. La sonda Surveyor 7 alunizó al norte de él en 1968.' },
  { id: 'clavius', name: 'Clavius', lat: -58.8, lon: -14.4, diam: 225, depth: 3.5, age: '≈4.000 millones de años',
    etym: 'Christopher Clavius (1538-1612), jesuita alemán que participó en la reforma del calendario gregoriano.',
    info: 'Uno de los cráteres más grandes de la cara visible. Su suelo guarda una curiosa cadena de cráteres menores de tamaño decreciente. En 2001: Odisea del espacio alberga una base lunar.' },
  { id: 'platon', name: 'Platón', lat: 51.6, lon: -9.3, diam: 101, depth: 2, age: '≈3.800 millones de años',
    etym: 'Platón (c. 427-347 a. C.), filósofo griego.',
    info: 'Su suelo liso y oscuro es lava que inundó el cráter. Sus murallas, de unos 2 km de altura, proyectan sombras largas. Durante siglos se discutieron supuestos fenómenos lunares transitorios observados en su interior.' },
  { id: 'aristarco', name: 'Aristarco', lat: 23.7, lon: -47.4, diam: 40, depth: 3.5, age: '≈450 millones de años',
    etym: 'Aristarco de Samos (c. 310-230 a. C.), astrónomo griego que defendió un modelo heliocéntrico.',
    info: 'Uno de los accidentes más brillantes de la Luna: se distingue incluso en la zona iluminada solo por la luz de la Tierra. Junto a él está Vallis Schröteri, un gran valle sinuoso.' },
  { id: 'kepler', name: 'Kepler', lat: 8.1, lon: -38.0, diam: 32, depth: 2.6, age: 'Período Copernicano (menos de 1.100 millones de años)',
    etym: 'Johannes Kepler (1571-1630), astrónomo alemán que formuló las leyes del movimiento planetario.',
    info: 'Sus rayos brillantes destacan sobre el oscuro Oceanus Procellarum y se ven con unos simples binoculares, por lo que es un objetivo clásico para aficionados.' },
  { id: 'arquimedes', name: 'Arquímedes', lat: 29.7, lon: -4.0, diam: 83, depth: 2.1, age: 'Más de 3.000 millones de años',
    etym: 'Arquímedes de Siracusa (c. 287-212 a. C.), matemático e inventor.',
    info: 'Gran cráter inundado por lava en el Mare Imbrium, con borde bajo y suelo casi liso. Al sureste, cerca de los Montes Apeninos, alunizó Apolo 15 en 1971.' },
  { id: 'aristoteles', name: 'Aristóteles', lat: 50.2, lon: 17.4, diam: 87, depth: 3.4,
    etym: 'Aristóteles (384-322 a. C.), filósofo y naturalista griego.',
    info: 'Cráter de paredes aterrazadas situado cerca del Mare Frigoris, al norte del Mare Serenitatis. Su manto de eyecciones cubre un área mucho mayor que el propio cráter.' },
  { id: 'eratostenes', name: 'Eratóstenes', lat: 14.5, lon: -11.3, diam: 58, depth: 3.6, age: 'Da nombre al período Eratosteniano',
    etym: 'Eratóstenes de Cirene (c. 276-194 a. C.), que midió la circunferencia de la Tierra.',
    info: 'Se alza en el extremo sur de los Montes Apeninos, frente al Mare Imbrium. Su nombre se usa para el período Eratosteniano de la escala geológica lunar.' },
  { id: 'langrenus', name: 'Langrenus', lat: -8.9, lon: 61.1, diam: 132, depth: 2.7,
    etym: 'Michiel van Langren (Langrenus), cosmógrafo flamenco que dibujó uno de los primeros mapas lunares (1645).',
    info: 'Cráter del borde oriental, junto al Mare Fecunditatis, con picos centrales y paredes aterrazadas. Por su cercanía al limbo se ve muy alargado desde la Tierra.' }
];

/* Mares lunares (decorativos): [latitud, longitud, ancho %, alto %, rotación °] */
const MARIA = [
  [32, -16, 28, 24, 0], [28, 17.5, 15, 15, 0], [8.5, 31, 17, 15, 0], [17, 59, 10, 8, 0],
  [-7.8, 51, 13, 12, 0], [-21, -16, 14, 12, 0], [-24, -39, 8, 8, 0], [18, -57, 24, 40, 15],
  [56, 0, 30, 7, 0], [-15, 34, 7, 7, 0], [13, 3, 7, 7, 0],
  [8, -22, 10, 8, 0], [-10, -23, 6, 5, 0], [38, 29, 9, 5, 0], [44, -31, 6, 5, 0]
];

/* ---------- 2. Utilidades ---------- */
const $ = id => document.getElementById(id);
const wrap = $('wrap'), disk = $('disk'), ring = $('ring'), box = $('markers'),
      info = $('info'), list = $('list'), reset = $('reset'), search = $('search');
const MOON_KM = 3474; // diámetro de la Luna
const stage = document.querySelector('.stage'), ld = document.createElement('p');
ld.className = 'loading'; ld.textContent = 'Preparando la Luna…'; stage.append(ld); // aviso mientras se genera la textura
const mobile = () => innerWidth <= 860;

/* Proyección ortográfica: (lat, lon) → % dentro del disco lunar */
const project = (lat, lon) => {
  const a = lat * Math.PI / 180, b = lon * Math.PI / 180;
  return { x: 50 + 50 * Math.cos(a) * Math.sin(b), y: 50 - 50 * Math.sin(a) };
};
const place = (el, p) => { el.style.left = p.x + '%'; el.style.top = p.y + '%'; };
const coord = (lat, lon) => `${Math.abs(lat).toFixed(1)}° ${lat < 0 ? 'S' : 'N'}, ${Math.abs(lon).toFixed(1)}° ${lon < 0 ? 'O' : 'E'}`;
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const num = n => n.toLocaleString('es-ES');

/* ---------- 3. Textura lunar procedural (canvas con relieve e iluminación) ---------- */
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Cráteres jóvenes: [nº de rayos, largo de rayos, brillo]; y cráteres inundados por lava
const FRESH = { tycho: [30, .95, .5], copernico: [22, .42, .35], kepler: [14, .26, .3], aristarco: [10, .2, .45] };
const FLOODED = ['platon', 'arquimedes'];

function paintMoon() {
  const N = innerWidth > 860 ? 2048 : 1400, R0 = N / 2;
  const cv = document.createElement('canvas');
  cv.width = cv.height = N; cv.className = 'tex';
  const g = cv.getContext('2d'), img = g.createImageData(N, N), px = img.data;
  const h = new Float32Array(N * N), A = new Float32Array(N * N), M = new Uint8Array(N * N);

  // Ruido de valor + fbm
  const hash = (x, y) => { let k = Math.imul(x, 374761393) + Math.imul(y, 668265263) | 0; k = Math.imul(k ^ (k >>> 13), 1274126177); return ((k ^ (k >>> 16)) >>> 0) / 4294967296; };
  const vn = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    return hash(xi, yi) * (1 - u) * (1 - v) + hash(xi + 1, yi) * u * (1 - v) + hash(xi, yi + 1) * (1 - u) * v + hash(xi + 1, yi + 1) * u * v; };
  const fbm = (x, y) => { let s = 0, a = .5; for (let o = 0; o < 4; o++) { s += a * vn(x, y); x *= 2.03; y *= 2.03; a *= .5; } return s; };

  // Mares: elipses con borde irregular (coordenadas del disco: -1..1, y hacia abajo)
  const mr = MARIA.map(([la, lo, w, hh, r]) => { const p = project(la, lo), t = r * Math.PI / 180, w1 = w / 100, h1 = hh / 100;
    return { x: (p.x - 50) / 50, y: (p.y - 50) / 50, c: Math.cos(t), s: Math.sin(t), w: w1, h: h1, R: 1.7 * Math.max(w1, h1) }; });
  const mare = (x, y, n) => { let m = 0;
    for (const e of mr) { const dx = x - e.x, dy = y - e.y; if (dx * dx + dy * dy > e.R * e.R) continue;
      const a = (dx * e.c + dy * e.s) / e.w, b = (-dx * e.s + dy * e.c) / e.h;
      m = Math.max(m, (1.15 - Math.sqrt(a * a + b * b) + (n - .48) * .9) / .35); }
    return Math.min(1, Math.max(0, m)); };

  // a) Terreno base: tierras altas rugosas y mares lisos y oscuros
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const x = (i + .5 - R0) / R0, y = (j + .5 - R0) / R0;
    if (x * x + y * y > 1) continue;
    const k = j * N + i, n = fbm(x * 4 + 9, y * 4 + 3), m = mare(x, y, n);
    M[k] = m * 255;
    h[k] = (n - .48) * .03 * (1 - .85 * m);
    A[k] = (.6 + (n - .48) * .5 + (vn(x * 140, y * 140) - .5) * .1) * (1 - .5 * m);
  }

  // b) Un cráter: cuenco, borde elevado, manto de eyecciones y pico central (r en píxeles)
  const stamp = (cx, cy, r, deg, fb, flood) => {
    const rr = r / R0, d = .3 * rr * Math.min(1, (.012 / rr) ** .6) * deg, rh = .3 * d, e = Math.ceil(r * 2.6);
    for (let j = Math.max(1, Math.floor(cy - e)); j <= Math.min(N - 2, Math.ceil(cy + e)); j++)
      for (let i = Math.max(1, Math.floor(cx - e)); i <= Math.min(N - 2, Math.ceil(cx + e)); i++) {
        const t = Math.hypot(i - cx, j - cy) / r;
        if (t > 2.6) continue;
        const k = j * N + i;
        let dh = t < 1 ? -d * (1 - t * t) + rh * t ** 8 : rh * t ** -3;
        if (t < 1 && rr > .02) dh += .5 * d * Math.exp(-((t / .09) ** 2));
        h[k] += dh;
        if (fb) A[k] += fb * (t < 1 ? .7 : Math.max(0, 1 - (t - 1) / 1.2));
        if (flood && t < .92) A[k] *= .72;
      }
  };

  // c) Miles de cráteres aleatorios (muchos pequeños, pocos grandes; menos en los mares)
  for (let q = 0; q < 4200; q++) {
    const lat = Math.asin(rnd() * 2 - 1), lon = (rnd() - .5) * Math.PI;
    const X = Math.cos(lat) * Math.sin(lon), Y = Math.sin(lat), c = Math.cos(lat) * Math.cos(lon);
    const rr = .003 * (1 - rnd()) ** -.5;
    if (rr > .05 || c < .2) continue;
    const i = Math.floor(R0 + X * R0), j = Math.floor(R0 - Y * R0);
    if (rnd() < M[j * N + i] / 255 * .8) continue;
    stamp(i, j, rr * R0 * (.4 + .6 * c), .25 + rnd() * .75, rnd() < .1 ? .12 + rnd() * .15 : 0, 0);
  }

  // d) Los cráteres famosos, a su tamaño real, con rayos brillantes los más jóvenes
  CRATERS.forEach(c => {
    const p = project(c.lat, c.lon), ux = (p.x - 50) / 50, uy = (p.y - 50) / 50, cc = Math.sqrt(Math.max(0, 1 - ux * ux - uy * uy));
    const cx = p.x / 100 * N, cy = p.y / 100 * N, r = c.diam / 2 / 1737 * R0 * (.4 + .6 * cc), f = FRESH[c.id];
    if (f) for (let q = 0; q < f[0]; q++) {
      const a = rnd() * 6.283, L = f[1] * R0 * (.35 + .65 * rnd()), w = 1 + rnd() * 2.5, b = f[2] * (.06 + rnd() * .08);
      for (let s = r; s < L; s += .7) { const v = b * (1 - s / L), ex = cx + Math.cos(a) * s, ey = cy + Math.sin(a) * s;
        for (let o = -w; o <= w; o++) { const i = Math.round(ex - Math.sin(a) * o), j = Math.round(ey + Math.cos(a) * o);
          if (i > 0 && j > 0 && i < N - 1 && j < N - 1) A[j * N + i] += v * (1 - Math.abs(o) / (w + 1)); } }
    }
    const flood = FLOODED.includes(c.id);
    stamp(cx, cy, r, flood ? .35 : f ? 1 : .6, f ? f[2] : 0, flood);
  });

  // e) Iluminación: normal de la esfera + pendiente del relieve, luz desde arriba a la izquierda
  const L = [-.3, -.25, .92];
  for (let j = 1; j < N - 1; j++) for (let i = 1; i < N - 1; i++) {
    const x = (i + .5 - R0) / R0, y = (j + .5 - R0) / R0, r2 = x * x + y * y;
    if (r2 > 1) continue;
    const k = j * N + i, c = Math.sqrt(Math.max(.0004, 1 - r2));
    const nx = x - c * (h[k + 1] - h[k - 1]) * N / 4, ny = y - c * (h[k + N] - h[k - N]) * N / 4;
    const mu = Math.max(0, (nx * L[0] + ny * L[1] + c * L[2]) / Math.hypot(nx, ny, c));
    const v = Math.min(1, Math.min(1, A[k]) * mu ** .65 * 1.45 + .012), m = M[k] / 255, o = k * 4;
    px[o] = v * 255 * (1.02 - .07 * m);       // tinte: tierras altas cálidas, mares azulados
    px[o + 1] = v * 255 * (1 - .03 * m);
    px[o + 2] = v * 255 * (.96 + .04 * m);
    px[o + 3] = Math.min(1, (1 - Math.sqrt(r2)) * R0) * 255; // borde suavizado
  }
  g.putImageData(img, 0, 0);
  disk.append(cv);
  requestAnimationFrame(() => { cv.classList.add('on'); ld.remove(); });
}
// Se genera tras el primer dibujo para que la página aparezca al instante
/* ---------- 3b. Textura fotográfica real: mapa LRO de la NASA reproyectado al disco ---------- */
// Mapa cilíndrico (lon/lat) centrado en 0° de longitud. Fuente: NASA/Goddard SVS, CGI Moon Kit (datos de LRO).
const NASA = 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/';
const TEXTURES = [NASA + 'lroc_color_2k.jpg', NASA + 'lroc_color_poles_1k.jpg'];

function loadTexture(n = 0) {
  if (n >= TEXTURES.length) return paintMoon();        // sin conexión o sin CORS: Luna procedural
  const im = new Image();
  im.crossOrigin = 'anonymous';
  im.onload = () => { try { paintPhoto(im); } catch (e) { paintMoon(); } };
  im.onerror = () => loadTexture(n + 1);
  im.src = TEXTURES[n];
}

function paintPhoto(im) {
  const N = innerWidth > 860 ? 2048 : 1400, R0 = N / 2, W = im.width, H = im.height;
  const t = document.createElement('canvas');
  t.width = W; t.height = H;
  const tg = t.getContext('2d'); tg.drawImage(im, 0, 0);
  const T = tg.getImageData(0, 0, W, H).data;          // lanza error si el servidor no permite CORS
  const s = (u, v, ch) => T[(Math.min(H - 1, Math.max(0, v)) * W + (u + W) % W) * 4 + ch];
  const cv = document.createElement('canvas');
  cv.width = cv.height = N; cv.className = 'tex';
  const g = cv.getContext('2d'), img = g.createImageData(N, N), px = img.data;
  const C = new Float32Array(N * N * 3), Y = new Float32Array(N * N);

  // a) Reproyección: para cada píxel del disco se calcula su (lat, lon) y se muestrea el mapa (bilineal)
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const x = (i + .5 - R0) / R0, y = (j + .5 - R0) / R0, r2 = x * x + y * y;
    if (r2 > 1) continue;
    const u = (Math.atan2(x, Math.sqrt(1 - r2)) / (2 * Math.PI) + .5) * W - .5, v = (.5 - Math.asin(-y) / Math.PI) * H - .5;
    const u0 = Math.floor(u), v0 = Math.floor(v), fu = u - u0, fv = v - v0, k = j * N + i;
    for (let ch = 0; ch < 3; ch++)
      C[k * 3 + ch] = (s(u0, v0, ch) * (1 - fu) + s(u0 + 1, v0, ch) * fu) * (1 - fv) + (s(u0, v0 + 1, ch) * (1 - fu) + s(u0 + 1, v0 + 1, ch) * fu) * fv;
    Y[k] = (C[k * 3] + C[k * 3 + 1] + C[k * 3 + 2]) / 765;
  }

  // b) Relieve simulado (bump map): la luminancia del mapa actúa como altura y perturba la normal de la esfera
  const L = [-.3, -.25, .92];                           // luz desde arriba a la izquierda
  const clamp = v => Math.max(-.5, Math.min(.5, v));
  for (let j = 2; j < N - 2; j++) for (let i = 2; i < N - 2; i++) {
    const x = (i + .5 - R0) / R0, y = (j + .5 - R0) / R0, r2 = x * x + y * y;
    if (r2 > 1) continue;
    const k = j * N + i, c = Math.sqrt(Math.max(.0004, 1 - r2)), edge = r2 < .985;
    const bx = edge ? clamp((Y[k + 2] - Y[k - 2]) * 3) : 0, by = edge ? clamp((Y[k + 2 * N] - Y[k - 2 * N]) * 3) : 0;
    const nx = x - c * bx, ny = y - c * by;
    const mu = Math.max(0, (nx * L[0] + ny * L[1] + c * L[2]) / Math.hypot(nx, ny, c));
    const sh = mu ** .65 * 1.25 + .02, o = k * 4;
    px[o] = Math.min(255, C[k * 3] * sh);
    px[o + 1] = Math.min(255, C[k * 3 + 1] * sh);
    px[o + 2] = Math.min(255, C[k * 3 + 2] * sh);
    px[o + 3] = Math.min(1, (1 - Math.sqrt(r2)) * R0) * 255;
  }
  g.putImageData(img, 0, 0);
  disk.append(cv);
  requestAnimationFrame(() => { cv.classList.add('on'); ld.remove(); });
}
requestAnimationFrame(() => setTimeout(loadTexture, 30));

/* ---------- 4. Marcadores y lista lateral ---------- */
CRATERS.forEach(c => {
  c.p = project(c.lat, c.lon);

  c.m = document.createElement('button');
  c.m.className = 'marker';
  c.m.setAttribute('aria-label', c.name);
  c.m.innerHTML = `<i></i><span>${c.name}</span>`;
  place(c.m, c.p);
  c.m.onclick = () => select(c.id);
  box.append(c.m);

  c.li = document.createElement('li');
  c.li.innerHTML = `<button>${c.name}<small>Diámetro: ${c.diam} km</small></button>`;
  c.b = c.li.firstChild;
  c.b.onclick = () => select(c.id);
  list.append(c.li);
});

/* ---------- 5. Seleccionar cráter: zoom + panel ---------- */
function select(id) {
  const c = CRATERS.find(x => x.id === id);
  if (!c) return;

  // Zoom proporcional al tamaño del cráter (entre 3,5x y 8x)
  const size = c.diam / MOON_KM * 100;                // tamaño real en % del disco
  const S = Math.min(8, Math.max(3.5, 26 / size));
  wrap.style.setProperty('--inv', 1 / S);
  wrap.style.transform = `translate(${-(c.p.x - 50) * S}%, ${-(c.p.y - 50) * S}%) scale(${S})`;

  // Anillo resaltado a escala real
  ring.hidden = false;
  place(ring, c.p);
  ring.style.width = ring.style.height = size + '%';

  // Panel de información
  info.innerHTML = `
    <button class="x" aria-label="Cerrar">×</button>
    <h2>${c.name}</h2>
    <p class="etym">${c.etym}</p>
    <dl class="stats">
      <div><dt>Diámetro</dt><dd>${num(c.diam)} km</dd></div>
      <div><dt>Profundidad</dt><dd>≈ ${String(c.depth).replace('.', ',')} km</dd></div>
      <div><dt>Coordenadas</dt><dd>${coord(c.lat, c.lon)}</dd></div>
      ${c.age ? `<div><dt>Edad</dt><dd>${c.age}</dd></div>` : ''}
    </dl>
    <p class="txt">${c.info}</p>
    <div class="nav"><button data-d="-1">Anterior</button><button data-d="1">Siguiente</button></div>`;
  info.classList.add('open');
  if (mobile()) stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // en móvil, asegura ver el mapa

  // Estado visual
  CRATERS.forEach(x => { x.m.classList.toggle('on', x === c); x.b.classList.toggle('on', x === c); });
  reset.hidden = false;
  history.replaceState(null, '', '#' + id); // enlace directo: ...#tycho
}

/* ---------- 6. Reiniciar vista ---------- */
function resetView() {
  wrap.style.transform = '';
  wrap.style.setProperty('--inv', 1);
  ring.hidden = true;
  info.classList.remove('open');
  CRATERS.forEach(x => { x.m.classList.remove('on'); x.b.classList.remove('on'); });
  reset.hidden = true;
  history.replaceState(null, '', location.pathname);
}
reset.onclick = resetView;
info.onclick = e => {
  if (e.target.closest('.x')) return resetView();
  const b = e.target.closest('[data-d]');                       // botones Anterior / Siguiente
  if (b) {
    const i = CRATERS.findIndex(x => x.b.classList.contains('on'));
    select(CRATERS[(i + +b.dataset.d + CRATERS.length) % CRATERS.length].id);
  }
};
document.onkeydown = e => { if (e.key === 'Escape') resetView(); };

/* ---------- 7. Buscador ---------- */
search.oninput = () => {
  const q = norm(search.value);
  CRATERS.forEach(c => {
    const ok = norm(c.name).includes(q);
    c.li.hidden = !ok;
    c.m.classList.toggle('dim', !ok);
  });
};
search.onkeydown = e => {
  if (e.key !== 'Enter') return;
  const c = CRATERS.find(x => !x.li.hidden);
  if (c) select(c.id);
};

/* ---------- 8. Abrir desde un enlace directo (#tycho) ---------- */
select(location.hash.slice(1));
