# Changelog

## 3.1.0 — Optimización y limpieza
- Scripts en línea → `src/js/parts/*.js` y un único `app.min.js`; CSS en un único `styles.min.css`. `index.html` pasó de 231 KB a ~40 KB.
- Eliminado código sin uso: chatbot, quiz anterior, motor de campaña v78 duplicado, scripts que apuntaban a elementos inexistentes, 10 archivos CSS/JS vacíos u obsoletos.
- CSS depurado de reglas sin uso (346 KB → 220 KB minificado).
- Imágenes a WebP (11,5 MB → 5,1 MB), audio WAV → MP3 (1,3 MB → 0,35 MB). Borradas imágenes sin referencia (insignias, reliquias, intro, what-if, SVG).
- Añadido `showToast` (el botón SFX lanzaba un error), `_headers`, `robots.txt`, `README`, build reproducible.

## 3.0.0 — Revisión y mejoras de contenido
Ver notas anteriores: enlaces de fuentes reparados, secciones nuevas (río, mercurio con estudio y cadena alimentaria, normas, códice), notas de campo, certificado, respuestas mezcladas y accesibilidad por teclado.
