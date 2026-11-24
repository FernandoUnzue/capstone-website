import { s } from '../css.js';

export default function Footer() {
  return (
    <>
      <footer style={s(`background: #04110C; color: #A7B3B1; padding: 90px 0 36px; overflow: hidden`)}>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 64px`)}>
      <div className="g4">
      <div style={s(`display: flex; flex-direction: column; gap: 16px`)}>
      <img loading="lazy" decoding="async" src="/assets/img/capstone.png" alt="Capstone" style={s(`height: 32px; width: auto; align-self: flex-start`)} />
      <span className="mono" style={s(`font-size: 11px; color: #33CC99`)}>Data on your side™</span>
      </div>
      <div style={s(`display: flex; flex-direction: column; gap: 12px; font-size: 15px`)}><span className="mono" style={s(`font-size: 10px; color: #FFFFFF`)}>Qué hacemos</span><a href="/#que-hacemos" style={s(`color: #A7B3B1; text-decoration: none`)}>Data &amp; Analytics</a><a href="/#que-hacemos" style={s(`color: #A7B3B1; text-decoration: none`)}>IA Aplicada</a><a href="/#que-hacemos" style={s(`color: #A7B3B1; text-decoration: none`)}>Custom Development</a><a href="/#que-hacemos" style={s(`color: #A7B3B1; text-decoration: none`)}>Consultoría &amp; Transformación</a></div>
      <div style={s(`display: flex; flex-direction: column; gap: 12px; font-size: 15px`)}><span className="mono" style={s(`font-size: 10px; color: #FFFFFF`)}>Productos</span><a href="https://www.enerflux.com.ar" style={s(`color: #A7B3B1; text-decoration: none`)}>Enerflux ↗</a><a href="/#fidelyflux" style={s(`color: #A7B3B1; text-decoration: none`)}>FidelyFlux</a></div>
      <div style={s(`display: flex; flex-direction: column; gap: 12px; font-size: 15px`)}><span className="mono" style={s(`font-size: 10px; color: #FFFFFF`)}>Empresa</span><a href="/#casos" style={s(`color: #A7B3B1; text-decoration: none`)}>Casos de éxito</a><a href="/#videos" style={s(`color: #A7B3B1; text-decoration: none`)}>Videos</a><a href="/#equipo" style={s(`color: #A7B3B1; text-decoration: none`)}>Equipo</a><a href="/#contacto" style={s(`color: #A7B3B1; text-decoration: none`)}>Contacto</a></div>
      </div>
      <div style={s(`border-top: 1px solid rgba(255,255,255,0.1); padding-top: 26px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px`)}><span className="mono" style={s(`font-size: 10px`)}>© 2026 Capstone. Todos los derechos reservados.</span><span className="mono" style={s(`font-size: 10px`)}><a href="https://ar.linkedin.com/company/capstoneside" target="_blank" rel="noopener" style={s(`color: inherit; text-decoration: none`)}>LinkedIn ↗</a> · YouTube</span></div>
      </div>
      </footer>
    </>
  );
}
