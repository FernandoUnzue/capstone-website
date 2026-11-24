import { createContext, useContext } from 'react';
import * as es from './data.js';
import * as en from './data.en.js';

export const LANGS = ['es', 'en'];
export const DEFAULT_LANG = 'es';

const CONTENT = { es, en };
/** Contenido (servicios, casos, videos) del idioma. */
export const content = (lang) => CONTENT[lang] || CONTENT.es;

export const LangContext = createContext(DEFAULT_LANG);
export const useLang = () => useContext(LangContext);

/** Devuelve la variante del idioma actual de un diccionario { es: …, en: … }. */
export function useT(dict) {
  const lang = useLang();
  return dict[lang] || dict.es;
}

/** Inicio de cada idioma: "/" o "/en". */
export const homePath = (lang) => (lang === 'en' ? '/en' : '/');
/** Ancla a una sección de la home del idioma: "/#casos" o "/en#casos". */
export const anchor = (lang, id) => `${lang === 'en' ? '/en' : ''}/#${id}`.replace('/en/#', '/en#');

export const HTML_LANG = { es: 'es', en: 'en' };
export const OG_LOCALE = { es: 'es_AR', en: 'en_US' };
