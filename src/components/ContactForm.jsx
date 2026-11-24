import { useState } from 'react';
import { s } from '../css.js';

const INTERESTS = ['Proyecto a medida', 'Enerflux', 'FidelyFlux', 'Otro'];
const LABEL = s('display: flex; flex-direction: column; gap: 10px; font-size: 10px; color: #A7B3B1');
const FIELD = 'font: 400 17px Rubik, sans-serif; color: #FFFFFF; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.3); padding: 10px 0; min-height: 44px; text-transform: none; letter-spacing: normal';
const FIELD_ERR = FIELD + '; border-bottom-color: #FF8A78';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Ingresá tu nombre.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Ingresá un email válido.';
  if (v.message.trim().length < 10) e.message = 'Contanos un poco más (mínimo 10 caracteres).';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [interest, setInterest] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const er = validate(values);
    setErrors(er);
    if (Object.keys(er).length) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, interest: INTERESTS[interest], page: window.location.href }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'No pudimos enviar el mensaje.');
      setStatus('sent');
      setValues({ name: '', email: '', message: '', company: '' });
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'No pudimos enviar el mensaje.');
    }
  }

  const sending = status === 'sending';

  return (
    <form className="reveal" onSubmit={onSubmit} noValidate aria-describedby="form-status" style={s('background: #081C15; color: #FFFFFF; border-radius: 0 48px 48px 48px; padding: 44px; display: flex; flex-direction: column; gap: 22px; box-shadow: 0 40px 80px rgba(8,28,21,0.35)')}>
      <div className="g2" style={s('gap: 20px')}>
        <label className="mono" style={LABEL}>
          Nombre
          <input type="text" name="name" autoComplete="name" required value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} style={s(errors.name ? FIELD_ERR : FIELD)} />
          {errors.name && <span id="err-name" className="form-msg form-err">{errors.name}</span>}
        </label>
        <label className="mono" style={LABEL}>
          Email
          <input type="email" name="email" autoComplete="email" required value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} style={s(errors.email ? FIELD_ERR : FIELD)} />
          {errors.email && <span id="err-email" className="form-msg form-err">{errors.email}</span>}
        </label>
      </div>
      {/* Honeypot antispam: invisible para personas, los bots lo completan. */}
      <label className="hp" aria-hidden="true">
        Empresa
        <input type="text" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
      </label>
      <fieldset style={s('border: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px')}>
        <legend className="mono" style={s('font-size: 10px; color: #A7B3B1; padding: 0; margin-bottom: 12px')}>Me interesa</legend>
        <div style={s('display: flex; flex-wrap: wrap; gap: 8px')}>
          {INTERESTS.map((l, i) => (
            <button key={l} type="button" onClick={() => setInterest(i)} aria-pressed={interest === i} style={s('font:500 14px Rubik,sans-serif;border-radius:999px;padding:10px 16px;min-height:44px;cursor:pointer;transition:background 200ms,color 200ms;' + (interest === i ? 'background:#33CC99;color:#081C15;border:1px solid #33CC99' : 'background:transparent;color:#FFFFFF;border:1px solid rgba(255,255,255,0.3)'))}>{l}</button>
          ))}
        </div>
      </fieldset>
      <label className="mono" style={LABEL}>
        Mensaje
        <textarea name="message" rows="3" required value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} style={s((errors.message ? FIELD_ERR : FIELD) + '; resize: vertical')}></textarea>
        {errors.message && <span id="err-message" className="form-msg form-err">{errors.message}</span>}
      </label>
      <button type="submit" className="btn btn-g" disabled={sending || status === 'sent'} style={s('font: 600 17px Rubik, sans-serif; background: #33CC99; color: #081C15; border: none; border-radius: 999px; padding: 18px; min-height: 52px; cursor: pointer; margin-top: 6px' + (sending ? '; opacity: 0.7; cursor: wait' : ''))}>
        {sending ? 'Enviando…' : status === 'sent' ? '¡Gracias! Te respondemos en menos de 24 h' : 'Enviar mensaje →'}
      </button>
      <div id="form-status" role="status" aria-live="polite">
        {status === 'sent' && <p className="form-msg" style={s('color: #33CC99')}>Recibimos tu mensaje. Te escribimos a la brevedad.</p>}
        {status === 'error' && (
          <p className="form-msg form-err">
            {serverError} Probá de nuevo o escribinos a <a href="mailto:hi@capstoneside.com" style={s('color: #FFFFFF')}>hi@capstoneside.com</a>.
          </p>
        )}
      </div>
    </form>
  );
}
