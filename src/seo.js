import { CASE_PAGES, CASES, SERVICES, VIDEOS } from './data.js';

// Dominio canónico. Se puede sobrescribir con la variable de entorno VITE_SITE_URL al compilar.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.capstoneside.com').replace(/\/$/, '');

export const ORG = {
  name: 'Capstone',
  legalName: 'Capstone',
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

// Ruta pública de cada caso de éxito.
export const CASE_SLUGS = {
  sanluis: 'provincia-de-san-luis',
  mia: 'mia-world',
  alohar: 'alohar',
  ced: 'centro-de-estudios-digestivos',
  fiorentina: 'acf-fiorentina',
  fabiani: 'fabiani-gioiellerie',
  celesi: 'gazeta-celesi',
};
export const casePath = (key) => `/casos/${CASE_SLUGS[key]}`;

// <title> de cada caso (≈60 caracteres, lo que muestran los buscadores).
const CASE_TITLES = {
  sanluis: 'San Luis: plataforma de calidad del servicio eléctrico | Capstone',
  mia: 'MIA World: app de cashback, beneficios y premios | Capstone',
  alohar: 'Alohar: plataforma de alquileres temporarios | Capstone',
  ced: 'Centro de Estudios Digestivos: conciliación con PAMI | Capstone',
  fiorentina: 'ACF Fiorentina: In Viola Card, fidelización en el fútbol | Capstone',
  fabiani: 'Fabiani Gioiellerie: app de fidelización iOS y Android | Capstone',
  celesi: 'Çelësi: reingeniería y cuenta única (SSO) | Capstone',
};
export const caseKeyFromPath = (path) => {
  const m = path.replace(/\/+$/, '').match(/^\/casos\/([\w-]+)$/);
  if (!m) return null;
  return Object.keys(CASE_SLUGS).find((k) => CASE_SLUGS[k] === m[1]) || null;
};
export const ROUTES = ['/', ...Object.keys(CASE_SLUGS).map(casePath)];

const abs = (p) => (p.startsWith('http') ? p : SITE_URL + p);
const clip = (s, n = 158) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…');

const HOME = {
  title: 'Capstone · Software, plataformas de datos e IA | Data on your side™',
  description:
    'Desarrollamos e implementamos software a medida, plataformas de datos e inteligencia artificial. Creadores de Enerflux (energía) y FidelyFlux (fidelización). Argentina y España.',
  image: '/assets/img/plataforma-enerflux.jpg',
};

const orgNode = () => ({
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
    '@type': 'PostalAddress',
    streetAddress: a.street,
    postalCode: a.postal,
    addressLocality: a.city,
    addressRegion: a.region,
    addressCountry: a.country,
  })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: ORG.email,
    telephone: ORG.phone,
    availableLanguage: ['es', 'en', 'it'],
  },
  founder: [
    { '@type': 'Person', name: 'Ignacio Noli', jobTitle: 'Co-Founder · Business Director' },
    { '@type': 'Person', name: 'Fernando Unzué', jobTitle: 'Co-Founder · Technology Director' },
    { '@type': 'Person', name: 'Mariano Faiella', jobTitle: 'Co-Founder · Digital Transformation' },
  ],
  knowsAbout: ['Data & Analytics', 'Inteligencia artificial', 'Desarrollo de software a medida', 'Transformación digital', 'Programas de fidelización', 'Calidad del servicio eléctrico'],
});

const videoNode = (v) => {
  const id = (v.url.match(/v=([\w-]+)/) || [])[1];
  return {
    '@type': 'VideoObject',
    name: v.title,
    description: v.quote,
    thumbnailUrl: abs(v.img),
    contentUrl: v.url,
    embedUrl: id ? `https://www.youtube.com/embed/${id}` : undefined,
    uploadDate: '2026-06-18',
    publisher: { '@id': SITE_URL + '/#org' },
  };
};

function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      { '@type': 'WebSite', '@id': SITE_URL + '/#web', url: SITE_URL + '/', name: 'Capstone', inLanguage: 'es', publisher: { '@id': SITE_URL + '/#org' } },
      {
        '@type': 'ItemList',
        name: 'Servicios de Capstone',
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'Service', name: s.name, description: s.text, provider: { '@id': SITE_URL + '/#org' } },
        })),
      },
      ...['Enerflux', 'FidelyFlux'].map((name) => ({
        '@type': 'SoftwareApplication',
        name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: name === 'Enerflux' ? 'https://www.enerflux.com.ar' : SITE_URL + '/#fidelyflux',
        description:
          name === 'Enerflux'
            ? 'Plataforma para empresas energéticas, cooperativas, reguladores e industrias: calidad de red, interrupciones y reportes regulatorios.'
            : 'Plataforma de fidelización: puntos, premios y beneficios para shoppings, comercios, entidades públicas, cooperativas y distribuidoras.',
        publisher: { '@id': SITE_URL + '/#org' },
      })),
      {
        '@type': 'ItemList',
        name: 'Casos de éxito',
        itemListElement: CASES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(casePath(c.detail)), name: c.client })),
      },
      ...VIDEOS.map(videoNode),
    ],
  };
}

function caseJsonLd(key) {
  const c = CASE_PAGES[key];
  const url = abs(casePath(key));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'Article',
        '@id': url + '#article',
        headline: `${c.titleA} ${c.titleB}`,
        description: c.lead,
        image: abs(c.img),
        inLanguage: 'es',
        url,
        author: { '@id': SITE_URL + '/#org' },
        publisher: { '@id': SITE_URL + '/#org' },
        about: c.facts.map(([k, v]) => ({ '@type': 'Thing', name: `${k}: ${v}` })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Casos', item: SITE_URL + '/#casos' },
          { '@type': 'ListItem', position: 3, name: c.logoAlt, item: url },
        ],
      },
      ...(c.quote ? [videoNode(VIDEOS[c.video])] : []),
    ],
  };
}

/** Metadatos de una ruta: title, description, canonical, imagen y JSON-LD. */
export function getMeta(path) {
  const key = caseKeyFromPath(path);
  if (!key) return { ...HOME, url: SITE_URL + '/', type: 'website', jsonLd: homeJsonLd() };
  const c = CASE_PAGES[key];
  return {
    title: CASE_TITLES[key],
    description: clip(c.lead),
    image: c.img,
    url: abs(casePath(key)),
    type: 'article',
    jsonLd: caseJsonLd(key),
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
    `<link rel="alternate" hreflang="es" href="${m.url}">`,
    `<link rel="alternate" hreflang="x-default" href="${m.url}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta property="og:type" content="${m.type}">`,
    `<meta property="og:site_name" content="Capstone">`,
    `<meta property="og:locale" content="es_AR">`,
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
