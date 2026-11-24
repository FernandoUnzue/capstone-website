import { content, LANGS, OG_LOCALE } from './i18n.js';

// Dominio canónico. Se puede sobrescribir con la variable de entorno VITE_SITE_URL al compilar.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.capstoneside.com').replace(/\/$/, '');

export const ORG = {
  name: 'Capstone',
  slogan: 'Data on your side™',
  email: 'hi@capstoneside.com',
  phone: '+5492235953896',
  logo: '/assets/img/capstone.png',
  linkedin: 'https://ar.linkedin.com/company/capstoneside',
  addresses: [
    { street: 'Bernardo de Irigoyen 3918, Playa Grande', postal: 'B7600', city: 'Mar del Plata', region: 'Buenos Aires', country: 'AR' },
    { street: 'Calle de Manzanares 4, Arganzuela', postal: '28005', city: 'Madrid', region: 'Madrid', country: 'ES' },
  ],
};

// Ruta pública de cada caso de éxito (el slug es el mismo en ambos idiomas).
export const CASE_SLUGS = {
  sanluis: 'provincia-de-san-luis',
  mia: 'mia-world',
  alohar: 'alohar',
  ced: 'centro-de-estudios-digestivos',
  fiorentina: 'acf-fiorentina',
  fabiani: 'fabiani-gioiellerie',
  celesi: 'gazeta-celesi',
};

/** /casos/<slug> en español, /en/cases/<slug> en inglés. */
export const casePath = (key, lang = 'es') => (lang === 'en' ? `/en/cases/${CASE_SLUGS[key]}` : `/casos/${CASE_SLUGS[key]}`);

/** Interpreta una ruta: idioma y caso (o null si es la home). */
export function parsePath(path) {
  const p = path.replace(/\/+$/, '') || '/';
  const lang = p === '/en' || p.startsWith('/en/') ? 'en' : 'es';
  const m = lang === 'en' ? p.match(/^\/en\/cases\/([\w-]+)$/) : p.match(/^\/casos\/([\w-]+)$/);
  const caseKey = m ? Object.keys(CASE_SLUGS).find((k) => CASE_SLUGS[k] === m[1]) || null : null;
  return { lang, caseKey };
}

/** Ruta equivalente en otro idioma. */
export function pathIn(path, lang) {
  const { caseKey } = parsePath(path);
  if (caseKey) return casePath(caseKey, lang);
  return lang === 'en' ? '/en' : '/';
}

export const ROUTES = LANGS.flatMap((lang) => [lang === 'en' ? '/en' : '/', ...Object.keys(CASE_SLUGS).map((k) => casePath(k, lang))]);

// <title> de cada caso (≈60 caracteres, lo que muestran los buscadores).
const CASE_TITLES = {
  es: {
    sanluis: 'San Luis: plataforma de calidad del servicio eléctrico | Capstone',
    mia: 'MIA World: app de cashback, beneficios y premios | Capstone',
    alohar: 'Alohar: plataforma de alquileres temporarios | Capstone',
    ced: 'Centro de Estudios Digestivos: conciliación con PAMI | Capstone',
    fiorentina: 'ACF Fiorentina: In Viola Card, fidelización en el fútbol | Capstone',
    fabiani: 'Fabiani Gioiellerie: app de fidelización iOS y Android | Capstone',
    celesi: 'Çelësi: reingeniería y cuenta única (SSO) | Capstone',
  },
  en: {
    sanluis: 'San Luis: electricity service-quality data platform | Capstone',
    mia: 'MIA World: cashback, benefits and rewards app | Capstone',
    alohar: 'Alohar: vacation rental platform for Latin America | Capstone',
    ced: 'CED: automated healthcare billing reconciliation | Capstone',
    fiorentina: 'ACF Fiorentina: In Viola Card football loyalty | Capstone',
    fabiani: 'Fabiani Gioiellerie: iOS and Android loyalty app | Capstone',
    celesi: 'Çelësi: platform re-engineering and single sign-on | Capstone',
  },
};

const HOME = {
  es: {
    title: 'Capstone · Software, plataformas de datos e IA | Data on your side™',
    description: 'Desarrollamos e implementamos software a medida, plataformas de datos e inteligencia artificial. Creadores de Enerflux (energía) y FidelyFlux (fidelización). Argentina y España.',
  },
  en: {
    title: 'Capstone · Software, data platforms and AI | Data on your side™',
    description: 'We build and implement custom software, data platforms and artificial intelligence. Makers of Enerflux (energy) and FidelyFlux (loyalty). Based in Argentina and Spain.',
  },
};

const L = {
  es: {
    services: 'Servicios de Capstone', cases: 'Casos de éxito', home: 'Inicio', casesCrumb: 'Casos',
    know: ['Data & Analytics', 'Inteligencia artificial', 'Desarrollo de software a medida', 'Transformación digital', 'Programas de fidelización', 'Calidad del servicio eléctrico'],
    enerflux: 'Plataforma para empresas energéticas, cooperativas, reguladores e industrias: calidad de red, interrupciones y reportes regulatorios.',
    fidelyflux: 'Plataforma de fidelización: puntos, premios y beneficios para shoppings, comercios, entidades públicas, cooperativas y distribuidoras.',
    founders: ['Co-Founder · Business Director', 'Co-Founder · Technology Director', 'Co-Founder · Digital Transformation'],
  },
  en: {
    services: 'Capstone services', cases: 'Case studies', home: 'Home', casesCrumb: 'Case studies',
    know: ['Data & Analytics', 'Artificial intelligence', 'Custom software development', 'Digital transformation', 'Loyalty programs', 'Electricity service quality'],
    enerflux: 'Platform for energy companies, cooperatives, regulators and industry: grid quality, outages and regulatory reporting.',
    fidelyflux: 'Loyalty platform: points, rewards and benefits for shopping malls, retailers, public bodies, cooperatives and utilities.',
    founders: ['Co-Founder · Business Director', 'Co-Founder · Technology Director', 'Co-Founder · Digital Transformation'],
  },
};

const abs = (p) => (p.startsWith('http') ? p : SITE_URL + p);
const clip = (s, n = 158) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…');
const homeUrl = (lang) => SITE_URL + (lang === 'en' ? '/en' : '/');

const orgNode = (lang) => ({
  '@type': 'Organization',
  '@id': SITE_URL + '/#org',
  name: ORG.name,
  url: SITE_URL + '/',
  logo: abs(ORG.logo),
  slogan: ORG.slogan,
  email: ORG.email,
  telephone: ORG.phone,
  sameAs: [ORG.linkedin],
  address: ORG.addresses.map((a) => ({
    '@type': 'PostalAddress', streetAddress: a.street, postalCode: a.postal, addressLocality: a.city, addressRegion: a.region, addressCountry: a.country,
  })),
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: ORG.email, telephone: ORG.phone, availableLanguage: ['es', 'en', 'it'] },
  founder: ['Ignacio Noli', 'Fernando Unzué', 'Mariano Faiella'].map((name, i) => ({ '@type': 'Person', name, jobTitle: L[lang].founders[i] })),
  knowsAbout: L[lang].know,
});

const videoNode = (v, lang) => {
  const id = (v.url.match(/v=([\w-]+)/) || [])[1];
  return {
    '@type': 'VideoObject',
    name: v.title,
    description: v.quote,
    thumbnailUrl: abs(v.img),
    contentUrl: v.url,
    embedUrl: id ? `https://www.youtube.com/embed/${id}` : undefined,
    uploadDate: '2026-06-18',
    inLanguage: 'es',
    publisher: { '@id': SITE_URL + '/#org' },
    ...(lang === 'en' ? { description: v.quote + ' (Video in Spanish.)' } : {}),
  };
};

function homeJsonLd(lang) {
  const { SERVICES, CASES, VIDEOS } = content(lang);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(lang),
      { '@type': 'WebSite', '@id': SITE_URL + '/#web', url: SITE_URL + '/', name: 'Capstone', inLanguage: ['es', 'en'], publisher: { '@id': SITE_URL + '/#org' } },
      { '@type': 'WebPage', url: homeUrl(lang), name: HOME[lang].title, description: HOME[lang].description, inLanguage: lang, isPartOf: { '@id': SITE_URL + '/#web' } },
      {
        '@type': 'ItemList',
        name: L[lang].services,
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: { '@type': 'Service', name: s.name, description: s.text, provider: { '@id': SITE_URL + '/#org' } },
        })),
      },
      ...['Enerflux', 'FidelyFlux'].map((name) => ({
        '@type': 'SoftwareApplication',
        name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: name === 'Enerflux' ? 'https://www.enerflux.com.ar' : homeUrl(lang) + '#fidelyflux',
        description: name === 'Enerflux' ? L[lang].enerflux : L[lang].fidelyflux,
        publisher: { '@id': SITE_URL + '/#org' },
      })),
      {
        '@type': 'ItemList',
        name: L[lang].cases,
        itemListElement: CASES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(casePath(c.detail, lang)), name: c.client })),
      },
      ...VIDEOS.map((v) => videoNode(v, lang)),
    ],
  };
}

function caseJsonLd(key, lang) {
  const { CASE_PAGES, VIDEOS } = content(lang);
  const c = CASE_PAGES[key];
  const url = abs(casePath(key, lang));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(lang),
      {
        '@type': 'Article',
        '@id': url + '#article',
        headline: `${c.titleA} ${c.titleB}`,
        description: c.lead,
        image: abs(c.img),
        inLanguage: lang,
        url,
        author: { '@id': SITE_URL + '/#org' },
        publisher: { '@id': SITE_URL + '/#org' },
        about: c.facts.map(([k, v]) => ({ '@type': 'Thing', name: `${k}: ${v}` })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: L[lang].home, item: homeUrl(lang) },
          { '@type': 'ListItem', position: 2, name: L[lang].casesCrumb, item: homeUrl(lang) + '#casos' },
          { '@type': 'ListItem', position: 3, name: c.logoAlt, item: url },
        ],
      },
      ...(c.quote ? [videoNode(VIDEOS[c.video], lang)] : []),
    ],
  };
}

/** Metadatos de una ruta: title, description, canonical, imagen, idioma y JSON-LD. */
export function getMeta(path) {
  const { lang, caseKey } = parsePath(path);
  const alternates = Object.fromEntries(LANGS.map((l) => [l, SITE_URL + (pathIn(path, l) === '/' ? '/' : pathIn(path, l))]));
  if (!caseKey) {
    return { ...HOME[lang], image: '/assets/img/plataforma-enerflux.jpg', url: alternates[lang], lang, alternates, type: 'website', jsonLd: homeJsonLd(lang) };
  }
  const c = content(lang).CASE_PAGES[caseKey];
  return {
    title: CASE_TITLES[lang][caseKey],
    description: clip(c.lead),
    image: c.img,
    url: alternates[lang],
    lang,
    alternates,
    type: 'article',
    jsonLd: caseJsonLd(caseKey, lang),
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Etiquetas <head> para el prerender. */
export function headTags(path) {
  const m = getMeta(path);
  const img = abs(m.image);
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<link rel="canonical" href="${m.url}">`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${m.alternates[l]}">`),
    `<link rel="alternate" hreflang="x-default" href="${m.alternates.es}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta property="og:type" content="${m.type}">`,
    `<meta property="og:site_name" content="Capstone">`,
    `<meta property="og:locale" content="${OG_LOCALE[m.lang]}">`,
    ...LANGS.filter((l) => l !== m.lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`),
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:url" content="${m.url}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(m.title)}">`,
    `<meta name="twitter:description" content="${esc(m.description)}">`,
    `<meta name="twitter:image" content="${img}">`,
    `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n');
}
