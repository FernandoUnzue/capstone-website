class DCLogic { constructor(props){ this.props = props || {}; this.state = {}; } setState(p){ Object.assign(this.state, p); App.schedule(Object.keys(p)); } forceUpdate(){ App.schedule([]); } }
const App = {
  comp: null, vals: {}, pending: null, keys: new Set(),
  get(scope, path){ path = path.trim(); if (path === 'true') return true; if (path === 'false') return false; if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    const parts = path.split('.'); let v; for (const sc of scope) { if (sc && parts[0] in sc) { v = sc[parts[0]]; break; } }
    for (let i = 1; i < parts.length && v != null; i++) v = v[parts[i]]; return v; },
  interp(str, scope){ return str.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, p) => { const v = App.get(scope, p); return v == null ? '' : String(v); }); },
  single(str){ const m = str.match(/^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/); return m ? m[1] : null; },
  renderNodes(nodes, scope, out){ for (const n of nodes) App.renderNode(n, scope, out); },
  renderNode(n, scope, out){
    if (n.nodeType === 3) { out.appendChild(document.createTextNode(App.interp(n.nodeValue, scope))); return; }
    if (n.nodeType !== 1) return;
    const tag = n.tagName.toLowerCase();
    if (tag === 'sc-for') { const list = App.get(scope, App.single(n.getAttribute('list'))) || []; const as = n.getAttribute('as');
      list.forEach((item, i) => App.renderNodes(n.childNodes, [{ [as]: item, $index: i }, ...scope], out)); return; }
    if (tag === 'sc-if') { if (App.get(scope, App.single(n.getAttribute('value')))) App.renderNodes(n.childNodes, scope, out); return; }
    const el = document.createElementNS(n.namespaceURI, n.localName);
    for (const a of Array.from(n.attributes)) {
      const name = a.name, val = a.value, one = App.single(val);
      if (name.startsWith('hint-')) continue;
      if (name.startsWith('on') && one) { const fn = App.get(scope, one); if (typeof fn === 'function') el.addEventListener(name.slice(2).toLowerCase(), fn); continue; }
      if (name === 'ref' && one) { const fn = App.get(scope, one); if (typeof fn === 'function') fn(el); continue; }
      el.setAttribute(name, val.includes('{{') ? App.interp(val, scope) : val);
    }
    App.renderNodes((n.content || n).childNodes, scope, el); out.appendChild(el);
  },
  renderIsland(name){ const host = document.querySelector('[data-island="' + name + '"]'); const t = document.getElementById('tpl-' + name);
    const frag = document.createDocumentFragment(); App.renderNodes(t.content.childNodes, [App.vals], frag); host.replaceChildren(frag); },
  renderAll(only){ App.vals = App.comp.renderVals(); document.querySelectorAll('[data-island]').forEach((h) => { const n = h.dataset.island; if (!only || only.includes(n)) App.renderIsland(n); }); },
  schedule(keys){ keys.forEach((k) => App.keys.add(k)); if (App.pending) return;
    App.pending = requestAnimationFrame(() => { const ks = [...App.keys]; App.keys.clear(); App.pending = null;
      App.renderAll(ks.length && ks.every((k) => k === 'p') ? ['stats'] : null); }); },
  bindStatic(){ document.querySelectorAll('[data-ref]').forEach((el) => { const fn = App.vals[el.dataset.ref]; if (fn) fn(el); });
    for (const ev of ['click', 'mousemove']) document.querySelectorAll('[data-on-' + ev + ']').forEach((el) => el.addEventListener(ev, (e) => { const fn = App.vals[el.getAttribute('data-on-' + ev)]; if (fn) fn(e); })); },
  start(){ App.comp = new Component({}); App.renderAll(); App.bindStatic(); if (App.comp.componentDidMount) App.comp.componentDidMount();
    document.addEventListener('keydown', (e) => { if (e.key !== 'Escape') return; if (App.comp.state.lb >= 0) App.comp.setState({ lb: -1 }); else if (App.comp.state.cs) App.comp.setState({ cs: null }); }); }
};

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { svc: 0, video: 0, filter: 'Todos', interest: 0, menu: false, p: 0, lb: -1, cs: null };
    this.statsEl = null; this.counted = false;
    this.hero = null;
  }
  componentDidMount() {
    const start = () => {
      if (this.counted) return; this.counted = true;
      const t0 = performance.now(), dur = 1800;
      const tick = (t) => { const k = Math.min(1, (t - t0) / dur); this.setState({ p: 1 - Math.pow(1 - k, 3) }); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    };
    const tryObserve = () => {
      if (!this.statsEl) { setTimeout(tryObserve, 200); return; }
      if (typeof IntersectionObserver === 'undefined') { start(); return; }
      const check = () => { if (this.counted) { document.removeEventListener('scroll', check, true); return; } const el = this.statsEl; if (!el || !el.isConnected) return; const r = el.getBoundingClientRect(); if (r.top < innerHeight * 0.85 && r.bottom > 0) { document.removeEventListener('scroll', check, true); start(); } };
      document.addEventListener('scroll', check, { passive: true, capture: true }); window.addEventListener('resize', check); check();
    };
    tryObserve();
  }
  componentWillUnmount() { if (this.io) this.io.disconnect(); }
  renderVals() {
    const st = this.state;
    const SERVICES = [
      { num: '01', name: 'Data & Analytics', img: 'assets/img/img-4ec95581.jpg', short: 'Todos tus datos en un solo lugar, listos para anticipar.', text: 'Ordenamos y conectamos los datos de toda tu organización para pasar del reporte a la predicción: modelos que detectan patrones, anticipan desvíos y recomiendan qué hacer.', items: ['Arquitectura de datos', 'Modelos predictivos', 'Detección de patrones', 'Dashboards dinámicos'], cta: 'Ver casos de datos' },
      { num: '02', name: 'IA Aplicada', img: 'assets/img/img-e4f5396a.jpg', short: 'IA útil desde el primer día, con tu información protegida.', text: 'Creamos asistentes y herramientas de IA que leen documentos, responden consultas y automatizan tareas repetitivas. Funcionan dentro de tu organización, así tu información nunca sale de casa.', items: ['Asistentes inteligentes', 'Lectura de documentos', 'Automatización de tareas', 'Datos protegidos'], cta: 'Ver casos de IA' },
      { num: '03', name: 'Custom Development', img: 'assets/img/img-596bf5c4.jpg', short: 'Web, apps y backoffice a medida.', text: 'Apps móviles iOS y Android, plataformas web y sistemas de gestión para controlar tu negocio desde cualquier lugar.', items: ['Apps móviles', 'Plataformas web', 'UX/UI', 'Backoffice'], cta: 'Ver casos de software' },
      { num: '04', name: 'Consultoría & Transformación', img: 'assets/img/img-20a33e00.jpg', short: 'Del diagnóstico al plan, con resultados medibles.', text: 'Entendemos cómo funciona hoy tu organización, detectamos dónde se pierde tiempo y dinero, y armamos un plan claro para digitalizarla paso a paso. Después acompañamos al equipo para que el cambio se adopte de verdad.', items: ['Diagnóstico de procesos', 'Planificación estratégica digital', 'Gestión del cambio', 'Transformación tecnológica'], cta: 'Ver casos de transformación' }
    ];
    const services = SERVICES.map((s, i) => {
      const open = st.svc === i;
      return { ...s, open, openAttr: open ? 'true' : 'false', pick: () => this.setState({ svc: open ? -1 : i }),
        iconStyle: 'width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform 300ms,background 300ms;' + (open ? 'background:#33CC99;color:#081C15;transform:rotate(45deg)' : 'background:#EEF2F4;color:#081C15') };
    });

    const CASE_PAGES = {
      fiorentina: { aria: 'Caso ACF Fiorentina', label: 'Caso de éxito · Fidelización', heroClass: 'cs-hero-viola', logo: 'assets/img/acf-fiorentina.png', logoAlt: 'ACF Fiorentina', place: 'Fútbol · Florencia, Italia',
        titleA: 'In Viola Card: la fidelización de los hinchas,', titleB: 'en cada comercio asociado.',
        lead: 'La ACF Fiorentina, club de fútbol de Florencia, creó In Viola Card, el primer programa de co-marketing de fidelización integrado a sus socios en el mundo del fútbol. Para ese programa desarrollamos la app de terminal de cobro que usan los comercios adheridos.',
        facts: [['Cliente', 'ACF Fiorentina'], ['País', 'Italia'], ['Programa', 'In Viola Card'], ['Desarrollo', 'App de terminal de cobro para comercios']],
        img: 'assets/img/app-viola-de-acf-fiorentina.jpg', imgAlt: 'App de terminal de cobro de In Viola Card', imgStyle: 'width:100%;height:520px;object-fit:contain;background:#FFFFFF;display:block',
        chTitle: 'Llevar el programa del estadio a los comercios.', ch: 'Para que In Viola Card funcionara, los socios tenían que poder usar sus beneficios en los comercios asociados al programa. Cada comercio necesitaba una herramienta simple para identificar al socio, registrar la venta y aplicar descuentos y puntos en el momento.',
        soA: 'Una app de cobro simple', soB: 'para cada comercio adherido.', soLead: 'Pensada para usarse en el mostrador, en pocos pasos y sin capacitación compleja.',
        feats: [['Acceso del operador', 'Validación de las credenciales de cada operador antes de empezar a cobrar.'], ['Búsqueda del socio', 'Identificación rápida del cliente que forma parte del programa.'], ['Registro de la venta', 'Carga de cada venta asociada al socio que está comprando.'], ['Cupones y puntos', 'Uso de cupones de descuento y acumulación de puntos en la misma operación.'], ['Ticket de venta', 'Impresión del comprobante de la venta para el cliente.']],
        reTitle: 'Los beneficios del club, en el mostrador de cada comercio.',
        stats: [['1°', 'programa de co-marketing de fidelización integrado a socios en el fútbol'], ['5', 'pasos de cobro: acceso, socio, venta, beneficio y ticket'], ['Cupones + puntos', 'en una misma operación'], ['Ticket', 'impreso al momento para cada venta']],
        quote: '', who: '', role: '', video: 0,
        ctaTitle: '¿Querés llevar tu programa de fidelización a una red de comercios?', ctaLabel: 'Conocer FidelyFlux', ctaHref: '#fidelyflux', ctaTarget: '_self', ctaClose: true, source: '', sourceLabel: '' },
      alohar: { aria: 'Caso Alohar', label: 'Caso de éxito · Software', heroClass: 'cs-hero-ced', logo: 'assets/img/alohar.png', logoAlt: 'Alohar', place: 'Alquileres temporarios · Latinoamérica',
        titleA: 'Alohar: una plataforma de alquileres temporarios', titleB: 'para competir con Airbnb en Latinoamérica.',
        lead: 'Para Alohar, plataforma online de alquileres temporarios y alojamiento, desarrollamos una solución llave en mano: desde el relevamiento de los requerimientos tecnológicos y el diseño de la arquitectura hasta el desarrollo, el despliegue y el lanzamiento al mercado.',
        facts: [['Cliente', 'Alohar'], ['Mercado', 'Latinoamérica'], ['Rubro', 'Alquileres temporarios y alojamiento'], ['Alcance', 'Solución llave en mano']],
        img: 'assets/img/img-683ab532.jpg', imgAlt: 'Sitio web de Alohar', imgStyle: 'width:100%;height:auto;display:block',
        chTitle: 'Competir con un líder global.', ch: 'Alohar quería salir al mercado latinoamericano de alquileres temporarios y alojamiento compitiendo directamente con Airbnb. Para eso necesitaba un socio que se hiciera cargo del producto completo, de la tecnología al lanzamiento.',
        soA: 'Una solución llave en mano,', soB: 'de la idea al mercado.', soLead: 'Un mismo equipo a cargo de todo el ciclo del producto.',
        feats: [['Relevamiento de requerimientos', 'Evaluación de las necesidades tecnológicas de la plataforma.'], ['Diseño de arquitectura', 'Definición de la arquitectura sobre la que se construyó el producto.'], ['Desarrollo', 'Construcción de la plataforma web y la app.'], ['Despliegue', 'Puesta en producción de la plataforma.'], ['Lanzamiento al mercado', 'Acompañamiento en la salida del producto al mercado.']],
        reTitle: 'Un producto listo para salir a competir.',
        stats: [['Llave en mano', 'del relevamiento al lanzamiento'], ['Web + app', 'para viajeros y anfitriones'], ['LATAM', 'mercado objetivo, frente a Airbnb'], ['1', 'equipo a cargo de todo el ciclo del producto']],
        quote: '', who: '', role: '', video: 0,
        ctaTitle: '¿Tenés una idea de producto digital?', ctaLabel: 'Ver Custom Development', ctaHref: '#que-hacemos', ctaTarget: '_self', ctaClose: true, source: '', sourceLabel: '' },
      mia: { aria: 'Caso MIA World', label: 'Caso de éxito · Fidelización', heroClass: 'cs-hero-ff', logo: 'assets/img/mia-world.png', logoAlt: 'MIA World', place: 'Fintech · Italia',
        titleA: 'MIA World: beneficios, cashback y', titleB: 'premios en una sola app.',
        lead: 'Para MIA World desarrollamos la app y el área web de sus miembros: cashback en tiendas online, sorteos instantáneos, invitaciones a amigos y un catálogo de cupones y premios.',
        facts: [['Cliente', 'MIA World'], ['País', 'Italia'], ['Plataformas', 'App y área web de miembros'], ['Alcance', 'Programa de beneficios y cashback']],
        img: 'assets/img/img-e8cb6a6a.jpg', imgAlt: 'App MIA World: mapa de comercios y negocios destacados', imgStyle: 'width:100%;height:520px;object-fit:contain;background:#FFFFFF;display:block',
        chTitle: 'Muchos beneficios, muchos proveedores.', ch: 'MIA World quería reunir en una sola app los beneficios de fidelización, el cashback en comercios online y los sorteos y premios. Para eso había que conectar un agregador de cashback con la plataforma de fidelización.',
        soA: 'Una app con', soB: 'todos los beneficios conectados.', soLead: 'Integraciones vía API con BestShopping y FidelyNET.',
        feats: [['Alta y acceso', 'Onboarding con tarjeta virtual, inicio de sesión, recuperación de contraseña y acceso biométrico con Face ID.'], ['Cashback online', 'Las tiendas de BestShopping organizadas por categoría, con la vitrina de cada comercio, el cashback de cada compra y gestión de reclamos.'], ['Instant Win', 'Sorteos instantáneos configurados desde el back office de FidelyNET: se participa viendo una imagen o un video, con premio consuelo configurable.'], ['Invitá a un amigo', 'Un programa member-get-member con premios para quien invita y para quien se suma.'], ['Cupones, promociones y premios', 'Cupones, promociones, eventos y novedades de los comercios, con la distancia a cada uno, y un catálogo para canjear los puntos acumulados.'], ['Área web de miembros', 'Saldo de puntos y cashback, perfil, tiendas y promociones también desde la web.']],
        reTitle: 'Todos los beneficios, en el mismo lugar.',
        stats: [['2', 'plataformas integradas: BestShopping para el cashback y FidelyNET para la fidelización'], ['App + web', 'para que cada miembro gestione sus beneficios'], ['Face ID', 'acceso biométrico a la app'], ['MGM', 'programa de invitación con premios para los dos miembros']],
        quote: '', who: '', role: '', video: 0,
        ctaTitle: '¿Querés sumar cashback y beneficios a tu programa?', ctaLabel: 'Conocer FidelyFlux', ctaHref: '#fidelyflux', ctaTarget: '_self', ctaClose: true, source: '', sourceLabel: '' },
      celesi: { aria: 'Caso Gazeta Çelësi', label: 'Caso de éxito · Software', heroClass: 'cs-hero-celesi', logo: 'assets/img/gazeta-celesi.png', logoAlt: 'Çelësi', place: 'Clasificados · Albania',
        titleA: 'Çelësi: una infraestructura bajo control y', titleB: 'una sola cuenta para todos sus servicios.',
        lead: 'Para Çelësi, el portal de anuncios líder de Albania, ordenamos la infraestructura y el equipo de desarrollo de Gazeta, y construimos Çelësi Accounts Manager: el sistema que centraliza los datos de los usuarios y permite ingresar con una sola cuenta a todos sus servicios.',
        facts: [['Cliente', 'Çelësi · Gazeta Çelësi'], ['País', 'Albania'], ['Alcance', 'Infraestructura, equipo y reingeniería'], ['Desarrollo', 'Çelësi Accounts Manager']],
        img: 'assets/img/img-91e2cb02.jpg', imgAlt: 'Portal de anuncios Çelësi', imgStyle: 'width:100%;height:auto;display:block',
        chTitle: 'Muchos servicios, muchos accesos.', ch: 'Los portales Gazeta y Yellow Pages funcionaban con un sistema de login de varios años y los datos de los usuarios estaban repartidos entre el CRM, la plataforma de marketing y el programa de fidelización. Además, la empresa necesitaba tener control total de su infraestructura, una metodología de trabajo eficiente y un equipo dedicado a mantener y hacer evolucionar Gazeta.',
        soA: 'Un equipo dedicado y una cuenta Çelësi', soB: 'sincronizada con cada sistema.', soLead: 'Trabajo con metodología ágil, desarrollo guiado por tests e integración y despliegue continuos.',
        feats: [['Plan de trabajo y equipo dedicado', 'Estabilización de la infraestructura, una metodología de trabajo eficiente y un equipo dedicado a Gazeta: mantenimiento, nuevas funcionalidades y la reingeniería hacia Gazeta 2.0.'], ['Registro y login simplificados', 'Cuentas para particulares y empresas, ingreso con email o celular verificados y un registro liviano que se completa recién al usar los servicios.'], ['Google, Facebook y Single Sign On', 'Ingreso con cuentas de Google o Facebook y la posibilidad de usar la cuenta Çelësi en aplicaciones externas, con el estándar OAuth2.'], ['Datos sincronizados en todos los sistemas', 'Los datos de cada usuario se mantienen al día en el CRM, la plataforma de marketing SALESmanago y el programa de fidelización Karta Extra.'], ['Convivencia con el sistema anterior', 'Un puente con el login existente y la migración de los usuarios, para integrar el nuevo acceso en los portales sin frenar la operación.'], ['APIs para crecer', 'APIs para que aplicaciones propias y de terceros registren y gestionen usuarios, y servicios con las categorías de negocios y los datos geográficos de la región.'], ['Perfil a cargo del usuario', 'Cada usuario edita sus datos o elimina su cuenta, y el equipo de back office gestiona los perfiles desde el mismo sistema.']],
        reTitle: 'Una base sólida para seguir creciendo.',
        stats: [['1', 'cuenta para todos los servicios de Çelësi'], ['3', 'sistemas sincronizados: CRM, marketing y fidelización'], ['SSO', 'ingreso único en aplicaciones propias y de terceros'], ['CI/CD', 'tests automáticos y despliegues continuos a staging y producción']],
        quote: '', who: '', role: '', video: 0,
        ctaTitle: '¿Tu plataforma necesita una reingeniería?', ctaLabel: 'Ver Consultoría & Transformación', ctaHref: '#que-hacemos', ctaTarget: '_self', ctaClose: true, source: '', sourceLabel: '' },
      fabiani: { aria: 'Caso Fabiani Gioiellerie', label: 'Caso de éxito · Fidelización', heroClass: 'cs-hero-ff', logo: 'assets/img/fabiani.png', logoAlt: 'Fabiani Gioiellerie', place: 'Retail de lujo · Italia',
        titleA: 'El programa de clientes de Fabiani,', titleB: 'en una app.',
        lead: 'Para Fabiani Gioiellerie diseñamos y desarrollamos desde cero la app para iOS y Android de su programa de clientes: registro, tarjeta Fabiani con su saldo, cupones, promociones y tiendas en un solo lugar.',
        facts: [['Cliente', 'Fabiani Gioiellerie'], ['País', 'Italia'], ['Plataformas', 'iOS y Android'], ['Alcance', 'Diseño UX/UI y desarrollo desde cero']],
        img: 'assets/img/app-fabiani.jpg', imgAlt: 'Pantallas de la app Fabiani: bienvenida, inicio, tarjeta, promociones y cupones', imgStyle: 'width:100%;height:auto;display:block;background:#FBF5EA;padding:32px 32px 0',
        chTitle: 'Llevar el programa de clientes al celular.', ch: 'Fabiani necesitaba una aplicación para Android y iPhone que permitiera a sus clientes registrarse y acceder a un área personal para ver su saldo, sus cupones y las novedades de la marca.',
        soA: 'Una app completa, del registro a', soB: 'la tienda más cercana.', soLead: 'Diseño UX/UI y desarrollo para iOS y Android, con la arquitectura y el stack tecnológico definidos desde cero.',
        feats: [['Registro y acceso', 'Onboarding, tutorial, registro, inicio de sesión y recuperación de contraseña.'], ['Tarjeta Fabiani', 'Pantalla de inicio con la tarjeta digital del cliente y su saldo.'], ['Cupones, promociones y novedades', 'Los cupones y promociones disponibles para cada cliente, junto con las novedades de la marca.'], ['Store locator', 'Para encontrar las tiendas Fabiani desde la app.'], ['Mi cuenta', 'Perfil, movimientos, datos y preferencias, con cambio de contraseña, recuperación de email y baja del perfil.'], ['Servicios, ventajas y ayuda', 'Secciones con los servicios de la marca, los beneficios del programa y un canal de ayuda y contacto.'], ['Configurable', 'Textos en varios idiomas desde un archivo, tutorial y colores principales de la app configurables.']],
        reTitle: 'Todo el programa de clientes, en el bolsillo.',
        stats: [['2', 'plataformas: iOS y Android'], ['12', 'funcionalidades, del onboarding a la ayuda y contacto'], ['Multi-idioma', 'textos configurables desde un archivo, sin tocar el código'], ['Desde cero', 'arquitectura y stack tecnológico definidos para el proyecto']],
        quote: '', who: '', role: '', video: 0,
        ctaTitle: '¿Querés llevar tu programa de fidelización a una app?', ctaLabel: 'Conocer FidelyFlux', ctaHref: '#fidelyflux', ctaTarget: '_self', ctaClose: true, source: '', sourceLabel: '' },
      sanluis: { aria: 'Caso Provincia de San Luis', label: 'Caso de éxito · Energía', heroClass: 'bg-enerflux', logo: 'assets/img/enerflux.png', logoAlt: 'Enerflux', place: 'Provincia de San Luis · Argentina',
        titleA: 'Un nuevo sistema para fiscalizar y mejorar la', titleB: 'calidad del servicio eléctrico.',
        lead: 'Desarrollamos para la Comisión Reguladora de Energía de San Luis (CRPEE) la plataforma que integra los datos de calidad de servicio de toda la provincia, con Enerflux como base.',
        facts: [['Cliente', 'Comisión Reguladora de Energía (CRPEE)'], ['Marco', 'Plan Maestro de Energía 2026–2036'], ['Financiamiento', 'Consejo Federal de Inversiones (CFI)'], ['Lanzamiento', 'Junio 2026']],
        img: 'assets/img/plataforma-de-datos-de-san-luis.jpg', imgAlt: 'Plataforma de calidad de servicio de San Luis',
        chTitle: 'Datos que llegaban tarde y a mano.', ch: 'El regulador necesitaba controlar la calidad del servicio eléctrico en toda la provincia, pero la recolección de datos era manual y lenta. Eso hacía difícil detectar a tiempo los problemas, responder a los reclamos de vecinos y empresas, y fiscalizar con información confiable.',
        soA: 'Una plataforma que integra todas las fuentes y las convierte en', soB: 'información para decidir.', soLead: 'Diseñada junto al equipo del regulador y adaptada al contrato de concesión de la provincia.',
        feats: [['Reclamos georreferenciados', 'Analiza todos los reclamos e incidencias del sistema eléctrico ubicados en el mapa.'], ['Informes de calidad para fiscalizar', 'Genera los reportes de calidad de servicio que usa el regulador en su control.'], ['Zonas críticas de la red', 'Evalúa las zonas más complejas de la red provincial para actuar donde más se necesita.'], ['Datos en tres niveles', 'Procesa la información de la distribuidora en capas bronce, plata y oro, según su grado de depuración.'], ['Controles auditables', 'Aplica los controles acordados con el regulador para validar que los datos sean viables, coherentes y auditables.'], ['Reclamo + medición real', 'Ante un reclamo se instala un registrador por una semana y sus datos se cruzan con el historial de reclamos del usuario.']],
        reTitle: 'Un seguimiento más realista, en mucho menos tiempo.',
        stats: [['1°', 'software de su tipo desarrollado en el país, a medida del contrato de concesión'], ['3', 'niveles de calidad de datos: bronce, plata y oro'], ['480', 'medidores inteligentes con consumo casi en tiempo real'], ['22', 'registradores para validar cada reclamo en campo']],
        quote: '“Enerflux permite un seguimiento mucho más realista y en mucho menor tiempo de lo que hoy se hacía manualmente con una demora importante.”', who: 'Laura Giumelli', role: 'Coordinadora del Plan Maestro de Energía', video: 0,
        ctaTitle: '¿Tu organización necesita controlar la calidad del servicio?', ctaLabel: 'Conocer Enerflux ↗', ctaHref: 'https://www.enerflux.com.ar', ctaTarget: '_blank',
        source: 'https://agenciasanluis.com/2026/06/18/1178758-la-provincia-lanzo-un-nuevo-sistema-para-fiscalizar-y-mejorar-la-calidad-del-servicio-electrico/', sourceLabel: 'Fuente: Agencia de Noticias San Luis ↗' },
      ced: { aria: 'Caso Centro de Estudios Digestivos', label: 'Caso de éxito · Salud', heroClass: 'cs-hero-ced', logo: 'assets/img/centro-de-estudios-digestivos.png', logoAlt: 'Centro de Estudios Digestivos', place: 'Salud · Argentina',
        titleA: 'CED Intelligence: la conciliación con PAMI,', titleB: 'sin planillas.',
        lead: 'Para el Centro de Estudios Digestivos desarrollamos el sistema que controla de punta a punta la gestión con PAMI: desde la atención registrada en el centro hasta la transmisión final en el portal de PAMI.',
        facts: [['Cliente', 'Centro de Estudios Digestivos (CED)'], ['Especialidad', 'Gastroenterología y coloproctología'], ['Alcance', 'Datos y conciliación con PAMI'], ['Resultado', '−95% de tiempo de control']],
        img: 'assets/img/img-2af032bc.jpg', imgAlt: 'CED Intelligence, sistema de conciliación y control administrativo-financiero', imgStyle: 'width:100%;height:460px;object-fit:cover;object-position:center;display:block',
        chTitle: 'Horas de cruces manuales para controlar PAMI.', ch: 'Controlar las prestaciones de PAMI dependía de cruzar a mano lo realizado en el centro con lo presentado y lo transmitido. La información estaba en distintos sistemas y formatos, las codificaciones se unificaban manualmente y no había una visión clara de los desvíos a tiempo.',
        soA: 'Un control de punta a punta, de la atención', soB: 'a la transmisión.', soLead: 'Es la primera etapa de CED Intelligence, la plataforma con la que el CED ordena su gestión administrativo-financiera.',
        feats: [['Datos confiables, todos los días', 'Procesos diarios que toman los datos del sistema de gestión del centro, validan nulos, duplicados y coherencia, y registran cada ejecución.'], ['Una base única y ordenada', 'Normaliza la información operativa en una base central, sin inconsistencias ni ambigüedades.'], ['Realizado vs. presentado vs. transmitido', 'Concilia automáticamente lo atendido en el CED con lo presentado y transmitido a PAMI.'], ['Control semanal y cierre mensual', 'Revisa las prestaciones valorizadas cada semana y cierra el mes contra la proforma para detectar desvíos.'], ['Estados con auditoría completa', 'Una interfaz web para gestionar el estado de cada caso, con registro de quién cambió qué, cuándo y por qué.']],
        reTitle: 'El control de PAMI, un 95% más rápido.',
        stats: [['−95%', 'de tiempo en el control del proceso administrativo'], ['3', 'instancias conciliadas: lo realizado, lo presentado y lo transmitido'], ['Semanal', 'control de prestaciones valorizadas, con cierre mensual contra proforma'], ['24h', 'actualización diaria de los datos, con controles de calidad automáticos']],
        quote: '', who: '', role: '', video: 0,
        ctaTitle: '¿Tu centro de salud necesita ordenar sus datos?', ctaLabel: 'Ver Data & Analytics', ctaHref: '#que-hacemos', ctaTarget: '_self', ctaClose: true, source: '', sourceLabel: '' }
    };
    const VIDEOS = [
      { client: 'Agencia San Luis · Enerflux', title: 'Laura Giumelli, coordinadora del Plan Maestro Energético', quote: 'Enerflux permite un seguimiento mucho más realista y en mucho menor tiempo de lo que hoy se hacía manualmente con una demora importante.', who: 'Laura Giumelli, coordinadora del Plan Maestro Energético', dur: 'YouTube', img: 'assets/img/img-b6558384.jpg', url: 'https://www.youtube.com/watch?v=VEU2vX7FyFc', bgClass: '' },
    ];
    const videos = VIDEOS.map((v, i) => {
      const on = st.video === i;
      return { ...v, hasImg: !!v.img, hasUrl: !!v.url, noUrl: !v.url, selected: on ? 'true' : 'false', pick: () => this.setState({ video: i }),
        rowStyle: 'display:flex;gap:16px;align-items:center;padding:12px;border-radius:18px;cursor:pointer;font-family:Rubik,sans-serif;width:100%;transition:background 250ms,border-color 250ms;' + (on ? 'background:rgba(51,204,153,0.12);border:1px solid rgba(51,204,153,0.6)' : 'background:transparent;border:1px solid rgba(255,255,255,0.08)') };
    });
    const cv = videos[st.video];
    const CASES = [
      { client: 'Enerflux · San Luis', geo: 'Argentina', kind: 'Energía · Plataforma de datos', cat: 'Energía', detail: 'sanluis', text: 'Plataforma que permite al ente regulador controlar la calidad del servicio eléctrico, con indicadores automáticos y reportes para auditar y tomar decisiones.', img: 'assets/img/plataforma-de-datos-de-san-luis.jpg', logo: 'assets/img/enerflux.png', video: true },
      { client: 'MIA World', geo: 'Italia', kind: 'Fintech · Loyalty', cat: 'Fidelización', detail: 'mia', text: 'Cashback, gift cards y descuentos B2B/B2C con web, app y red de comercios.', img: 'assets/img/sitio-web-de-mia-world.jpg', pos: 'center', logo: 'assets/img/mia-world.png', video: false },
      { client: 'Alohar', geo: 'Argentina', kind: 'Travel platform · Web/App', cat: 'Software', detail: 'alohar', text: 'Plataforma online de alquileres temporarios que compite con Airbnb en Latinoamérica. Solución llave en mano, de la arquitectura al lanzamiento.', img: 'assets/img/img-683ab532.jpg', pos: 'center', logo: 'assets/img/alohar.png', video: false },
      { client: 'Centro de Estudios Digestivos', geo: 'Argentina', kind: 'Salud · Transformación digital', cat: 'Transformación', detail: 'ced', text: 'CED Intelligence: conciliación automática de las prestaciones con PAMI. 95% menos de tiempo de control administrativo.', img: 'assets/img/img-2af032bc.jpg', pos: 'center', logo: 'assets/img/centro-de-estudios-digestivos.png', video: false },
      { client: 'ACF Fiorentina', geo: 'Italia', kind: 'Deporte · Loyalty', cat: 'Fidelización', detail: 'fiorentina', text: 'In Viola Card: primer programa de co-marketing de fidelización en el fútbol, con app para comercios.', img: 'assets/img/app-viola-de-acf-fiorentina.jpg', fit: 'contain', logo: 'assets/img/acf-fiorentina.png', video: false },
      { client: 'Fabiani Gioiellerie', geo: 'Italia', kind: 'Retail de lujo · App', cat: 'Fidelización', detail: 'fabiani', text: 'App de fidelización en React Native: puntos, tiendas y promociones, integrada con FidelyNET.', img: 'assets/img/app-fabiani.jpg', fit: 'contain', logo: 'assets/img/fabiani.png', video: false },
      { client: 'Gazeta Celesi', geo: 'Albania', kind: 'Digital advertising', cat: 'Software', detail: 'celesi', text: 'Reingeniería completa del portal de anuncios líder: negocio, imagen e infraestructura.', img: 'assets/img/img-91e2cb02.jpg', pos: 'center top', logo: 'assets/img/gazeta-celesi.png', video: false }
    ];
    const filters = ['Todos', 'Energía', 'Fidelización', 'Software', 'Transformación'].map((f) => {
      const on = st.filter === f;
      return { label: f, selected: on ? 'true' : 'false', pick: () => this.setState({ filter: f }),
        style: 'font:500 14px Rubik,sans-serif;border:none;border-radius:999px;padding:10px 18px;min-height:44px;cursor:pointer;transition:background 220ms,color 220ms;' + (on ? 'background:#081C15;color:#FFFFFF' : 'background:transparent;color:#081C15') };
    });
    const list = CASES.filter((c) => st.filter === 'Todos' || c.cat === st.filter);
    const shown = list.map((c, i) => {
      const k = list.length > 2 ? (3 - list.length % 3) % 3 : 0;
      const big = i < k;
      return { ...c, openCase: () => this.setState({ cs: c.detail }), hasImg: !!c.img, hasLogo: !!c.logo, imgStyle: 'width:100%;height:100%;display:block;' + (c.fit === 'contain' ? 'object-fit:contain;background:#FFFFFF;padding:16px 16px 56px' : 'object-fit:cover;object-position:' + (c.pos || 'center top')), ph: !c.img && !c.towers,
        cardStyle: 'background:#FFFFFF;border-radius:28px;overflow:hidden;display:flex;flex-direction:column;' + (big ? 'grid-column:span 2' : ''),
        imgBox: 'position:relative;overflow:hidden;background:#0F2A20;height:' + (big ? '360px' : '240px') };
    });
    const interests = ['Proyecto a medida', 'Enerflux', 'FidelyFlux', 'Otro'].map((l, i) => {
      const on = st.interest === i;
      return { label: l, selected: on ? 'true' : 'false', pick: () => this.setState({ interest: i }),
        style: 'font:500 14px Rubik,sans-serif;border-radius:999px;padding:10px 16px;min-height:44px;cursor:pointer;transition:background 200ms,color 200ms;' + (on ? 'background:#33CC99;color:#081C15;border:1px solid #33CC99' : 'background:transparent;color:#FFFFFF;border:1px solid rgba(255,255,255,0.3)') };
    });
    const open = st.menu;
    const bar = 'display:block;width:20px;height:2px;border-radius:2px;background:#FFFFFF;transition:transform 300ms,opacity 300ms;';
    const NAV = [['Qué hacemos','#que-hacemos'],['Productos','#productos'],['Videos','#videos'],['Casos','#casos'],['Equipo','#equipo'],['Contacto','#contacto']];
    const navItems = NAV.map((n, i) => ({ label: n[0], href: n[1], num: '0' + (i + 1), style: 'display:flex;justify-content:space-between;align-items:center;padding:16px 4px;border-bottom:1px solid rgba(255,255,255,0.08);color:#FFFFFF;text-decoration:none;font-family:Hanken Grotesk,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;animation-delay:' + (i * 45) + 'ms' }));
    const cpRaw = CASE_PAGES[st.cs] || CASE_PAGES.sanluis;
    const cp = { ...cpRaw,
      facts: cpRaw.facts.map((f) => ({ k: f[0], v: f[1] })),
      feats: cpRaw.feats.map((f, i) => ({ n: String(i + 1).padStart(2, '0'), t: f[0], d: f[1] })),
      stats: cpRaw.stats.map((x) => ({ n: x[0], t: x[1], box: cpRaw.ph ? 'border-top-style:dashed;opacity:.75' : '', numStyle: 'font-size:' + (x[0].length > 5 ? '38px' : '56px') + ';font-weight:600;line-height:1;color:' + (cpRaw.ph ? '#5E7A72' : '#FFFFFF') })),
      quoteStyle: 'margin:0;font-size:34px;font-weight:500;line-height:1.3;' + ((cpRaw.ph || cpRaw.quotePh) ? 'color:#5E7A72' : ''),
      hasSource: !!cpRaw.source, hasQuote: !!cpRaw.quote, hasCtx: !!cpRaw.phases, phases: (cpRaw.phases || []).map((x) => ({ tag: x[0], t: x[1], d: x[2], pStyle: 'margin:0;font-size:14px;line-height:1.6;color:' + (x[3] ? '#C9D2D0' : '#3D4847'), tagStyle: 'font-size:10px;color:' + (x[3] ? '#33CC99' : '#178F6B'), box: 'display:flex;flex-direction:column;gap:12px;padding:28px 26px;border-radius:0 28px 28px 28px;' + (x[3] ? 'background:#081C15;color:#FFFFFF' : 'background:#EEF2F4;color:#081C15') })), imgStyle: cpRaw.imgStyle || 'width:100%;height:auto;display:block',
      openVideo: () => this.setState({ lb: cpRaw.video }),
      ctaClick: () => { if (cpRaw.ctaClose) this.setState({ cs: null }); } };
    const pp = this.state.p;
    return { services, videos, cur: cv, filters, shown, interests,
      lbOpen: this.state.lb >= 0, lbVid: (() => { const v = VIDEOS[Math.max(0, this.state.lb)]; const id = (v.url.match(/v=([\w-]+)/) || [])[1]; return { ...v, hasEmbed: !!id, noEmbed: !id, embed: id ? 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1' : '' }; })(),
      openVideo: () => this.setState({ lb: this.state.video }), openSanLuis: () => this.setState({ lb: 0 }), closeVideo: () => this.setState({ lb: -1 }), hasMoreVideos: VIDEOS.length > 1, videoGridStyle: VIDEOS.length > 1 ? '' : 'grid-template-columns:minmax(0,1fr);max-width:1000px', caseOpen: !!this.state.cs, cp, openSanLuisCase: () => this.setState({ cs: 'sanluis' }), openFabianiCase: () => this.setState({ cs: 'fabiani' }), openMiaCase: () => this.setState({ cs: 'mia' }), openFiorentinaCase: () => this.setState({ cs: 'fiorentina' }), closeCase: () => this.setState({ cs: null }), stop: (e) => { if (e && e.stopPropagation) e.stopPropagation(); },
      n15: Math.round(15 * pp), n3: Math.round(3 * pp), n24: Math.round(24 * pp), setStats: (el) => { this.statsEl = el; },
      menuOpen: open, menuAttr: open ? 'true' : 'false', navItems,
      toggleMenu: () => this.setState({ menu: !this.state.menu }),
      closeMenu: () => this.setState({ menu: false }),
      bar1: bar + (open ? 'transform:translateY(8px) rotate(45deg)' : ''),
      bar2: bar + (open ? 'opacity:0' : ''),
      bar3: bar + (open ? 'transform:translateY(-8px) rotate(-45deg)' : ''),
      setHero: (el) => { this.hero = el; },
      heroMove: (e) => { const el = this.hero; if (!el) return; const r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); } };
  }
}
App.start();
document.querySelectorAll('form').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); const b = f.querySelector('[type=submit]'); if (b) { b.textContent = '¡Gracias! Te respondemos en menos de 24 h'; b.disabled = true; } }));
