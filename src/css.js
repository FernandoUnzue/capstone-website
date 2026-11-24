// Convierte una cadena de estilos CSS en línea ("a-b: c; d: e") al objeto que espera React.
// Permite conservar los estilos del diseño original tal cual.
const cache = new Map();

export function s(str) {
  if (!str) return undefined;
  let out = cache.get(str);
  if (out) return out;
  out = {};
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop || !val) continue;
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/^-(webkit|moz|ms)-/, (_, p) => (p === 'ms' ? 'ms-' : p[0].toUpperCase() + p.slice(1) + '-'))
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = val;
  }
  cache.set(str, out);
  return out;
}
