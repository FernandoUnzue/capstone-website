import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';

const TEXT = {
  es: {
    kick: "Productos Capstone",
    h2a: "Lo aprendido en cada proyecto, ",
    h2b: "convertido en plataforma.",
    lead: "Productos listos para implementar, con el equipo Capstone detrás de cada implementación.",
    efTag: "01 · Energía · Industria · Regulación",
    efTitle: "Más eficiencia en el monitoreo, control y gestión de recursos energéticos.",
    efText: "Un producto pensado para empresas energéticas, cooperativas, reguladores e industrias. Unifica datos de medición, calidad y operación en una sola plataforma para detectar desvíos a tiempo, optimizar recursos y automatizar reportes y procesos.",
    efGo: "Ir a enerflux.com.ar ↗",
    demo1: "Solicitar demo",
    ffImg: "Panel y app de FidelyFlux",
    ffTitleA: "Gestioná la fidelización ",
    ffTitleB: "en un solo lugar.",
    ffText: "Una plataforma para que tus clientes, asociados o vecinos vuelvan una y otra vez. Puntos, premios y beneficios en un solo lugar, con datos en tiempo real para conocerlos mejor. Pensada para shoppings, comercios, entidades públicas, cooperativas y distribuidoras.",
    demo2: "Solicitar demo",
    ffCases: "Ver casos de fidelización",
    pcKick: "Casos con nuestros productos",
    pcA: "Productos que ya están ",
    pcB: "funcionando.",
    slImg: "Plataforma de datos de San Luis",
    slTag: "Enerflux · Provincia de San Luis",
    slTitle: "Plataforma de datos para el sector energético y productivo",
    slText: "Junto al ente regulador provincial, integramos datos de calidad de servicio y operación para fiscalizar, anticipar desvíos y automatizar reportes. Proyecto en dos etapas.",
    slVideo: "▶ Ver el testimonio en video",
    full1: "Ver caso completo →",
    ffOrigin: "FidelyFlux · Programas que le dieron origen",
    miaImg: "Sitio web de MIA World",
    miaTag: "Fintech · Italia",
    miaText: "Cashback y beneficios con red de comercios adheridos.",
    full2: "Ver caso completo →",
    fioImg: "App Viola de ACF Fiorentina",
    fioTag: "Deporte · Italia",
    fioText: "Co-marketing de fidelización en el fútbol, con app para comercios.",
    full3: "Ver caso completo →",
    fabImg: "App Fabiani",
    fabTag: "Retail de lujo · Italia",
    fabText: "Puntos, tarjeta digital y promociones personalizadas.",
    full4: "Ver caso completo →",
  },
  en: {
    kick: "Capstone products",
    h2a: "What we learned on every project, ",
    h2b: "turned into a platform.",
    lead: "Ready-to-deploy products, with the Capstone team behind every implementation.",
    efTag: "01 · Energy · Industry · Regulation",
    efTitle: "Greater efficiency in monitoring, controlling and managing energy resources.",
    efText: "A product built for energy companies, cooperatives, regulators and industry. It brings metering, quality and operations data together in a single platform to catch deviations early, optimize resources and automate reports and processes.",
    efGo: "Go to enerflux.com.ar ↗",
    demo1: "Request a demo",
    ffImg: "FidelyFlux dashboard and app",
    ffTitleA: "Manage loyalty ",
    ffTitleB: "in one place.",
    ffText: "A platform that keeps your customers, members or residents coming back again and again. Points, rewards and benefits in one place, with real-time data to get to know them better. Built for shopping malls, retailers, public bodies, cooperatives and utilities.",
    demo2: "Request a demo",
    ffCases: "See loyalty case studies",
    pcKick: "Case studies with our products",
    pcA: "Products already ",
    pcB: "up and running.",
    slImg: "San Luis data platform",
    slTag: "Enerflux · Province of San Luis",
    slTitle: "Data platform for the energy and productive sectors",
    slText: "Together with the provincial regulator, we integrate service-quality and operations data to oversee, anticipate deviations and automate reporting. A two-stage project.",
    slVideo: "▶ Watch the video testimonial",
    full1: "Read the full case study →",
    ffOrigin: "FidelyFlux · The programs behind it",
    miaImg: "MIA World website",
    miaTag: "Fintech · Italy",
    miaText: "Cashback and benefits with a network of partner merchants.",
    full2: "Read the full case study →",
    fioImg: "ACF Fiorentina Viola app",
    fioTag: "Sports · Italy",
    fioText: "Loyalty co-marketing in football, with an app for merchants.",
    full3: "Read the full case study →",
    fabImg: "Fabiani app",
    fabTag: "Luxury retail · Italy",
    fabText: "Points, a digital card and personalized promotions.",
    full4: "Read the full case study →",
  },
};
import { casePath } from '../seo.js';

export default function Products({ openVideo }) {
  const lang = useLang();
  const t = useT(TEXT);
  return (
    <>
      <section id="productos" style={s(`background: #081C15; color: #FFFFFF; padding: 120px 0 0; position: relative; overflow: hidden`)}>
      <div className="wrap" style={s(`display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; padding-bottom: 64px`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 24px; max-width: 760px`)}>
      <div className="mono kick reveal" style={s(`color: #33CC99`)}>{t.kick}</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600; color: #FFFFFF`)}>{t.h2a}<span className="thin">{t.h2b}</span></h2>
      </div>
      <p className="reveal" style={s(`margin: 0; max-width: 360px; color: #A7B3B1; line-height: 1.65`)}>{t.lead}</p>
      </div>
      <div className="prod">
      <article id="enerflux" className="bg-enerflux panel-prod" style={s(`min-height: 680px; padding: 56px; display: flex; flex-direction: column; justify-content: flex-end; gap: 22px; position: relative`)}>
      <span className="mono" style={s(`position: absolute; top: 40px; left: 56px; font-size: 11px; color: #FFD8AE`)}>{t.efTag}</span>
      <div className="logo-box" style={s(`background: #FFFFFF; border-radius: 0 28px 28px 28px; padding: 18px 24px; align-self: flex-start`)}><img loading="lazy" decoding="async" src="/assets/img/enerflux.png" alt="Enerflux" style={s(`height: 44px; width: auto; display: block`)} /></div>
      <h3 className="disp" style={s(`font-size: 40px; font-weight: 600; color: #FFFFFF; max-width: 540px`)}>{t.efTitle}</h3>
      <p style={s(`margin: 0; color: #E2E8E7; max-width: 500px; line-height: 1.6`)}>{t.efText}</p>
      <div style={s(`display: flex; gap: 12px; flex-wrap: wrap`)}>
      <a href="https://www.enerflux.com.ar" className="btn" style={s(`text-decoration: none; background: #FF8C00; color: #081C15; font-weight: 600; padding: 16px 26px; border-radius: 999px`)}>{t.efGo}</a>
      <a href={anchor(lang, 'contacto')} className="btn" style={s(`text-decoration: none; border: 1px solid rgba(255,255,255,0.5); color: #FFFFFF; padding: 15px 24px; border-radius: 999px; font-weight: 500`)}>{t.demo1}</a>
      </div>
      </article>
      <article id="fidelyflux" className="panel-prod" style={s(`min-height: 680px; background: #FBF5EA; color: #1A140C; display: flex; flex-direction: column; position: relative; overflow: hidden`)}>
      <div aria-hidden="true" style={s(`position: absolute; right: -140px; top: -140px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(226,166,58,0.35), rgba(226,166,58,0) 70%)`)}></div>
      <span className="mono" style={s(`position: absolute; top: 40px; left: 56px; font-size: 11px; color: #8A5A10; z-index: 1`)}>02 · Loyalty · Rewards</span>
      <div style={s(`position: relative; height: 330px; margin-top: 70px; padding: 0 40px; display: flex; justify-content: center; align-items: flex-end`)}><img loading="lazy" decoding="async" src="/assets/img/panel-y-app-de-fidelyflux.jpg" alt={t.ffImg} style={s(`max-height: 100%; max-width: 100%; width: auto; display: block; mix-blend-mode: multiply`)} /></div>
      <div style={s(`padding: 32px 56px 56px; display: flex; flex-direction: column; gap: 20px; position: relative`)}>
      <div className="logo-box" style={s(`align-self: flex-start`)}><img loading="lazy" decoding="async" src="/assets/img/fidelyflux.png" alt="FidelyFlux · Loyalty · Rewards" style={s(`height: 52px; width: auto; display: block`)} /></div>
      <h3 className="disp" style={s(`font-size: 40px; font-weight: 600; color: #1A140C; max-width: 540px`)}>{t.ffTitleA}<span style={s(`color: #B87C18`)}>{t.ffTitleB}</span></h3>
      <p style={s(`margin: 0; color: #5A4A35; max-width: 500px; line-height: 1.6`)}>{t.ffText}</p>
      <div style={s(`display: flex; gap: 12px; flex-wrap: wrap`)}>
      <a href={anchor(lang, 'contacto')} className="btn" style={s(`text-decoration: none; background: linear-gradient(135deg, #E8A93A, #C47F12); color: #1A140C; font-weight: 600; padding: 16px 26px; border-radius: 999px`)}>{t.demo2}</a>
      <a href={anchor(lang, 'casos')} className="btn" style={s(`text-decoration: none; border: 1px solid #1A140C; color: #1A140C; padding: 15px 24px; border-radius: 999px; font-weight: 500`)}>{t.ffCases}</a>
      </div>
      </div>
      </article>
      </div>
      <div className="wrap" style={s(`padding-top: 96px; padding-bottom: 120px; display: flex; flex-direction: column; gap: 40px`)}>
      <div style={s(`display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 20px`)}><div className="mono kick reveal" style={s(`color: #33CC99`)}>{t.pcKick}</div><h3 className="disp reveal" style={s(`font-size: 44px; font-weight: 600; color: #FFFFFF`)}>{t.pcA}<span className="thin">{t.pcB}</span></h3></div>
      </div>
      <div className="g2" style={s(`gap: 24px; align-items: stretch`)}>
      <article className="lift reveal" style={s(`background: #0F2A20; border: 1px solid rgba(255,255,255,0.1); border-radius: 0 40px 40px 40px; overflow: hidden; display: flex; flex-direction: column`)}>
      <div style={s(`height: 260px; overflow: hidden; position: relative`)}><img loading="lazy" decoding="async" src="/assets/img/plataforma-de-datos-de-san-luis.jpg" alt={t.slImg} style={s(`width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block`)} /><span style={s(`position: absolute; left: 18px; bottom: 18px; background: #FFFFFF; border-radius: 0 12px 12px 12px; padding: 8px 12px`)}><img loading="lazy" decoding="async" src="/assets/img/enerflux.png" alt="Enerflux" style={s(`height: 22px; width: auto; display: block`)} /></span></div>
      <div style={s(`padding: 28px 30px 32px; display: flex; flex-direction: column; gap: 12px; flex: 1`)}>
      <span className="mono" style={s(`font-size: 10px; color: #FFB25C`)}>{t.slTag}</span>
      <h4 className="disp" style={s(`margin: 0; font-size: 28px; font-weight: 600; color: #FFFFFF`)}>{t.slTitle}</h4>
      <p style={s(`margin: 0; color: #A7B3B1; line-height: 1.6; font-size: 15px`)}>{t.slText}</p>
      <button type="button" onClick={() => openVideo(0)} style={s(`margin-top: auto; padding: 8px 0 0; align-self: flex-start; background: none; border: none; cursor: pointer; color: #33CC99; font: 500 15px Rubik, sans-serif; margin-bottom: 4px`)}>{t.slVideo}</button>
      <a href={casePath('sanluis', lang)} style={s(`text-decoration: none; padding: 0; align-self: flex-start; background: none; border: none; cursor: pointer; color: #FFFFFF; font: 500 15px Rubik, sans-serif`)}>{t.full1}</a>
      </div>
      </article>
      <div style={s(`display: flex; flex-direction: column; gap: 16px`)}>
      <div className="mono" style={s(`font-size: 10px; color: #E3B260; padding-bottom: 4px`)}>{t.ffOrigin}</div>
      <article className="lift reveal" style={s(`background: #0F2A20; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; display: grid; grid-template-columns: 150px minmax(0, 1fr); flex: 1`)}><div style={s(`background: #FFFFFF`)}><img loading="lazy" decoding="async" src="/assets/img/sitio-web-de-mia-world.jpg" alt={t.miaImg} style={s(`width: 100%; height: 100%; object-fit: cover; object-position: 16% center; display: block`)} /></div><div style={s(`padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; justify-content: center`)}><span className="mono" style={s(`font-size: 10px; color: #E3B260`)}>{t.miaTag}</span><h4 className="disp" style={s(`margin: 0; font-size: 20px; font-weight: 600; color: #FFFFFF`)}>MIA World</h4><p style={s(`margin: 0; color: #A7B3B1; font-size: 14px; line-height: 1.5`)}>{t.miaText}</p><a href={casePath('mia', lang)} style={s(`text-decoration: none; padding: 4px 0 0; align-self: flex-start; background: none; border: none; cursor: pointer; color: #E3B260; font: 500 14px Rubik, sans-serif`)}>{t.full2}</a></div></article>
      <article className="lift reveal" style={s(`background: #0F2A20; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; display: grid; grid-template-columns: 150px minmax(0, 1fr); flex: 1`)}><div style={s(`background: #FFFFFF`)}><img loading="lazy" decoding="async" src="/assets/img/app-viola-de-acf-fiorentina.jpg" alt={t.fioImg} style={s(`width: 100%; height: 100%; object-fit: cover; object-position: left top; display: block`)} /></div><div style={s(`padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; justify-content: center`)}><span className="mono" style={s(`font-size: 10px; color: #E3B260`)}>{t.fioTag}</span><h4 className="disp" style={s(`margin: 0; font-size: 20px; font-weight: 600; color: #FFFFFF`)}>ACF Fiorentina · In Viola Card</h4><p style={s(`margin: 0; color: #A7B3B1; font-size: 14px; line-height: 1.5`)}>{t.fioText}</p><a href={casePath('fiorentina', lang)} style={s(`text-decoration: none; padding: 4px 0 0; align-self: flex-start; background: none; border: none; cursor: pointer; color: #E3B260; font: 500 14px Rubik, sans-serif`)}>{t.full3}</a></div></article>
      <article className="lift reveal" style={s(`background: #0F2A20; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; display: grid; grid-template-columns: 150px minmax(0, 1fr); flex: 1`)}><div style={s(`background: #FFFFFF`)}><img loading="lazy" decoding="async" src="/assets/img/app-fabiani.jpg" alt={t.fabImg} style={s(`width: 100%; height: 100%; object-fit: cover; object-position: 20% top; display: block`)} /></div><div style={s(`padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; justify-content: center`)}><span className="mono" style={s(`font-size: 10px; color: #E3B260`)}>{t.fabTag}</span><h4 className="disp" style={s(`margin: 0; font-size: 20px; font-weight: 600; color: #FFFFFF`)}>Fabiani Gioiellerie</h4><p style={s(`margin: 0; color: #A7B3B1; font-size: 14px; line-height: 1.5`)}>{t.fabText}</p><a href={casePath('fabiani', lang)} style={s(`text-decoration: none; padding: 4px 0 0; align-self: flex-start; background: none; border: none; cursor: pointer; color: #E3B260; font: 500 14px Rubik, sans-serif`)}>{t.full4}</a></div></article>
      </div>
      </div>
      </div>
      </section>
    </>
  );
}
