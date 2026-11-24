import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';

const TEXT = {
  es: {
    what: "Qué hacemos",
    ai: "IA Aplicada",
    consult: "Consultoría & Transformación",
    products: "Productos",
    company: "Empresa",
    cases: "Casos de éxito",
    team: "Equipo",
    contact: "Contacto",
    rights: "© 2026 Capstone. Todos los derechos reservados.",
  },
  en: {
    what: "What we do",
    ai: "Applied AI",
    consult: "Consulting & Transformation",
    products: "Products",
    company: "Company",
    cases: "Case studies",
    team: "Team",
    contact: "Contact",
    rights: "© 2026 Capstone. All rights reserved.",
  },
};

export default function Footer() {
  const lang = useLang();
  const t = useT(TEXT);
  return (
    <>
      <footer style={s(`background: #04110C; color: #A7B3B1; padding: 90px 0 36px; overflow: hidden`)}>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 64px`)}>
      <div className="g4">
      <div style={s(`display: flex; flex-direction: column; gap: 16px`)}>
      <img loading="lazy" decoding="async" src="/assets/img/capstone.png" alt="Capstone" style={s(`height: 32px; width: auto; align-self: flex-start`)} />
      <span className="mono" style={s(`font-size: 11px; color: #33CC99`)}>Data on your side™</span>
      </div>
      <div style={s(`display: flex; flex-direction: column; gap: 12px; font-size: 15px`)}><span className="mono" style={s(`font-size: 10px; color: #FFFFFF`)}>{t.what}</span><a href={anchor(lang, 'que-hacemos')} style={s(`color: #A7B3B1; text-decoration: none`)}>Data &amp; Analytics</a><a href={anchor(lang, 'que-hacemos')} style={s(`color: #A7B3B1; text-decoration: none`)}>{t.ai}</a><a href={anchor(lang, 'que-hacemos')} style={s(`color: #A7B3B1; text-decoration: none`)}>Custom Development</a><a href={anchor(lang, 'que-hacemos')} style={s(`color: #A7B3B1; text-decoration: none`)}>{t.consult}</a></div>
      <div style={s(`display: flex; flex-direction: column; gap: 12px; font-size: 15px`)}><span className="mono" style={s(`font-size: 10px; color: #FFFFFF`)}>{t.products}</span><a href="https://www.enerflux.com.ar" style={s(`color: #A7B3B1; text-decoration: none`)}>Enerflux ↗</a><a href={anchor(lang, 'fidelyflux')} style={s(`color: #A7B3B1; text-decoration: none`)}>FidelyFlux</a></div>
      <div style={s(`display: flex; flex-direction: column; gap: 12px; font-size: 15px`)}><span className="mono" style={s(`font-size: 10px; color: #FFFFFF`)}>{t.company}</span><a href={anchor(lang, 'casos')} style={s(`color: #A7B3B1; text-decoration: none`)}>{t.cases}</a><a href={anchor(lang, 'videos')} style={s(`color: #A7B3B1; text-decoration: none`)}>Videos</a><a href={anchor(lang, 'equipo')} style={s(`color: #A7B3B1; text-decoration: none`)}>{t.team}</a><a href={anchor(lang, 'contacto')} style={s(`color: #A7B3B1; text-decoration: none`)}>{t.contact}</a></div>
      </div>
      <div style={s(`border-top: 1px solid rgba(255,255,255,0.1); padding-top: 26px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px`)}><span className="mono" style={s(`font-size: 10px`)}>{t.rights}</span><span className="mono" style={s(`font-size: 10px`)}><a href="https://ar.linkedin.com/company/capstoneside" target="_blank" rel="noopener" style={s(`color: inherit; text-decoration: none`)}>LinkedIn ↗</a> · YouTube</span></div>
      </div>
      </footer>
    </>
  );
}
