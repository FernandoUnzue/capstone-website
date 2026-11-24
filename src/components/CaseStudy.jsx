import { s } from '../css.js';
import { anchor, content, homePath, useLang, useT } from '../i18n.js';
import { LangSwitch } from './Header.jsx';

const TEXT = {
  es: { nav: 'Navegación del caso', back: '← Volver a casos', home: 'Ir al inicio de Capstone', challenge: 'El desafío', solution: 'La solución', result: 'El resultado', testimonial: '▶ Ver testimonio', talk: 'Hablemos' },
  en: { nav: 'Case study navigation', back: '← Back to case studies', home: 'Go to the Capstone home page', challenge: 'The challenge', solution: 'The solution', result: 'The result', testimonial: '▶ Watch testimonial', talk: 'Let’s talk' },
};

export default function CaseStudy({ caseKey, path, openVideo }) {
  const lang = useLang();
  const t = useT(TEXT);
  const c = content(lang).CASE_PAGES[caseKey];
  const ctaHref = c.ctaHref.startsWith('#') ? anchor(lang, c.ctaHref.slice(1)) : c.ctaHref;
  const external = c.ctaTarget === '_blank';
  return (
    <article className="cs cs-page" aria-label={c.aria}>
      <div className="cs-bar">
        <nav aria-label={t.nav} className="wrap" style={s('display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-top: 14px; padding-bottom: 14px')}>
          <a href={anchor(lang, 'casos')} style={s('color: #FFFFFF; text-decoration: none; font: 500 15px Rubik, sans-serif; padding: 10px 0; min-height: 44px; white-space: nowrap; display: flex; align-items: center')}>{t.back}</a>
          <span className="mono cs-lbl" style={s('font-size: 10px; color: #33CC99')}>{c.label}</span>
          <span style={s('display: flex; align-items: center; gap: 14px')}><LangSwitch path={path} /><a href={homePath(lang)} aria-label={t.home} style={s('display: flex; align-items: center')}><img src="/assets/img/capstone.png" alt="Capstone" style={s('height: 26px; width: auto')} /></a></span>
        </nav>
      </div>

      <header className={c.heroClass} style={s('color: #FFFFFF')}>
        <div className="wrap cs-hero" style={s('padding-top: 96px; padding-bottom: 72px; display: flex; flex-direction: column; gap: 28px')}>
          <div style={s('display: flex; gap: 10px; flex-wrap: wrap; align-items: center')}>
            <span style={s('background: #FFFFFF; border-radius: 0 12px 12px 12px; padding: 8px 12px; display: inline-flex')}><img src={c.logo} alt={c.logoAlt} style={s('height: 22px; width: auto; display: block')} /></span>
            <span className="mono" style={s('font-size: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; padding: 8px 12px')}>{c.place}</span>
          </div>
          <h1 className="disp cs-h1" style={s('margin: 0; font-size: 72px; font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; max-width: 1000px')}>{c.titleA} <span className="thin">{c.titleB}</span></h1>
          <p style={s('margin: 0; font-size: 20px; line-height: 1.6; color: #C9D2D0; max-width: 720px')}>{c.lead}</p>
          <dl className="g4" style={s('padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.15); margin: 0')}>
            {c.facts.map(([k, v]) => (
              <div key={k} style={s('display: flex; flex-direction: column; gap: 6px')}><dt className="mono" style={s('font-size: 10px; color: #33CC99')}>{k}</dt><dd style={s('margin: 0')}>{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <div className="wrap" style={s('padding-top: 72px')}>
        <figure style={s('margin: 0; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 80px rgba(8,28,21,0.18); background: #FFFFFF')}>
          <div aria-hidden="true" style={s('display: flex; gap: 7px; padding: 14px 18px; background: #E3E9E7')}><span style={s('width: 11px; height: 11px; border-radius: 50%; background: #FF6B5A')}></span><span style={s('width: 11px; height: 11px; border-radius: 50%; background: #FFB25C')}></span><span style={s('width: 11px; height: 11px; border-radius: 50%; background: #33CC99')}></span></div>
          <img src={c.img} alt={c.imgAlt} style={s(c.imgStyle || 'width:100%;height:auto;display:block')} />
        </figure>
      </div>

      <section className="wrap" style={s('padding-top: 110px; padding-bottom: 40px')}>
        <div className="cs-g">
          <div style={s('display: flex; flex-direction: column; gap: 18px')}><div className="mono kick" style={s('color: #178F6B')}>{t.challenge}</div><h2 className="disp" style={s('margin: 0; font-size: 44px; font-weight: 600; line-height: 1.08')}>{c.chTitle}</h2></div>
          <p style={s('margin: 0; font-size: 19px; line-height: 1.7; color: #3D4847; align-self: end')}>{c.ch}</p>
        </div>
      </section>

      <section className="wrap" style={s('padding-top: 70px; padding-bottom: 110px')}>
        <div className="cs-g">
          <div style={s('display: flex; flex-direction: column; gap: 18px; align-self: start; position: sticky; top: 110px')}><div className="mono kick" style={s('color: #178F6B')}>{t.solution}</div><h2 className="disp" style={s('margin: 0; font-size: 44px; font-weight: 600; line-height: 1.08')}>{c.soA} <span className="thin">{c.soB}</span></h2><p style={s('margin: 0; color: #3D4847; line-height: 1.65')}>{c.soLead}</p></div>
          <div style={s('border-top: 1px solid #D5DEDB')}>
            {c.feats.map(([t, d], i) => (
              <div key={t} className="cs-feat"><span className="cs-ico" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div style={s('display: flex; flex-direction: column; gap: 6px')}><h3 className="disp" style={s('margin: 0; font-size: 20px; font-weight: 600')}>{t}</h3><p style={s('margin: 0; color: #3D4847; line-height: 1.6; font-size: 15px')}>{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section style={s('background: #081C15; color: #FFFFFF')}>
        <div className="wrap" style={s('padding-top: 100px; padding-bottom: 100px; display: flex; flex-direction: column; gap: 56px')}>
          <div style={s('display: flex; flex-direction: column; gap: 18px')}><div className="mono kick" style={s('color: #33CC99')}>{t.result}</div><h2 className="disp" style={s('margin: 0; font-size: 44px; font-weight: 600; line-height: 1.08; max-width: 860px')}>{c.reTitle}</h2></div>
          <div className="g4 cs-stats">
            {c.stats.map(([n, t]) => (
              <div key={n + t} className="cs-stat"><span className="disp" style={s('font-size:' + (n.length > 5 ? '38px' : '56px') + ';font-weight:600;line-height:1;color:#FFFFFF')}>{n}</span><span style={s('color: #A7B3B1; font-size: 14px; line-height: 1.5')}>{t}</span></div>
            ))}
          </div>
          {c.quote && (
            <figure className="cs-fig" style={s('margin: 0; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 40px; align-items: end; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.12)')}>
              <blockquote className="disp" style={s('margin:0;font-size:34px;font-weight:500;line-height:1.3')}>{c.quote}<figcaption style={s('margin-top: 20px; font: 400 15px Rubik, sans-serif; color: #A7B3B1')}><strong style={s('color: #FFFFFF; font-weight: 500')}>{c.who}</strong> · {c.role}</figcaption></blockquote>
              <button type="button" onClick={() => openVideo(c.video)} className="btn btn-g" style={s('background: #33CC99; color: #081C15; border: none; border-radius: 999px; padding: 16px 26px; font: 600 15px Rubik, sans-serif; cursor: pointer; white-space: nowrap')}>{t.testimonial}</button>
            </figure>
          )}
        </div>
      </section>

      <section className="wrap" style={s('padding-top: 90px; padding-bottom: 90px; display: flex; justify-content: space-between; align-items: center; gap: 32px; flex-wrap: wrap')}>
        <div style={s('display: flex; flex-direction: column; gap: 12px; max-width: 640px')}>
          <h2 className="disp" style={s('margin: 0; font-size: 40px; font-weight: 600; line-height: 1.1')}>{c.ctaTitle}</h2>
          {c.source && <a href={c.source} target="_blank" rel="noopener" className="mono" style={s('font-size: 11px; color: #178F6B; text-decoration: none')}>{c.sourceLabel}</a>}
        </div>
        <div style={s('display: flex; gap: 12px; flex-wrap: wrap')}>
          <a href={ctaHref} {...(external ? { target: '_blank', rel: 'noopener' } : {})} className="btn" style={s('text-decoration: none; border: 1px solid #081C15; color: #081C15; padding: 16px 24px; border-radius: 999px; font-weight: 500')}>{c.ctaLabel}</a>
          <a href={anchor(lang, 'contacto')} className="btn btn-g" style={s('text-decoration: none; background: #33CC99; color: #081C15; padding: 16px 26px; border-radius: 999px; font-weight: 600')}>{t.talk}</a>
        </div>
      </section>
    </article>
  );
}
