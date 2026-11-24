import { useState } from 'react';
import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';
import { pathIn } from '../seo.js';

const TEXT = {
  es: {
    nav: [['Qué hacemos', 'que-hacemos'], ['Productos', 'productos'], ['Videos', 'videos'], ['Casos', 'casos'], ['Equipo', 'equipo'], ['Contacto', 'contacto']],
    main: 'Principal', mobile: 'Menú móvil', open: 'Abrir menú', close: 'Cerrar menú', lang: 'Idioma', cta: 'Hablemos',
    enerflux: 'Calidad de red, interrupciones y reportes regulatorios.', goSite: 'Ir al sitio ↗',
    fidelyflux: 'Gestioná la fidelización: tickets, puntos y premios en un solo lugar.', more: 'Conocer más →',
    other: 'English version',
  },
  en: {
    nav: [['What we do', 'que-hacemos'], ['Products', 'productos'], ['Videos', 'videos'], ['Case studies', 'casos'], ['Team', 'equipo'], ['Contact', 'contacto']],
    main: 'Main', mobile: 'Mobile menu', open: 'Open menu', close: 'Close menu', lang: 'Language', cta: 'Let’s talk',
    enerflux: 'Grid quality, outages and regulatory reporting.', goSite: 'Visit site ↗',
    fidelyflux: 'Manage loyalty: receipts, points and rewards in one place.', more: 'Learn more →',
    other: 'Versión en español',
  },
};
const BAR = 'display:block;width:20px;height:2px;border-radius:2px;background:#FFFFFF;transition:transform 300ms,opacity 300ms;';
const NL = s('text-decoration: none; color: #FFFFFF');

/** Selector de idioma: enlaza a la misma página en el otro idioma. */
export function LangSwitch({ path }) {
  const lang = useLang();
  const t = useT(TEXT);
  const other = lang === 'es' ? 'en' : 'es';
  return (
    <span className="lang-sw" role="group" aria-label={t.lang}>
      {['es', 'en'].map((l) =>
        l === lang ? (
          <span key={l} className="lang-on" aria-current="true">{l.toUpperCase()}</span>
        ) : (
          <a key={l} href={pathIn(path, other)} hrefLang={other} lang={other} title={t.other}>{l.toUpperCase()}</a>
        )
      )}
    </span>
  );
}

export default function Header({ path }) {
  const lang = useLang();
  const t = useT(TEXT);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const [whatWeDo, products, ...rest] = t.nav;
  return (
    <header className="hdr" style={s(`position: sticky; top: 0; z-index: 40; background: rgba(8,28,21,0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.08)`)}>
      <div className="wrap" style={s(`display: flex; align-items: center; justify-content: space-between; height: 76px; gap: 24px`)}>
        <a href={anchor(lang, 'top')} style={s(`display: flex; align-items: center`)}><img src="/assets/img/capstone.png" alt="Capstone" className="logo-h" style={s(`height: 32px; width: auto`)} /></a>
        <nav className="navlinks" aria-label={t.main} style={s(`font-size: 14px; height: 100%; gap: 26px`)}>
          <a href={anchor(lang, whatWeDo[1])} className="nl" style={NL}>{whatWeDo[0]}</a>
          <div className="has-mega" style={s(`position: relative; height: 100%; display: flex; align-items: center`)}>
            <a href={anchor(lang, products[1])} className="nl" style={s(`text-decoration: none; color: #FFFFFF; display: flex; align-items: center; gap: 6px`)}>{products[0]}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></a>
            <div className="mega" style={s(`width: 600px; background: #FFFFFF; border-radius: 22px; box-shadow: 0 30px 70px rgba(0,0,0,0.35); padding: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px`)}>
              <a href="https://www.enerflux.com.ar" style={s(`text-decoration: none; padding: 22px; border-radius: 14px; background: #FFF4E8; display: flex; flex-direction: column; gap: 12px; color: #081C15`)}><img src="/assets/img/enerflux.png" alt="Enerflux" style={s(`height: 26px; width: auto; align-self: flex-start`)} /><span style={s(`font-size: 14px; line-height: 1.45; color: #3D4847`)}>{t.enerflux}</span><span className="mono" style={s(`font-size: 11px; color: #8A4B00`)}>{t.goSite}</span></a>
              <a href={anchor(lang, 'fidelyflux')} style={s(`text-decoration: none; padding: 22px; border-radius: 14px; background: #FBF4E6; display: flex; flex-direction: column; gap: 12px; color: #081C15`)}><img src="/assets/img/fidelyflux.png" alt="FidelyFlux" style={s(`height: 30px; width: auto; align-self: flex-start`)} /><span style={s(`font-size: 14px; line-height: 1.45; color: #3D4847`)}>{t.fidelyflux}</span><span className="mono" style={s(`font-size: 11px; color: #8A5A10`)}>{t.more}</span></a>
            </div>
          </div>
          {rest.map(([label, id]) => <a key={id} href={anchor(lang, id)} className="nl" style={NL}>{label}</a>)}
        </nav>
        <div style={s(`display: flex; align-items: center; gap: 10px`)}>
          <LangSwitch path={path} />
          <a href={anchor(lang, 'contacto')} className="btn btn-g cta-h" style={s(`text-decoration: none; background: #33CC99; color: #081C15; font-weight: 600; font-size: 15px; padding: 12px 22px; border-radius: 999px`)}>{t.cta}</a>
          <button type="button" className="burger" onClick={() => setOpen(!open)} aria-label={open ? t.close : t.open} aria-expanded={open} aria-controls="menu-movil" style={s(`width: 48px; height: 48px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); cursor: pointer; align-items: center; justify-content: center; flex-direction: column; gap: 6px; padding: 0`)}>
            <span style={s(BAR + (open ? 'transform:translateY(8px) rotate(45deg)' : ''))}></span>
            <span style={s(BAR + (open ? 'opacity:0' : ''))}></span>
            <span style={s(BAR + (open ? 'transform:translateY(-8px) rotate(-45deg)' : ''))}></span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movil" className="mmenu" aria-label={t.mobile} style={s(`border-top: 1px solid rgba(255,255,255,0.08); padding: 12px 20px 28px; display: flex; flex-direction: column`)}>
          {t.nav.map(([label, id], i) => (
            <a key={id} href={anchor(lang, id)} onClick={close} className="mlink" style={s('display:flex;justify-content:space-between;align-items:center;padding:16px 4px;border-bottom:1px solid rgba(255,255,255,0.08);color:#FFFFFF;text-decoration:none;font-family:Hanken Grotesk,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;animation-delay:' + i * 45 + 'ms')}>
              <span>{label}</span><span className="mono" style={s(`font-size: 10px; color: #33CC99`)}>{'0' + (i + 1)}</span>
            </a>
          ))}
          <a href={anchor(lang, 'contacto')} onClick={close} className="btn btn-g" style={s(`margin-top: 20px; text-decoration: none; background: #33CC99; color: #081C15; font-weight: 600; font-size: 16px; padding: 16px; border-radius: 999px; text-align: center`)}>{t.cta}</a>
        </nav>
      )}
    </header>
  );
}
