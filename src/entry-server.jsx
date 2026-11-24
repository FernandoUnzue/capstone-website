import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { headTags, ROUTES, SITE_URL, CASE_SLUGS, casePath } from './seo.js';
import { CASE_PAGES, CASES, SERVICES, VIDEOS } from './data.js';

export { ROUTES, SITE_URL };

export function render(path) {
  return { html: renderToString(<App initialPath={path} />), head: headTags(path) };
}

/** Resumen en Markdown para buscadores de IA (llms.txt). */
export function llmsTxt(full = false) {
  const L = [];
  L.push('# Capstone', '');
  L.push('> Capstone (Data on your side™) desarrolla e implementa software a medida, plataformas de datos e inteligencia artificial para organizaciones de Argentina, Europa y Latinoamérica. Es la empresa detrás de Enerflux (gestión de datos energéticos) y FidelyFlux (fidelización de clientes).', '');
  L.push('- Oficinas: Mar del Plata (Argentina) y Madrid (España)');
  L.push('- Contacto: hi@capstoneside.com · +54 9 223 595 3896 · ' + SITE_URL + '/#contacto');
  L.push('- Equipo fundador: Ignacio Noli (Business Director), Fernando Unzué (Technology Director), Mariano Faiella (Digital Transformation)', '');
  L.push('## Servicios', '');
  for (const s of SERVICES) L.push(`- **${s.name}**: ${s.text} (${s.items.join(', ')})`);
  L.push('', '## Productos', '');
  L.push('- [Enerflux](https://www.enerflux.com.ar): plataforma para empresas energéticas, cooperativas, reguladores e industrias. Unifica datos de medición, calidad y operación para detectar desvíos, optimizar recursos y automatizar reportes regulatorios.');
  L.push(`- [FidelyFlux](${SITE_URL}/#fidelyflux): plataforma de fidelización con puntos, premios y beneficios, para shoppings, comercios, entidades públicas, cooperativas y distribuidoras.`);
  L.push('', '## Casos de éxito', '');
  for (const c of CASES) L.push(`- [${c.client} (${c.geo})](${SITE_URL}${casePath(c.detail)}): ${c.text}`);
  L.push('', '## Videos', '');
  for (const v of VIDEOS) L.push(`- [${v.title}](${v.url}): “${v.quote}”`);
  if (full) {
    for (const key of Object.keys(CASE_SLUGS)) {
      const c = CASE_PAGES[key];
      L.push('', `## Caso: ${c.logoAlt}`, '', `URL: ${SITE_URL}${casePath(key)}`, '');
      L.push(`### ${c.titleA} ${c.titleB}`, '', c.lead, '');
      for (const [k, v] of c.facts) L.push(`- ${k}: ${v}`);
      L.push('', `**El desafío — ${c.chTitle}** ${c.ch}`, '', `**La solución — ${c.soA} ${c.soB}** ${c.soLead}`, '');
      for (const [t, d] of c.feats) L.push(`- ${t}: ${d}`);
      L.push('', `**El resultado — ${c.reTitle}**`, '');
      for (const [n, t] of c.stats) L.push(`- ${n}: ${t}`);
      if (c.quote) L.push('', `> ${c.quote} — ${c.who}, ${c.role}`);
    }
  } else {
    L.push('', '## Optional', '', `- [Versión completa con el detalle de cada caso](${SITE_URL}/llms-full.txt)`);
  }
  return L.join('\n') + '\n';
}
