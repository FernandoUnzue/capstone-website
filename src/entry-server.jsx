import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { content, LANGS } from './i18n.js';
import { casePath, CASE_SLUGS, getMeta, headTags, parsePath, pathIn, ROUTES, SITE_URL } from './seo.js';

export { LANGS, ROUTES, SITE_URL, parsePath, pathIn };

export function render(path) {
  return { html: renderToString(<App initialPath={path} />), head: headTags(path), lang: getMeta(path).lang };
}

const LLM = {
  es: {
    intro: 'Capstone (Data on your side™) desarrolla e implementa software a medida, plataformas de datos e inteligencia artificial para organizaciones de Argentina, Europa y Latinoamérica. Es la empresa detrás de Enerflux (gestión de datos energéticos) y FidelyFlux (fidelización de clientes).',
    offices: 'Oficinas: Mar del Plata (Argentina) y Madrid (España)', contact: 'Contacto', founders: 'Equipo fundador: Ignacio Noli (Business Director), Fernando Unzué (Technology Director), Mariano Faiella (Digital Transformation)',
    services: 'Servicios', products: 'Productos', cases: 'Casos de éxito', videos: 'Videos', caseH: 'Caso', challenge: 'El desafío', solution: 'La solución', result: 'El resultado',
    enerflux: 'plataforma para empresas energéticas, cooperativas, reguladores e industrias. Unifica datos de medición, calidad y operación para detectar desvíos, optimizar recursos y automatizar reportes regulatorios.',
    fidelyflux: 'plataforma de fidelización con puntos, premios y beneficios, para shoppings, comercios, entidades públicas, cooperativas y distribuidoras.',
    full: 'Versión completa con el detalle de cada caso', other: 'English version',
  },
  en: {
    intro: 'Capstone (Data on your side™) builds and implements custom software, data platforms and artificial intelligence for organizations in Argentina, Europe and Latin America. It is the company behind Enerflux (energy data management) and FidelyFlux (customer loyalty).',
    offices: 'Offices: Mar del Plata (Argentina) and Madrid (Spain)', contact: 'Contact', founders: 'Founding team: Ignacio Noli (Business Director), Fernando Unzué (Technology Director), Mariano Faiella (Digital Transformation)',
    services: 'Services', products: 'Products', cases: 'Case studies', videos: 'Videos', caseH: 'Case study', challenge: 'The challenge', solution: 'The solution', result: 'The result',
    enerflux: 'platform for energy companies, cooperatives, regulators and industry. It unifies metering, quality and operations data to detect deviations, optimize resources and automate regulatory reporting.',
    fidelyflux: 'loyalty platform with points, rewards and benefits, for shopping malls, retailers, public bodies, cooperatives and utilities.',
    full: 'Full version with the details of every case study', other: 'Versión en español',
  },
};

/** Resumen en Markdown para buscadores de IA (llms.txt), por idioma. */
export function llmsTxt(lang = 'es', full = false) {
  const t = LLM[lang];
  const { SERVICES, CASES, VIDEOS, CASE_PAGES } = content(lang);
  const base = SITE_URL + (lang === 'en' ? '/en' : '');
  const home = lang === 'en' ? SITE_URL + '/en' : SITE_URL + '/';
  const L = [];
  L.push('# Capstone', '', `> ${t.intro}`, '');
  L.push(`- ${t.offices}`);
  L.push(`- ${t.contact}: hi@capstoneside.com · +54 9 223 595 3896 · ${home}#contacto`);
  L.push(`- ${t.founders}`, '');
  L.push(`## ${t.services}`, '');
  for (const s of SERVICES) L.push(`- **${s.name}**: ${s.text} (${s.items.join(', ')})`);
  L.push('', `## ${t.products}`, '');
  L.push(`- [Enerflux](https://www.enerflux.com.ar): ${t.enerflux}`);
  L.push(`- [FidelyFlux](${home}#fidelyflux): ${t.fidelyflux}`);
  L.push('', `## ${t.cases}`, '');
  for (const c of CASES) L.push(`- [${c.client} (${c.geo})](${SITE_URL}${casePath(c.detail, lang)}): ${c.text}`);
  L.push('', `## ${t.videos}`, '');
  for (const v of VIDEOS) L.push(`- [${v.title}](${v.url}): “${v.quote}”`);
  if (full) {
    for (const key of Object.keys(CASE_SLUGS)) {
      const c = CASE_PAGES[key];
      L.push('', `## ${t.caseH}: ${c.logoAlt}`, '', `URL: ${SITE_URL}${casePath(key, lang)}`, '');
      L.push(`### ${c.titleA} ${c.titleB}`, '', c.lead, '');
      for (const [k, v] of c.facts) L.push(`- ${k}: ${v}`);
      L.push('', `**${t.challenge} — ${c.chTitle}** ${c.ch}`, '', `**${t.solution} — ${c.soA} ${c.soB}** ${c.soLead}`, '');
      for (const [ti, d] of c.feats) L.push(`- ${ti}: ${d}`);
      L.push('', `**${t.result} — ${c.reTitle}**`, '');
      for (const [n, ti] of c.stats) L.push(`- ${n}: ${ti}`);
      if (c.quote) L.push('', `> ${c.quote} — ${c.who}, ${c.role}`);
    }
  } else {
    const otherBase = SITE_URL + (lang === 'en' ? '' : '/en');
    L.push('', '## Optional', '', `- [${t.full}](${base}/llms-full.txt)`, `- [${t.other}](${otherBase}/llms.txt)`);
  }
  return L.join('\n') + '\n';
}
