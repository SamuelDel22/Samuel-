# AERIS · Cauca Guardians

Experiencia educativa retro y bilingüe (ES/EN) sobre la contaminación del río Cauca en el Bajo Cauca antioqueño. Proyecto estudiantil de la Orden Aeris (Clase 10 English).

- **Información:** historia del río, datos rápidos, fotografías de campo, mercurio y peces, normas y reparación, códice (glosario y mitos/hechos) y acciones del Guardián.
- **Juego:** campaña RPG de 5 misiones en el mapa del Bajo Cauca, con jefes, reliquias, notas de campo y certificado descargable.

## Estructura

```
index.html            Página única (marcado limpio, sin scripts en línea)
aeris-logo.jpeg       Logo
assets/               Archivos de producción
  js/app.min.js         (generado)
  styles.min.css        (generado)
  field/ rpg/ section-icons/ audio/   Imágenes (WebP) y audio (MP3)
src/                  Código fuente legible
  css/styles.css
  js/parts/NN-*.js      Se concatenan en orden de nombre
tools/build.mjs       Minifica src/ → assets/
_headers              Cabeceras y caché para Cloudflare Pages
```

## Editar y publicar

```bash
npm install
npm run build     # regenera assets/js/app.min.js y assets/styles.min.css
npm run serve     # prueba local en http://localhost:8080
```

Edita siempre `src/` (no los `.min`) y ejecuta `npm run build` antes de subir. Cloudflare Pages: sin comando de build, directorio raíz del repositorio.

## Contenido y traducciones

- Las secciones nuevas usan `data-es="..."` junto al texto en inglés (`src/js/parts/92-learning.js` aplica el cambio de idioma).
- Textos del hero, datos rápidos, galería y mercurio: diccionario `I18N` en `src/js/parts/02-i18n-language.js`.
- Misiones, preguntas y notas de campo: `src/js/parts/91-campaign.js`.
- Fuentes y enlaces: pie de página de `index.html`. Comprueba los enlaces antes de presentar.

## Accesibilidad

Foco visible, `prefers-reduced-motion`, textos alternativos, joystick accesible con teclado (enfócalo y usa ← →) y roles/ARIA en diálogo y controles.
