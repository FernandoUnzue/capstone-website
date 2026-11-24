import { useState } from 'react';
import { s } from '../css.js';
import { content, useLang, useT } from '../i18n.js';
import { casePath } from '../seo.js';

const TEXT = {
  es: { filters: ['Todos', 'Energía', 'Fidelización', 'Software', 'Transformación'], kick: 'Portfolio', h2a: 'De Argentina ', h2b: 'al mundo.', filterAria: 'Filtrar casos', full: 'Ver caso completo →', fullAria: 'Ver caso completo: ' },
  en: { filters: ['All', 'Energy', 'Loyalty', 'Software', 'Transformation'], kick: 'Portfolio', h2a: 'From Argentina ', h2b: 'to the world.', filterAria: 'Filter case studies', full: 'Read the full case study →', fullAria: 'Read the full case study: ' },
};

export default function Cases() {
  const lang = useLang();
  const t = useT(TEXT);
  const { CASES } = content(lang);
  const all = t.filters[0];
  const [filter, setFilter] = useState(all);
  const list = CASES.filter((c) => filter === all || c.cat === filter);
  const k = list.length > 2 ? (3 - (list.length % 3)) % 3 : 0; // las primeras k tarjetas ocupan 2 columnas
  return (
    <>
      <section id="casos" style={s(`padding: 130px 0; background: #EEF2F4`)}>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 48px`)}>
      <div style={s(`display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 24px; max-width: 760px`)}>
      <div className="mono kick reveal" style={s(`color: #178F6B`)}>{t.kick}</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600`)}>{t.h2a}<span className="thin">{t.h2b}</span></h2>
      </div>
      <div role="group" aria-label={t.filterAria} className="reveal" style={s(`display: flex; gap: 6px; flex-wrap: wrap; background: #FFFFFF; padding: 6px; border-radius: 999px`)}>
      {t.filters.map((f) => (
        <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} style={s('font:500 14px Rubik,sans-serif;border:none;border-radius:999px;padding:10px 18px;min-height:44px;cursor:pointer;transition:background 220ms,color 220ms;' + (filter === f ? 'background:#081C15;color:#FFFFFF' : 'background:transparent;color:#081C15'))}>{f}</button>
      ))}
      </div>
      </div>
      <div className="cg" style={s(`display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-flow: dense; gap: 24px`)}>
      {list.map((c, i) => {
        const big = i < k;
        return (
          <article key={c.detail} className="lift tilt" style={s('background:#FFFFFF;border-radius:28px;overflow:hidden;display:flex;flex-direction:column;' + (big ? 'grid-column:span 2' : ''))}>
            <div style={s('position:relative;overflow:hidden;background:#0F2A20;height:' + (big ? '360px' : '240px'))}>
              <img loading="lazy" decoding="async" src={c.img} alt={c.client} style={s('width:100%;height:100%;display:block;' + (c.fit === 'contain' ? 'object-fit:contain;background:#FFFFFF;padding:16px 16px 56px' : 'object-fit:cover;object-position:' + (c.pos || 'center top')))} />
              <span className="mono" style={s('position: absolute; left: 18px; top: 18px; font-size: 10px; background: rgba(255,255,255,0.92); color: #081C15; padding: 7px 11px; border-radius: 999px')}>{c.geo}</span>
              <span style={s('position: absolute; left: 18px; bottom: 18px; background: #FFFFFF; border-radius: 0 14px 14px 14px; padding: 10px 14px; box-shadow: 0 8px 20px rgba(8,28,21,0.2)')}><img loading="lazy" decoding="async" src={c.logo} alt="" style={s('height: 28px; width: auto; display: block')} /></span>
              {c.video && <span className="mono" style={s('position: absolute; right: 18px; top: 18px; font-size: 10px; background: #33CC99; color: #081C15; padding: 7px 11px; border-radius: 999px')}>▶ Video</span>}
            </div>
            <div style={s('padding: 26px 28px 30px; display: flex; flex-direction: column; gap: 10px; flex: 1')}>
              <span className="mono" style={s('font-size: 10px; color: #178F6B')}>{c.kind}</span>
              <h3 className="disp" style={s('font-size: 30px; font-weight: 600')}>{c.client}</h3>
              <p style={s('margin: 0; font-size: 15px; color: #3D4847; line-height: 1.55')}>{c.text}</p>
              <a href={casePath(c.detail, lang)} aria-label={t.fullAria + c.client} style={s('margin-top: auto; padding: 10px 0 0; align-self: flex-start; color: #081C15; font: 500 14px Rubik, sans-serif; text-decoration: none')}>{t.full}</a>
            </div>
          </article>
        );
      })}
      </div>
      </div>
      </section>
    </>
  );
}
