import { s } from '../css.js';

export default function HowWeWork() {
  return (
    <>
      <section className="vid-sec" style={s(`padding: 150px 0 140px; overflow: hidden`)}>
      <video className="vid-bg" src="/assets/video/hero-bg.mp4" poster="/assets/img/img-ab2dd987.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true"></video><div className="vid-ov" aria-hidden="true"></div>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 56px`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 24px`)}>
      <div className="mono kick reveal" style={s(`color: #178F6B`)}>Cómo trabajamos</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600`)}>Del diagnóstico al resultado, <span className="thin">juntos.</span></h2>
      </div>
      <div className="g4" style={s(`gap: 0`)}>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>01</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>Relevamos</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>Escuchamos al equipo y entendemos los datos y procesos actuales.</p></div>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>02</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>Diseñamos</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>Definimos la solución, los indicadores de éxito y la hoja de ruta.</p></div>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>03</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>Desarrollamos</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>Construimos en etapas, con entregas visibles y validación continua.</p></div>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>04</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>Acompañamos</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>Soporte y mejora continua con la solución en marcha.</p></div>
      </div>
      </div>
      </section>
    </>
  );
}
