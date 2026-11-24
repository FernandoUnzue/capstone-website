import { useEffect, useRef, useState } from 'react';
import { s } from '../css.js';
import { SERVICES } from '../data.js';

// Contadores animados. El HTML prerenderizado muestra el valor final (lo que leen los buscadores);
// en el navegador se reinician y cuentan al entrar en pantalla.
function Stats() {
  const ref = useRef(null);
  const [p, setP] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1800);
        setP(1 - Math.pow(1 - k, 3));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
      run();
      return () => cancelAnimationFrame(raf);
    }
    setP(0);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); run(); }
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  const n = (v) => Math.round(v * p);
  const big = s('font-size: 56px; font-weight: 700; color: #33CC99; font-variant-numeric: tabular-nums');
  const small = s('font-size: 14px; color: #586462; margin-top: 6px');
  return (
    <div className="reveal" ref={ref} style={s('display: flex; gap: 40px; padding-top: 10px')}>
      <div><div className="disp" style={big}>+{n(15)}</div><div style={small}>años de experiencia<br />internacional</div></div>
      <div><div className="disp" style={big}>{n(3)}</div><div style={small}>continentes con<br />proyectos</div></div>
      <div><div className="disp" style={big}>{n(24)}h</div><div style={small}>tiempo de<br />respuesta</div></div>
    </div>
  );
}

function ServiceList() {
  const [open, setOpen] = useState(0);
  return SERVICES.map((sv, i) => {
    const on = open === i;
    return (
      <div key={sv.num} role="listitem" className="row reveal" style={s('border-bottom: 1px solid #C9D2D0')}>
        <h3 style={s('margin: 0; font: inherit')}>
          <button type="button" className="svc-btn" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} aria-controls={'svc-' + sv.num} style={s('width: 100%; background: none; border: none; cursor: pointer; display: grid; grid-template-columns: 72px minmax(0, 1fr) 48px; align-items: center; gap: 16px; padding: 34px 8px; text-align: left; color: #081C15; font-family: Rubik, sans-serif')}>
            <span className="mono" style={s('color: #178F6B; font-size: 14px')}>{sv.num}</span>
            <span style={s('display: flex; flex-direction: column; gap: 6px')}><span className="disp svc-name" style={s('font-size: 40px; font-weight: 600')}>{sv.name}</span><span style={s('font-size: 15px; color: #586462')}>{sv.short}</span></span>
            <span style={s('width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform 300ms,background 300ms;' + (on ? 'background:#33CC99;color:#081C15;transform:rotate(45deg)' : 'background:#EEF2F4;color:#081C15'))}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg></span>
          </button>
        </h3>
        <div id={'svc-' + sv.num} hidden={!on} className="svc-body" style={s('padding: 0 8px 40px 96px; flex-direction: column; gap: 20px; animation: rise 500ms cubic-bezier(.2,.7,.2,1) both' + (on ? '; display: flex' : ''))}>
          <div className="svc-img"><img loading="lazy" decoding="async" src={sv.img} alt={sv.name}></img><span className="svc-tint" aria-hidden="true"></span><span className="svc-scan" aria-hidden="true"></span><span className="svc-iso" aria-hidden="true"></span><span className="svc-bar" aria-hidden="true"></span></div>
          <p style={s('margin: 0; font-size: 18px; line-height: 1.6; color: #3D4847; max-width: 620px')}>{sv.text}</p>
          <ul style={s('display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0')}>
            {sv.items.map((it) => <li key={it} className="mono" style={s('font-size: 11px; background: #ECFBF4; color: #136F54; border-radius: 999px; padding: 8px 14px')}>{it}</li>)}
          </ul>
          <a href="/#casos" style={s('font-weight: 500; font-size: 15px; align-self: flex-start')}>{sv.cta} →</a>
        </div>
      </div>
    );
  });
}

export default function Services() {
  return (
    <>
      <section id="que-hacemos" style={s(`padding: 140px 0 130px; position: relative`)}>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 64px`)}>
      <div className="svc-head" style={s(`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 72px; align-items: end`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 26px`)}>
      <div className="mono kick reveal" style={s(`color: #178F6B`)}>Qué hacemos</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600`)}>Hacemos que la tecnología sea <em>fácil.</em></h2>
      </div>
      <div style={s(`display: flex; flex-direction: column; gap: 28px`)}>
      <p className="reveal" style={s(`margin: 0; font-size: 18px; line-height: 1.65; color: #3D4847; max-width: 440px`)}>Combinamos datos, inteligencia artificial y desarrollo a medida para que veas lo que hoy está oculto en tu organización: riesgos, ahorros y nuevas fuentes de ingresos.</p>
      <Stats />
      </div>
      </div>
      <div role="list" style={s(`border-top: 1px solid #C9D2D0`)}>
      <ServiceList />
      </div>
      </div>
      </section>
    </>
  );
}
