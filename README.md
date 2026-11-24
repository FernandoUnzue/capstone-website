# Capstone · Sitio web

Sitio en **React 18 + Vite**, prerenderizado a HTML estático (SSG) para SEO e indexación por buscadores y asistentes de IA. Formulario de contacto con función serverless de Vercel.

## Comandos

```sh
npm install
npm run dev       # http://localhost:5173 (incluye /api/contact; sin RESEND_API_KEY imprime el mensaje en consola)
npm run build     # build cliente + SSR + prerender → dist/
npm run preview   # sirve dist/ (sin /api)
```

## Estructura

```
index.html                 plantilla (Vite inyecta <head> y HTML prerenderizado)
src/
  main.jsx                 hidratación en el navegador
  entry-server.jsx         render a string + generador de llms.txt
  App.jsx                  layout y enrutador mínimo (/ y /casos/:slug)
  data.js                  contenido: servicios, casos, videos
  seo.js                   dominio, rutas, <title>/description, Open Graph, JSON-LD
  css.js                   helper s("css en línea") → objeto de estilos React
  styles.css               estilos globales
  components/              una sección por componente + ContactForm, CaseStudy, Lightbox
api/contact.js             función serverless: valida, antispam y envía con Resend
scripts/prerender.mjs      genera las páginas HTML, sitemap.xml, robots.txt, llms.txt, llms-full.txt, 404.html
public/assets/             imágenes y video
```

## SEO e indexación

- Cada ruta se entrega como **HTML completo** (los crawlers de IA no ejecutan JavaScript).
- Una página propia por caso de éxito: `/casos/provincia-de-san-luis`, `/casos/mia-world`, `/casos/alohar`, `/casos/centro-de-estudios-digestivos`, `/casos/acf-fiorentina`, `/casos/fabiani-gioiellerie`, `/casos/gazeta-celesi`.
- `<title>`, meta description, canonical, Open Graph y Twitter Card por página.
- Datos estructurados JSON-LD (schema.org): Organization (direcciones, contacto, fundadores), WebSite, Service, SoftwareApplication (Enerflux, FidelyFlux), VideoObject, Article y BreadcrumbList en los casos.
- `sitemap.xml` y `robots.txt` (permite explícitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.).
- `llms.txt` y `llms-full.txt`: resumen en Markdown para asistentes de IA, generado desde `src/data.js`.
- Un solo `<h1>` por página, `alt` en todas las imágenes, carga diferida (`loading="lazy"`) debajo del hero.

Para agregar un caso: sumarlo en `src/data.js` (`CASES` y `CASE_PAGES`) y en `src/seo.js` (`CASE_SLUGS` y `CASE_TITLES`). El sitemap y llms.txt se regeneran solos.

## Formulario de contacto

`POST /api/contact` valida los datos, descarta bots (campo trampa) y limita envíos por IP, y manda el mail con [Resend](https://resend.com) con `reply-to` al remitente.

Variables de entorno (ver `.env.example`):

| Variable | Uso |
|---|---|
| `RESEND_API_KEY` | Obligatoria en producción. |
| `CONTACT_TO` | Destinatarios, separados por coma (default `hi@capstoneside.com`). |
| `CONTACT_FROM` | Remitente de un dominio verificado en Resend (default `Capstone Web <web@capstoneside.com>`). |
| `VITE_SITE_URL` | Dominio canónico (default `https://capstoneside.com`). |

## Deploy (Vercel)

Importar el repo: `vercel.json` ya define el build (`npm run build`), la salida (`dist`), URLs limpias y cabeceras de caché. Cargar las variables de entorno y verificar el dominio en Resend.

Después del primer deploy: dar de alta el sitio en Google Search Console y Bing Webmaster Tools y enviar `https://<dominio>/sitemap.xml`.
