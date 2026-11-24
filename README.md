# Capstone · Sitio web

Sitio estático (sin build). Generado a partir de `Capstone-sitio.html` (nov 2026): las imágenes y el video embebidos en base64 se extrajeron a archivos, y el CSS y el JS se separaron.

```
index.html            página (SPA con templates + islas reactivas)
assets/css/styles.css estilos
assets/js/app.js      lógica (menú, servicios, videos, casos, contadores, formulario)
assets/img/           logos, fotos y capturas
assets/video/         video de fondo del hero
```

## Desarrollo local

```sh
python -m http.server 8000   # http://localhost:8000
```

## Deploy

Directorio raíz = `/`, sin comando de build (por ejemplo, en Vercel: Framework Preset "Other").
