import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';

const TEXT = {
  es: {
    a: "Encontramos las ",
    b: "oportunidades ocultas",
    c: " que hacen que tu negocio funcione aún mejor.",
  },
  en: {
    a: "We find the ",
    b: "hidden opportunities",
    c: " that make your business run even better.",
  },
};

export default function Quote() {
  const lang = useLang();
  const t = useT(TEXT);
  return (
    <>
      <section style={s(`background: #081C15; color: #FFFFFF; padding: 150px 0; position: relative; overflow: hidden`)}>
      <img loading="lazy" decoding="async" className="iso-spin" src="/assets/img/img-478ab867.png" alt="" aria-hidden="true" style={s(`position: absolute; left: -160px; top: 50%; margin-top: -300px; width: 600px; height: 600px; opacity: 0.08; animation-duration: 120s`)} />
      <div className="wrap" style={s(`position: relative; display: flex; flex-direction: column; gap: 36px`)}>
      <img loading="lazy" decoding="async" src="/assets/img/favicon.png" alt="" aria-hidden="true" className="reveal" style={s(`width: 72px; height: 72px`)} />
      <blockquote className="disp reveal-clip h-l" style={s(`font-size: 60px; font-weight: 600; color: #FFFFFF; max-width: 1100px; line-height: 1.08`)}>{t.a}<em>{t.b}</em>{t.c}</blockquote>
      <span className="mono reveal" style={s(`color: #7D8B88`)}>— Blending data for smoother businesses</span>
      </div>
      </section>
    </>
  );
}
