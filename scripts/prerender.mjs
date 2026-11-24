// Genera el HTML estático de cada ruta (SSG) y los archivos para buscadores e IA:
// sitemap.xml, robots.txt, llms.txt, llms-full.txt y 404.html.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, ROUTES, SITE_URL, LANGS, pathIn, llmsTxt } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const write = (rel, content) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('  ✓', rel);
};

for (const route of ROUTES) {
  const { html, head, lang } = render(route);
  const page = template.replace('<html lang="es">', `<html lang="${lang}">`).replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  write(route === '/' ? 'index.html' : route.slice(1) + '.html', page);
}

// 404: la home con noindex.
{
  const { html, head } = render('/');
  const page = template
    .replace('<!--app-head-->', head.replace(/<link rel="canonical"[^>]*>\n?/, '').replace(/content="index, follow[^"]*"/, 'content="noindex, follow"'))
    .replace('<!--app-html-->', html);
  write('404.html', page);
}

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ROUTES.map((r) => {
  const home = r === '/' || r === '/en';
  const alts = [...LANGS.map((l) => [l, pathIn(r, l)]), ['x-default', pathIn(r, 'es')]]
    .map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${p}"/>`)
    .join('\n');
  return `  <url>\n    <loc>${SITE_URL}${r}</loc>\n${alts}\n    <lastmod>${today}</lastmod>\n    <changefreq>${home ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${home ? '1.0' : '0.8'}</priority>\n  </url>`;
}).join('\n')}
</urlset>
`
);

// Buscadores y crawlers de IA permitidos explícitamente.
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'meta-externalagent', 'CCBot', 'cohere-ai', 'MistralAI-User'];
write(
  'robots.txt',
  `# Capstone · ${SITE_URL}
# Sitio abierto a buscadores y asistentes de IA.

User-agent: *
Allow: /
Disallow: /api/

${AI_BOTS.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`
);

write('llms.txt', llmsTxt('es', false));
write('llms-full.txt', llmsTxt('es', true));
write('en/llms.txt', llmsTxt('en', false));
write('en/llms-full.txt', llmsTxt('en', true));

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerender listo: ${ROUTES.length} páginas · ${SITE_URL}`);
