import { s } from '../css.js';

// Mueve el foco de luz del hero siguiendo el cursor (variables CSS --mx/--my).
function heroMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', e.clientX - r.left + 'px');
  el.style.setProperty('--my', e.clientY - r.top + 'px');
}

export default function Hero() {
  return (
    <>
      <section id="top" onMouseMove={heroMove} style={s(`background: #081C15; color: #FFFFFF; position: relative; overflow: hidden; padding: 96px 0 0`)}>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="scan" aria-hidden="true"></div>
      <div className="spot" aria-hidden="true"></div>
      <svg aria-hidden="true" viewBox="0 0 1440 700" preserveAspectRatio="none" style={s(`position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none`)}>
      <path id="fl1" d="M-20 520 C 300 420, 520 640, 820 470 S 1260 300, 1480 380" fill="none" stroke="rgba(51,204,153,0.18)" strokeWidth="1.2"></path>
      <path id="fl2" d="M-20 600 C 360 560, 600 420, 900 540 S 1250 640, 1480 520" fill="none" stroke="rgba(51,204,153,0.12)" strokeWidth="1"></path>
      <circle r="3.5" fill="#33CC99"><animateMotion dur="7s" repeatCount="indefinite" rotate="auto"><mpath href="#fl1"></mpath></animateMotion></circle>
      <circle r="2.5" fill="#C9FFE9"><animateMotion dur="9s" begin="-3s" repeatCount="indefinite"><mpath href="#fl1"></mpath></animateMotion></circle>
      <circle r="3" fill="#33CC99"><animateMotion dur="11s" begin="-5s" repeatCount="indefinite"><mpath href="#fl2"></mpath></animateMotion></circle>
      <circle r="2" fill="#FFD08A"><animateMotion dur="8s" begin="-1s" repeatCount="indefinite"><mpath href="#fl2"></mpath></animateMotion></circle>
      </svg>
      <img className="iso-spin" src="/assets/img/img-478ab867.png" alt="" aria-hidden="true" style={s(`position: absolute; right: -220px; top: -160px; width: 760px; height: 760px; opacity: 0.06`)} />
      <div aria-hidden="true" style={s(`position: absolute; left: -120px; bottom: 140px; width: 240px; height: 240px; background: #33CC99; opacity: 0.12; border-radius: 0 100% 0 0`)}></div>
      <div className="wrap hero" style={s(`position: relative`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 30px; padding-bottom: 24px`)}>
      <div className="mono kick rise d1" style={s(`color: #33CC99`)}>Work smarter,&nbsp;<s className="strike" aria-label="not harder (tachado)">not harder</s></div>
      <h1 className="disp h-xl" style={s(`font-size: 96px; font-weight: 600; color: #FFFFFF`)}>
      <span className="clip d2">Datos que se</span>
      <span className="clip d3">convierten en</span>
      <span className="clip d4"><span className="words shine" style={s(`color: #33CC99`)}><span>decisiones.</span><span aria-hidden="true">eficiencia.</span><span aria-hidden="true">resultados.</span><span aria-hidden="true">decisiones.</span></span></span>
      </h1>
      <p className="rise d5" style={s(`margin: 0; font-size: 20px; line-height: 1.6; color: #C9D2D0; max-width: 560px`)}><strong style={s(`color: #FFFFFF; font-weight: 600`)}>Tus datos ya saben lo que viene. Nosotros los hacemos hablar.</strong><br />Desarrollamos e implementamos software, plataformas de datos e inteligencia artificial que transforman la información de tu organización.</p>
      <div className="rise d6" style={s(`display: flex; gap: 14px; flex-wrap: wrap; align-items: center`)}>
      <a href="/#casos" className="btn btn-g glow-b" style={s(`text-decoration: none; background: #33CC99; color: #081C15; font-weight: 600; padding: 18px 30px; border-radius: 999px; font-size: 16px`)}>Ver casos de éxito</a>
      <a href="/#videos" className="btn" style={s(`text-decoration: none; color: #FFFFFF; font-weight: 500; padding: 17px 24px; display: flex; align-items: center; gap: 12px`)}><span style={s(`width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center`)}><svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>Mirá los videos</a>
      </div>
      </div>
      {/* composición de dispositivos */}
      <div className="collage rise d4" style={s(`position: relative; height: 560px; perspective: 1600px`)}>
      <div aria-hidden="true" className="orbit" style={s(`position: absolute; left: 50%; top: 50%; width: 560px; height: 560px; margin: -280px 0 0 -280px; border-radius: 50%; border: 1px dashed rgba(51,204,153,0.25)`)}><span style={s(`position: absolute; top: -5px; left: 50%; width: 10px; height: 10px; border-radius: 50%; background: #33CC99; box-shadow: 0 0 18px #33CC99`)}></span></div>
      <div className="browser fl-a" style={s(`position: absolute; right: -10px; top: 40px; width: 560px; border-radius: 14px; overflow: hidden; background: #0B1F18; border: 1px solid rgba(255,255,255,0.14); box-shadow: 0 40px 90px rgba(0,0,0,0.55); transform: rotateY(-10deg) rotateX(4deg)`)}>
      <div style={s(`height: 34px; display: flex; align-items: center; gap: 7px; padding: 0 14px; background: #10261E; border-bottom: 1px solid rgba(255,255,255,0.08)`)}><span style={s(`width: 10px; height: 10px; border-radius: 50%; background: #FF5F57`)}></span><span style={s(`width: 10px; height: 10px; border-radius: 50%; background: #FEBC2E`)}></span><span style={s(`width: 10px; height: 10px; border-radius: 50%; background: #28C840`)}></span><span style={s(`margin-left: 14px; flex: 1; height: 20px; border-radius: 6px; background: rgba(255,255,255,0.06); color: #A7B3B1; font-size: 11px; display: flex; align-items: center; padding: 0 10px; font-family: Rubik, sans-serif`)}>enerflux.com.ar</span></div>
      <img src="/assets/img/plataforma-enerflux.jpg" alt="Plataforma Enerflux" style={s(`display: block; width: 100%; height: auto`)} />
      </div>
      <div className="phone fl-b" style={s(`position: absolute; left: 10px; top: 150px; width: 200px; height: 400px; border-radius: 36px; background: #050807; padding: 9px; box-shadow: 0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.12)`)}>
      <div style={s(`position: relative; width: 100%; height: 100%; border-radius: 28px; overflow: hidden`)}><img src="/assets/img/app-de-alohar.jpg" alt="App de Alohar" style={s(`width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block`)} /><span style={s(`position: absolute; top: 8px; left: 50%; width: 64px; height: 18px; margin-left: -32px; border-radius: 10px; background: #050807`)}></span></div>
      </div>
      </div>
      </div>
      {/* 3 caminos */}
      <div className="wrap" style={s(`position: relative; margin-top: 56px`)}>
      <div className="mono rise d6" style={s(`color: #7D8B88; font-size: 11px; padding-bottom: 14px`)}>¿Qué estás buscando?</div>
      <div className="g3 rise d6" style={s(`gap: 0; border-top: 1px solid rgba(255,255,255,0.14)`)}>
      <a href="/#que-hacemos" className="door" style={s(`text-decoration: none; color: #FFFFFF; padding: 28px 24px 34px 0; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; border-right: 1px solid rgba(255,255,255,0.14)`)}>
      <span style={s(`display: flex; flex-direction: column; gap: 8px`)}><span className="mono" style={s(`color: #33CC99; font-size: 11px`)}>Servicios</span><span style={s(`font-family: 'Hanken Grotesk', sans-serif; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2`)}>Resolver un desafío con tecnología a medida</span></span>
      <svg className="arr" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#33CC99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
      </a>
      <a href="/#enerflux" className="door" style={s(`text-decoration: none; color: #FFFFFF; padding: 28px 24px 34px 24px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; border-right: 1px solid rgba(255,255,255,0.14)`)}>
      <span style={s(`display: flex; flex-direction: column; gap: 8px`)}><span className="mono" style={s(`color: #FFB25C; font-size: 11px`)}>Enerflux</span><span style={s(`font-family: 'Hanken Grotesk', sans-serif; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2`)}>Convertir datos energéticos en decisiones</span></span>
      <svg className="arr" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFB25C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
      </a>
      <a href="/#fidelyflux" className="door" style={s(`text-decoration: none; color: #FFFFFF; padding: 28px 0 34px 24px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px`)}>
      <span style={s(`display: flex; flex-direction: column; gap: 8px`)}><span className="mono" style={s(`color: #E3B260; font-size: 11px`)}>FidelyFlux</span><span style={s(`font-family: 'Hanken Grotesk', sans-serif; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2`)}>Fidelizar clientes, asociados o vecinos</span></span>
      <svg className="arr" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E3B260" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
      </a>
      </div>
      </div>
      </section>
    </>
  );
}
