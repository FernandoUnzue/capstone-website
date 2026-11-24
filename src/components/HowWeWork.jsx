import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';

const TEXT = {
  es: {
    kick: "Cómo trabajamos",
    h2a: "Del diagnóstico al resultado, ",
    h2b: "juntos.",
    s1: "Relevamos",
    s1t: "Escuchamos al equipo y entendemos los datos y procesos actuales.",
    s2: "Diseñamos",
    s2t: "Definimos la solución, los indicadores de éxito y la hoja de ruta.",
    s3: "Desarrollamos",
    s3t: "Construimos en etapas, con entregas visibles y validación continua.",
    s4: "Acompañamos",
    s4t: "Soporte y mejora continua con la solución en marcha.",
  },
  en: {
    kick: "How we work",
    h2a: "From diagnosis to results, ",
    h2b: "together.",
    s1: "Discover",
    s1t: "We listen to your team and understand your current data and processes.",
    s2: "Design",
    s2t: "We define the solution, the success metrics and the roadmap.",
    s3: "Build",
    s3t: "We build in stages, with visible deliverables and continuous validation.",
    s4: "Support",
    s4t: "Ongoing support and continuous improvement once the solution is live.",
  },
};

export default function HowWeWork() {
  const lang = useLang();
  const t = useT(TEXT);
  return (
    <>
      <section className="vid-sec" style={s(`padding: 150px 0 140px; overflow: hidden`)}>
      <video className="vid-bg" src="/assets/video/hero-bg.mp4" poster="/assets/img/img-ab2dd987.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true"></video><div className="vid-ov" aria-hidden="true"></div>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 56px`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 24px`)}>
      <div className="mono kick reveal" style={s(`color: #178F6B`)}>{t.kick}</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600`)}>{t.h2a}<span className="thin">{t.h2b}</span></h2>
      </div>
      <div className="g4" style={s(`gap: 0`)}>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>01</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>{t.s1}</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>{t.s1t}</p></div>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>02</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>{t.s2}</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>{t.s2t}</p></div>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>03</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>{t.s3}</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>{t.s3t}</p></div>
      <div className="reveal step" style={s(`border-top: 2px solid #33CC99; display: flex; flex-direction: column; gap: 14px`)}><span className="disp num" style={s(`font-size: 64px; font-weight: 600; color: #C9D2D0`)}>04</span><h3 className="disp" style={s(`font-size: 28px; font-weight: 600`)}>{t.s4}</h3><p style={s(`margin: 0; color: #3D4847; line-height: 1.6`)}>{t.s4t}</p></div>
      </div>
      </div>
      </section>
    </>
  );
}
