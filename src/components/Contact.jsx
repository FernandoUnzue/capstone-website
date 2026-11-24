import { s } from '../css.js';
import { anchor, useLang, useT } from '../i18n.js';

const TEXT = {
  es: {
    kick: "Contacto",
    h2: "Trabajemos juntos.",
    lead: "Contanos qué querés resolver. Te respondemos en menos de 24 horas.",
    phone: "Teléfono",
    spain: "España",
  },
  en: {
    kick: "Contact",
    h2: "Let’s work together.",
    lead: "Tell us what you want to solve. We’ll get back to you within 24 hours.",
    phone: "Phone",
    spain: "Spain",
  },
};
import ContactForm from './ContactForm.jsx';

export default function Contact() {
  const lang = useLang();
  const t = useT(TEXT);
  return (
    <>
      <section id="contacto" style={s(`background: #33CC99; color: #081C15; padding: 140px 0; position: relative; overflow: hidden`)}>
      <img loading="lazy" decoding="async" className="iso-spin" src="/assets/img/img-255b4177.png" alt="" aria-hidden="true" style={s(`position: absolute; right: -180px; bottom: -220px; width: 700px; height: 700px; opacity: 0.1`)} />
      <div className="wrap" style={s(`position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 72px; align-items: center`)} id="contact-grid">
      <div style={s(`display: flex; flex-direction: column; gap: 28px; align-items: flex-start`)}>
      <div className="mono kick kick-dark reveal" style={s(`color: #081C15`)}>{t.kick}</div>
      <h2 className="disp reveal-clip h-l" style={s(`font-size: 80px; font-weight: 600; color: #081C15; line-height: 0.98`)}>{t.h2}</h2>
      <p className="reveal" style={s(`margin: 0; font-size: 19px; line-height: 1.6; max-width: 460px; color: #0F5141`)}>{t.lead}</p>
      <div className="reveal" style={s(`display: grid; grid-template-columns: 110px minmax(0, 1fr); row-gap: 18px; column-gap: 20px; align-items: baseline; width: 100%; max-width: 520px; padding-top: 18px; border-top: 1px solid rgba(8,28,21,0.2)`)}>
      <span className="mono" style={s(`font-size: 11px; color: #0F5141`)}>Email</span><a href="mailto:hi@capstoneside.com" className="disp" style={s(`font-size: 26px; font-weight: 600; text-decoration: none; color: #081C15`)}>hi@capstoneside.com</a>
      <span className="mono" style={s(`font-size: 11px; color: #0F5141`)}>{t.phone}</span><a href="tel:+5492235953896" className="disp" style={s(`font-size: 26px; font-weight: 600; text-decoration: none; color: #081C15`)}>+54 9 223 595 3896</a>
      <span className="mono" style={s(`font-size: 11px; color: #0F5141`)}>Argentina</span><span className="disp" style={s(`font-size: 20px; font-weight: 600; color: #081C15; line-height: 1.35`)}>Bernardo de Irigoyen 3918, Playa Grande<br />B7600 Mar del Plata, Buenos Aires</span>
      <span className="mono" style={s(`font-size: 11px; color: #0F5141`)}>{t.spain}</span><span className="disp" style={s(`font-size: 20px; font-weight: 600; color: #081C15; line-height: 1.35`)}>Calle de Manzanares 4, Arganzuela<br />28005 Madrid</span>
      </div>
      </div>
      <ContactForm />
      </div>
      </section>
    </>
  );
}
