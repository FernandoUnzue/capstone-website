import { useState } from 'react';
import { s } from '../css.js';

const NAV = [['Qué hacemos', '/#que-hacemos'], ['Productos', '/#productos'], ['Videos', '/#videos'], ['Casos', '/#casos'], ['Equipo', '/#equipo'], ['Contacto', '/#contacto']];
const BAR = 'display:block;width:20px;height:2px;border-radius:2px;background:#FFFFFF;transition:transform 300ms,opacity 300ms;';

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <header className="hdr" style={s(`position: sticky; top: 0; z-index: 40; background: rgba(8,28,21,0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.08)`)}>
      <div className="wrap" style={s(`display: flex; align-items: center; justify-content: space-between; height: 76px; gap: 24px`)}>
      <a href="/#top" style={s(`display: flex; align-items: center`)}><img src="/assets/img/capstone.png" alt="Capstone" className="logo-h" style={s(`height: 32px; width: auto`)} /></a>
      <nav className="navlinks" aria-label="Principal" style={s(`font-size: 14px; height: 100%; gap: 26px`)}>
      <a href="/#que-hacemos" className="nl" style={s(`text-decoration: none; color: #FFFFFF`)}>Qué hacemos</a>
      <div className="has-mega" style={s(`position: relative; height: 100%; display: flex; align-items: center`)}>
      <a href="/#productos" className="nl" style={s(`text-decoration: none; color: #FFFFFF; display: flex; align-items: center; gap: 6px`)}>Productos<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></a>
      <div className="mega" style={s(`width: 600px; background: #FFFFFF; border-radius: 22px; box-shadow: 0 30px 70px rgba(0,0,0,0.35); padding: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px`)}>
      <a href="https://www.enerflux.com.ar" style={s(`text-decoration: none; padding: 22px; border-radius: 14px; background: #FFF4E8; display: flex; flex-direction: column; gap: 12px; color: #081C15`)}><img src="/assets/img/enerflux.png" alt="Enerflux" style={s(`height: 26px; width: auto; align-self: flex-start`)} /><span style={s(`font-size: 14px; line-height: 1.45; color: #3D4847`)}>Calidad de red, interrupciones y reportes regulatorios.</span><span className="mono" style={s(`font-size: 11px; color: #8A4B00`)}>Ir al sitio ↗</span></a>
      <a href="/#fidelyflux" style={s(`text-decoration: none; padding: 22px; border-radius: 14px; background: #FBF4E6; display: flex; flex-direction: column; gap: 12px; color: #081C15`)}><img src="/assets/img/fidelyflux.png" alt="FidelyFlux" style={s(`height: 30px; width: auto; align-self: flex-start`)} /><span style={s(`font-size: 14px; line-height: 1.45; color: #3D4847`)}>Gestioná la fidelización: tickets, puntos y premios en un solo lugar.</span><span className="mono" style={s(`font-size: 11px; color: #8A5A10`)}>Conocer más →</span></a>
      </div>
      </div>
      <a href="/#videos" className="nl" style={s(`text-decoration: none; color: #FFFFFF`)}>Videos</a>
      <a href="/#casos" className="nl" style={s(`text-decoration: none; color: #FFFFFF`)}>Casos</a>
      <a href="/#equipo" className="nl" style={s(`text-decoration: none; color: #FFFFFF`)}>Equipo</a>
      <a href="/#contacto" className="nl" style={s(`text-decoration: none; color: #FFFFFF`)}>Contacto</a>
      </nav>
      <div style={s(`display: flex; align-items: center; gap: 10px`)}>
      <span className="lang-sw" aria-label="Idioma"><span className="lang-on">ES</span><span lang="en" aria-disabled="true" title="English version coming soon" style={s(`opacity: 0.5; cursor: default`)}>EN</span></span>
      <a href="/#contacto" className="btn btn-g cta-h" style={s(`text-decoration: none; background: #33CC99; color: #081C15; font-weight: 600; font-size: 15px; padding: 12px 22px; border-radius: 999px`)}>Hablemos</a>
      <button type="button" className="burger" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="menu-movil" style={s(`width: 48px; height: 48px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); cursor: pointer; align-items: center; justify-content: center; flex-direction: column; gap: 6px; padding: 0`)}>
        <span style={s(BAR + (open ? 'transform:translateY(8px) rotate(45deg)' : ''))}></span>
        <span style={s(BAR + (open ? 'opacity:0' : ''))}></span>
        <span style={s(BAR + (open ? 'transform:translateY(-8px) rotate(-45deg)' : ''))}></span>
      </button>
      </div>
      </div>
      {open && (
        <nav id="menu-movil" className="mmenu" aria-label="Menú móvil" style={s(`border-top: 1px solid rgba(255,255,255,0.08); padding: 12px 20px 28px; display: flex; flex-direction: column`)}>
          {NAV.map(([label, href], i) => (
            <a key={href} href={href} onClick={close} className="mlink" style={s('display:flex;justify-content:space-between;align-items:center;padding:16px 4px;border-bottom:1px solid rgba(255,255,255,0.08);color:#FFFFFF;text-decoration:none;font-family:Hanken Grotesk,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;animation-delay:' + i * 45 + 'ms')}>
              <span>{label}</span><span className="mono" style={s(`font-size: 10px; color: #33CC99`)}>{'0' + (i + 1)}</span>
            </a>
          ))}
          <a href="/#contacto" onClick={close} className="btn btn-g" style={s(`margin-top: 20px; text-decoration: none; background: #33CC99; color: #081C15; font-weight: 600; font-size: 16px; padding: 16px; border-radius: 999px; text-align: center`)}>Hablemos</a>
        </nav>
      )}
      </header>
    </>
  );
}
