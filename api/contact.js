// Función serverless (Vercel) que recibe el formulario de contacto y lo envía por email con Resend.
//
// Variables de entorno:
//   RESEND_API_KEY  (obligatoria en producción) clave de https://resend.com
//   CONTACT_TO      destinatario(s), separados por coma. Por defecto: hi@capstoneside.com
//   CONTACT_FROM    remitente de un dominio verificado en Resend. Por defecto: Capstone Web <web@capstoneside.com>
//
// Sin RESEND_API_KEY y fuera de producción, el mensaje se imprime en consola (modo desarrollo).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTERESTS = ['Proyecto a medida', 'Enerflux', 'FidelyFlux', 'Otro'];
const LIMITS = { name: 120, email: 200, message: 5000, page: 500 };

// Límite simple por IP (por instancia): 5 envíos cada 10 minutos.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 50_000) throw new Error('too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'Método no permitido.' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 400, { ok: false, error: 'Solicitud inválida.' });
  }

  const clean = (k) => String(body[k] ?? '').trim().slice(0, LIMITS[k] ?? 200);
  const name = clean('name');
  const email = clean('email');
  const message = clean('message');
  const page = clean('page');
  const interest = INTERESTS.includes(body.interest) ? body.interest : 'Otro';

  // Honeypot: si viene completo es un bot. Respondemos OK sin enviar nada.
  if (String(body.company ?? '').trim()) return send(res, 200, { ok: true });

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return send(res, 422, { ok: false, error: 'Revisá los datos del formulario.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  if (rateLimited(ip)) return send(res, 429, { ok: false, error: 'Demasiados envíos seguidos. Esperá unos minutos.' });

  const subject = `Contacto web · ${interest} · ${name}`;
  const text = `Nombre: ${name}\nEmail: ${email}\nInterés: ${interest}\nPágina: ${page}\n\n${message}\n`;
  const html = `<h2 style="font-family:sans-serif">Nuevo contacto desde la web</h2>
<table style="font-family:sans-serif;font-size:14px" cellpadding="4">
<tr><td><b>Nombre</b></td><td>${escapeHtml(name)}</td></tr>
<tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
<tr><td><b>Interés</b></td><td>${escapeHtml(interest)}</td></tr>
<tr><td><b>Página</b></td><td>${escapeHtml(page)}</td></tr>
</table>
<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
      console.error('[contact] Falta RESEND_API_KEY');
      return send(res, 500, { ok: false, error: 'El formulario no está configurado.' });
    }
    console.log('[contact] (modo desarrollo, sin RESEND_API_KEY)\n' + text);
    return send(res, 200, { ok: true, dev: true });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Capstone Web <web@capstoneside.com>',
        to: (process.env.CONTACT_TO || 'hi@capstoneside.com').split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!r.ok) {
      console.error('[contact] Resend respondió', r.status, await r.text());
      return send(res, 502, { ok: false, error: 'No pudimos enviar el mensaje.' });
    }
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[contact] Error al enviar', err);
    return send(res, 502, { ok: false, error: 'No pudimos enviar el mensaje.' });
  }
}
