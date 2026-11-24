// Función serverless (Vercel) que recibe el formulario de contacto y lo envía por SMTP (domain.com).
//
// Variables de entorno:
//   SMTP_PASS     (obligatoria en producción) contraseña de la casilla que envía
//   SMTP_USER     usuario SMTP. Por defecto: hi@capstoneside.com
//   SMTP_HOST     servidor SMTP. Por defecto: smtp.domain.com
//   SMTP_PORT     puerto. Por defecto: 465 (SSL). Con 587 se usa STARTTLS.
//   CONTACT_TO    destinatario(s), separados por coma. Por defecto: hi@capstoneside.com
//   CONTACT_FROM  remitente. Por defecto: Capstone Web <SMTP_USER>
//
// Sin SMTP_PASS y fuera de producción, el mensaje se imprime en consola (modo desarrollo).

import nodemailer from 'nodemailer';

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

  const pass = process.env.SMTP_PASS;
  if (!pass) {
    if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
      console.error('[contact] Falta SMTP_PASS');
      return send(res, 500, { ok: false, error: 'El formulario no está configurado.' });
    }
    console.log('[contact] (modo desarrollo, sin SMTP_PASS)\n' + text);
    return send(res, 200, { ok: true, dev: true });
  }

  const user = process.env.SMTP_USER || 'hi@capstoneside.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.domain.com',
    port,
    secure: port === 465, // 465: SSL directo; 587: STARTTLS
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.CONTACT_FROM || `Capstone Web <${user}>`,
      to: (process.env.CONTACT_TO || 'hi@capstoneside.com').split(',').map((s) => s.trim()).filter(Boolean),
      replyTo: `${name.replace(/[<>"\r\n]/g, '')} <${email}>`,
      subject,
      text,
      html,
    });
    console.log('[contact] Enviado', info.messageId, info.response);
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[contact] Error SMTP', err.code || '', err.responseCode || '', err.response || err.message);
    return send(res, 502, { ok: false, error: 'No pudimos enviar el mensaje.' });
  }
}
