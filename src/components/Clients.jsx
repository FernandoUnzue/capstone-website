import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';

const TEXT = {
  es: {
    aria: "Clientes",
    trust1: "Confían",
    trust2: "en nosotros",
  },
  en: {
    aria: "Clients",
    trust1: "They",
    trust2: "trust us",
  },
};

export default function Clients() {
  const lang = useLang();
  const t = useT(TEXT);
  return (
    <>
      <section aria-label={t.aria} style={s(`background: #FFFFFF; padding: 56px 0 52px; border-bottom: 1px solid #E2E8E7`)}>
      <div className="wrap" style={s(`display: flex; align-items: center; gap: 48px`)}>
      <span className="mono" style={s(`flex: none; color: #586462; font-size: 11px; line-height: 1.5; width: 120px`)}>{t.trust1}<br />{t.trust2}</span>
      <div className="fade" style={s(`flex: 1; overflow: hidden; min-width: 0`)}>
      <div className="marquee" style={s(`gap: 72px; align-items: center`)}>
      <div style={s(`display: flex; gap: 72px; align-items: center`)}><img loading="lazy" decoding="async" className="cl" src="/assets/img/enel.png" alt="Enel" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/cfi.png" alt="CFI" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/mia-world.png" alt="MIA World" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/hofstetter.png" alt="Hofstetter" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/avc-internettv.png" alt="AVC internet·tv" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/acf-fiorentina.png" alt="ACF Fiorentina" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/centro-de-estudios-digestivos.png" alt="Centro de Estudios Digestivos" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/magiis.png" alt="Magiis" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/alohar.png" alt="Alohar" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/gazeta-celesi.png" alt="Gazeta Celesi" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/fabiani.png" alt="Fabiani" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/haciendo-camino.png" alt="Haciendo Camino" style={s(`height: 40px`)} /><img loading="lazy" decoding="async" className="cl" src="/assets/img/jumpit-zone.png" alt="Jumpit Zone" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/electroterma.png" alt="Electroterma" style={s(`height: 26px`)} /><img loading="lazy" decoding="async" className="cl" src="/assets/img/terrasur.png" alt="Terrasur" style={s(`height: 40px`)} /><img loading="lazy" decoding="async" className="cl" src="/assets/img/provincia-de-san-luis.png" alt="Provincia de San Luis" style={s(`height: 38px`)} /></div>
      <div aria-hidden="true" style={s(`display: flex; gap: 72px; align-items: center`)}><img loading="lazy" decoding="async" className="cl" src="/assets/img/enel.png" alt="Enel" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/cfi.png" alt="CFI" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/mia-world.png" alt="MIA World" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/hofstetter.png" alt="Hofstetter" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/avc-internettv.png" alt="AVC internet·tv" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/acf-fiorentina.png" alt="ACF Fiorentina" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/centro-de-estudios-digestivos.png" alt="Centro de Estudios Digestivos" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/magiis.png" alt="Magiis" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/alohar.png" alt="Alohar" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/gazeta-celesi.png" alt="Gazeta Celesi" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/fabiani.png" alt="Fabiani" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/haciendo-camino.png" alt="Haciendo Camino" style={s(`height: 40px`)} /><img loading="lazy" decoding="async" className="cl" src="/assets/img/jumpit-zone.png" alt="Jumpit Zone" /><img loading="lazy" decoding="async" className="cl" src="/assets/img/electroterma.png" alt="Electroterma" style={s(`height: 26px`)} /><img loading="lazy" decoding="async" className="cl" src="/assets/img/terrasur.png" alt="Terrasur" style={s(`height: 40px`)} /><img loading="lazy" decoding="async" className="cl" src="/assets/img/provincia-de-san-luis.png" alt="Provincia de San Luis" style={s(`height: 38px`)} /></div>
      </div>
      </div>
      </div>
      </section>
    </>
  );
}
