import { useState } from 'react';
import { s } from '../css.js';
import { content, useLang, useT } from '../i18n.js';

const TEXT = {
  es: { kick: 'Casos en video', h2a: 'Que lo cuenten ', h2b: 'nuestros clientes.', lead: 'Testimonios y recorridos de cada proyecto, en la voz de quienes lo usan todos los días.', play: 'Reproducir video: ', more: 'Más videos' },
  en: { kick: 'Video case studies', h2a: 'Hear it from ', h2b: 'our clients.', lead: 'Testimonials and walkthroughs of each project, in the words of the people who use it every day.', play: 'Play video: ', more: 'More videos' },
};

function VideoPlayer({ openVideo }) {
  const t = useT(TEXT);
  const { VIDEOS } = content(useLang());
  const [sel, setSel] = useState(0);
  const cur = VIDEOS[sel];
  const many = VIDEOS.length > 1;
  return (
    <div className="video" style={s(many ? '' : 'grid-template-columns:minmax(0,1fr);max-width:1000px')}>
      <div className="grow" style={s('display: flex; flex-direction: column; gap: 24px')}>
        <div style={s('position: relative; aspect-ratio: 16 / 9; border-radius: 32px; overflow: hidden; background-color: #0F2A20; display: flex; align-items: center; justify-content: center')}>
          {cur.img && <img loading="lazy" decoding="async" src={cur.img} alt={cur.title} style={s('position: absolute; inset: -8px; width: calc(100% + 16px); height: calc(100% + 16px); object-fit: cover; filter: blur(1.5px) saturate(1.05)')} />}
          <div style={s('position: absolute; inset: 0; background: rgba(4,17,12,0.45)')}></div>
          <button type="button" onClick={() => openVideo(sel)} aria-label={t.play + cur.title} style={s('position: relative; width: 104px; height: 104px; border-radius: 50%; border: none; background: #33CC99; cursor: pointer; display: flex; align-items: center; justify-content: center')}>
            <span className="pulse" aria-hidden="true"></span>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#081C15" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>
          </button>
          <span className="mono" style={s('position: absolute; left: 28px; top: 26px; font-size: 11px; background: rgba(4,17,12,0.7); padding: 8px 12px; border-radius: 999px')}>{cur.client}</span>
          <span className="mono" style={s('position: absolute; right: 28px; bottom: 24px; font-size: 11px; background: rgba(4,17,12,0.7); padding: 8px 12px; border-radius: 999px')}>{cur.dur}</span>
        </div>
        <div style={s('display: flex; flex-direction: column; gap: 12px; max-width: 720px')}>
          <h3 className="disp" style={s('font-size: 34px; font-weight: 600; color: #FFFFFF; line-height: 1.1')}>{cur.title}</h3>
          <p style={s('margin: 0; color: #A7B3B1; font-size: 17px; line-height: 1.6; font-style: italic')}>“{cur.quote}” <span style={s('font-style: normal; color: #7D8B88')}>— {cur.who}</span></p>
        </div>
      </div>
      {many && (
        <div style={s('display: flex; flex-direction: column; gap: 6px')}>
          <span className="mono" style={s('font-size: 11px; color: #7D8B88; padding-bottom: 10px')}>{t.more}</span>
          {VIDEOS.map((v, i) => (
            <button key={v.url} type="button" onClick={() => setSel(i)} aria-pressed={sel === i} style={s('display:flex;gap:16px;align-items:center;padding:12px;border-radius:18px;cursor:pointer;font-family:Rubik,sans-serif;width:100%;transition:background 250ms,border-color 250ms;' + (sel === i ? 'background:rgba(51,204,153,0.12);border:1px solid rgba(51,204,153,0.6)' : 'background:transparent;border:1px solid rgba(255,255,255,0.08)'))}>
              <span style={s('position: relative; width: 132px; height: 84px; border-radius: 12px; overflow: hidden; flex: none; background: #0F2A20; display: block')}>
                {v.img && <img loading="lazy" decoding="async" src={v.img} alt="" style={s('width: 100%; height: 100%; object-fit: cover; display: block')} />}
                <span style={s('position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(4,17,12,0.35)')}><svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>
              </span>
              <span style={s('display: flex; flex-direction: column; gap: 6px; text-align: left')}>
                <span className="mono" style={s('font-size: 10px; color: #33CC99')}>{v.client} · {v.dur}</span>
                <span style={s('font-size: 16px; font-weight: 500; line-height: 1.3; color: #FFFFFF')}>{v.title}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Videos({ openVideo }) {
  const t = useT(TEXT);
  return (
    <>
      <section id="videos" style={s(`background: #04110C; color: #FFFFFF; padding: 130px 0`)}>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 56px`)}>
      <div style={s(`display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 24px; max-width: 760px`)}>
      <div className="mono kick reveal" style={s(`color: #33CC99`)}>{t.kick}</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600; color: #FFFFFF`)}>{t.h2a}<em>{t.h2b}</em></h2>
      </div>
      <p className="reveal" style={s(`margin: 0; max-width: 360px; color: #A7B3B1; line-height: 1.65`)}>{t.lead}</p>
      </div>
      <VideoPlayer openVideo={openVideo} />
      </div>
      </section>
    </>
  );
}
