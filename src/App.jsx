import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { s } from './css.js';
import { anchor, content, LangContext } from './i18n.js';
import { getMeta, parsePath, ROUTES } from './seo.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Clients from './components/Clients.jsx';
import Services from './components/Services.jsx';
import Products from './components/Products.jsx';
import Videos from './components/Videos.jsx';
import Cases from './components/Cases.jsx';
import Quote from './components/Quote.jsx';
import HowWeWork from './components/HowWeWork.jsx';
import Team from './components/Team.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CaseStudy from './components/CaseStudy.jsx';
import Lightbox from './components/Lightbox.jsx';

const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

function scrollToHash(hash) {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) el.scrollIntoView();
  else window.scrollTo(0, 0);
}

export default function App({ initialPath = '/' }) {
  const [path, setPath] = useState(norm(initialPath));
  const [lb, setLb] = useState(-1); // índice del video abierto en el lightbox
  const pendingHash = useRef(null);
  const { lang, caseKey } = parsePath(path);
  const { VIDEOS } = content(lang);

  const navigate = useCallback((href) => {
    const url = new URL(href, window.location.href);
    const next = norm(url.pathname);
    if (next === norm(window.location.pathname)) {
      history.pushState(null, '', url.pathname + url.hash);
      scrollToHash(url.hash);
      return;
    }
    history.pushState(null, '', url.pathname + url.hash);
    pendingHash.current = url.hash || '';
    setPath(next);
  }, []);

  // Navegación interna sin recargar: intercepta los enlaces a rutas del sitio.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !ROUTES.includes(norm(url.pathname))) return;
      if (norm(url.pathname) === norm(window.location.pathname)) return; // ancla en la misma página: lo resuelve el navegador
      e.preventDefault();
      navigate(url.pathname + url.hash);
    };
    const onPop = () => {
      pendingHash.current = window.location.hash;
      setPath(norm(window.location.pathname));
    };
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, [navigate]);

  // Tras cambiar de ruta: título/metadatos y posición de scroll.
  useEffect(() => {
    const m = getMeta(path);
    document.title = m.title;
    document.documentElement.lang = m.lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', m.url);
    if (pendingHash.current !== null) {
      const h = pendingHash.current;
      pendingHash.current = null;
      requestAnimationFrame(() => scrollToHash(h));
    }
  }, [path]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (lb >= 0) setLb(-1);
      else if (caseKey) navigate(anchor(lang, 'casos'));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lb, caseKey, lang, navigate]);

  return (
    <LangContext.Provider value={lang}>
    <div style={s('width: 100%; font-family: Rubik, system-ui, sans-serif; color: #081C15; background: #FFFFFF; overflow-x: clip')}>
      <div className="progress" aria-hidden="true"></div>
      {caseKey ? (
        <main>
          <CaseStudy key={path} caseKey={caseKey} path={path} openVideo={setLb} />
        </main>
      ) : (
        <Fragment key={lang}>
          <Header path={path} />
          <main>
            <Hero />
            <Clients />
            <Services />
            <Products openVideo={setLb} />
            <Videos openVideo={setLb} />
            <Cases />
            <Quote />
            <HowWeWork />
            <Team />
            <Contact />
          </main>
        </Fragment>
      )}
      {lb >= 0 && <Lightbox video={VIDEOS[lb]} onClose={() => setLb(-1)} />}
      <Footer />
    </div>
    </LangContext.Provider>
  );
}
