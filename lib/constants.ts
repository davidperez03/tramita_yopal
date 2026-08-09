import { SEO_SERVICES } from './seo-data';

export const BUSINESS = {
  name: 'Tramita Yopal',
  city: 'Yopal',
  department: 'Casanare',
  get location() { return `${this.city}, ${this.department}`; },
  whatsapp: '573137168735',
  phone: '+57 313 716 8735',
  streetAddress: 'Calle 18 #21-107',
  get address() { return `${this.streetAddress}, ${this.city}, ${this.department}`; },
  email: 'info@tramitayopal.com',
  hours: {
    weekdays: 'Lun–Vie 8am–5pm',
    saturday: 'Sáb 8am–1pm',
    get full() { return `${this.weekdays} · ${this.saturday}`; },
  },
  responseTime: '30 min',
  domain: 'tramitayopal.com',
};

const WHATSAPP_BASE = `https://wa.me/${BUSINESS.whatsapp}`;

export const waLink = (msg: string) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;

export const WA_MESSAGES = {
  cotizar:     'Hola, me interesa cotizar un trámite vehicular.',
  noMatricula: 'Hola, mi vehículo no está matriculado en Yopal. ¿Pueden ayudarme?',
};

// Catálogo público — DERIVADO del catálogo único en lib/seo-data.ts.
// Para agregar o editar trámites, hazlo allá (ver instructivo encima de
// SEO_SERVICES). Aquí solo vive la entrada especial "Otros trámites".
export const SERVICES = [
  ...SEO_SERVICES.map((s, i) => ({
    id:              s.slug,
    number:          String(i + 1).padStart(3, '0'),
    name:            s.name,
    description:     s.description,
    duration:        s.duration as string | null,
    whatsappMessage: s.waMessage,
  })),
  {
    id: 'otros',
    number: String(SEO_SERVICES.length + 1).padStart(3, '0'),
    name: 'Otros trámites',
    description: '¿Tu trámite no está en la lista o tienes una duda? Escríbenos — te orientamos sin compromiso.',
    duration: null as string | null,
    whatsappMessage: 'Hola, tengo una consulta sobre un trámite vehicular y quiero saber si me pueden ayudar.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Revisa tu caso',
    description: 'Escríbenos y cuéntanos tu caso. Revisamos el vehículo y te decimos qué documentos necesitas y si hay algo que resolver primero.',
  },
  {
    step: '02',
    title: 'Cotizamos gratis',
    description: `Respondemos con precio y tiempo exactos en menos de ${BUSINESS.responseTime}. Aprobada la cotización, pagas el 50% para iniciar. Antes de eso no cobramos nada.`,
  },
  {
    step: '03',
    title: 'Envías documentos',
    description: 'Remites los originales por Interrapidísimo o Servientrega. Nos encargamos de todo el proceso en ventanilla y te entregamos un código para seguir tu trámite en línea.',
  },
  {
    step: '04',
    title: 'Pagas y recibes',
    description: 'Una vez que el tránsito aprueba tu trámite, pagas el 50% restante. Luego enviamos la tarjeta a tu puerta sin costo adicional.',
  },
];


export const FAQS = [
  {
    question: '¿Mi vehículo no está matriculado en Yopal, pueden ayudarme?',
    answer: 'Cuéntanos tu caso por WhatsApp. Revisamos la situación y te decimos si podemos gestionarlo — sin compromiso y sin costo.',
  },
  {
    question: '¿Cuánto tiempo tarda un traspaso de vehículo en Yopal?',
    answer: 'Una vez recibidos los documentos en orden, el traspaso puede quedar listo el mismo día — en la mayoría de los casos toma 1 a 2 días hábiles. El tiempo puede extenderse si hay inconsistencias o situaciones imprevistas, pero te informamos el estado en todo momento por WhatsApp.',
  },
  {
    question: '¿Cómo funciona la validación previa?',
    answer: 'Antes de iniciar verificamos el vehículo en el RUNT (prendas activas, restricciones) y el estado de propietario y comprador en el SIMIT (multas a su nombre) — cualquier impedimento que pueda bloquear el proceso a mitad de camino. Un vehículo puede tener multas en su historial sin que eso bloquee el trámite, siempre que no estén a nombre de quien compra o vende. Así evitamos sorpresas costosas. Esta revisión es completamente gratuita.',
  },
  {
    question: '¿Cómo envío mis documentos si vivo lejos?',
    answer: 'Puedes enviar tus documentos originales por Interrapidísimo o Servientrega a nuestra dirección en Yopal. Una vez terminado el trámite, enviamos la tarjeta de propiedad directamente a tu domicilio en cualquier municipio de Colombia — sin costo adicional.',
  },
  {
    question: '¿Qué documentos necesito para mi trámite?',
    answer: 'Depende del tipo de trámite y del historial del vehículo. Escríbenos por WhatsApp con los datos de tu caso y te decimos exactamente qué necesitas — sin que tengas que adivinar ni llegar con documentos de más o de menos.',
  },
  {
    question: '¿Qué medios de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria, Nequi, Daviplata, Bancolombia y efectivo. No cobramos comisiones adicionales por el medio de pago que elijas. Te indicamos las opciones en tu cotización personalizada.',
  },
  {
    question: '¿Cómo sé si mis comparendos de tránsito están prescritos?',
    answer: 'En Colombia, los comparendos prescriben a los 3 años desde la fecha de la infracción, si no han sido notificados ni cobrados en ese tiempo. Si tienes multas de antes de 2022, es probable que estén prescritas. Envíanos tu número de cédula por WhatsApp y consultamos gratis en el SIMIT qué comparendos tienes y cuáles pueden estar prescritos.',
  },
  {
    question: '¿El servicio sirve para motos o solo para carros?',
    answer: 'Tramita Yopal gestiona trámites para todo tipo de vehículos automotores matriculados en el organismo de tránsito de Yopal: automóviles, motos, camperos, camionetas, camiones y microbuses. Si tienes duda sobre si tu vehículo aplica, escríbenos por WhatsApp y te confirmamos en minutos.',
  },
  {
    question: '¿Puedo hacer seguimiento a mi trámite mientras está en proceso?',
    answer: 'Sí, en tiempo real y sin preguntar. Al iniciar tu trámite te entregamos un código de seguimiento único: lo ingresas en tramitayopal.com/seguimiento y ves el estado, el historial de avances y las fechas de cada etapa, a cualquier hora. Además te avisamos por WhatsApp cada vez que tu trámite cambia de estado. Ningún otro tramitador de la región te ofrece eso.',
  },
  {
    question: '¿Puedo hacer el trámite aunque el vendedor viva en otra ciudad?',
    answer: 'Sí. Es uno de los casos más comunes. Coordinamos con el vendedor qué documentos debe firmar y cómo enviarlos. Tú y el vendedor envían sus documentos por separado y nosotros gestionamos todo ante el tránsito de Yopal. No es necesario que estén presentes al mismo tiempo.',
  },
  {
    question: '¿Cuánto debo pagar por adelantado?',
    answer: 'El 50% del total al iniciar — eso incluye honorarios y derechos de trámite (RUNT y organismo de tránsito). El 50% restante lo pagas cuando el tránsito aprueba y expide tu documento. Nunca cobramos el total por adelantado. La única excepción es el avalúo vehicular en trámites de Traspaso: ese valor (1% de la base según el cilindraje del vehículo) se paga completo al iniciar porque así lo exige el organismo de tránsito.',
  },
  {
    question: '¿Cuánto cuesta un traspaso de vehículo en Yopal?',
    answer: 'El costo total tiene dos partes: (1) honorarios más derechos de trámite (RUNT y organismo de tránsito), que se dividen en 50% al iniciar y 50% al aprobar; y (2) el avalúo vehicular (1%), que se paga completo al iniciar y va directo al organismo de tránsito — la base cambia según el cilindraje: avalúo de liquidación de impuestos si supera 125 cc, o valor del contrato de compraventa si es de 125 cc o menos. Escríbenos con los datos del vehículo y te damos el desglose exacto en menos de 30 minutos.',
  },
];

export const SERVICE_NAMES = SERVICES.filter(s => s.id !== 'otros').map(s => s.name);
export const SERVICE_NAMES_WITH_OTHER = [...SERVICE_NAMES, 'Otro'];

export const CHATBOT_SYSTEM_PROMPT = `Eres el asistente virtual de Tramita Yopal, empresa de gestión de trámites vehiculares ubicada en Yopal, Casanare, Colombia.

INFORMACIÓN DE LA EMPRESA:
- Nombre: ${BUSINESS.name}
- Ubicación: ${BUSINESS.address}
- WhatsApp: ${BUSINESS.phone}
- Horario: ${BUSINESS.hours.weekdays}, ${BUSINESS.hours.saturday}
- Envío tarjeta de propiedad: GRATIS a todo Colombia
- Tiempo de respuesta: menos de ${BUSINESS.responseTime} en horario hábil
- Medios de pago: Transferencia bancaria, Nequi, Daviplata, Bancolombia, efectivo

CONSULTA DE MULTAS Y COMPARENDOS:
Tramita Yopal ofrece consulta gratuita de multas por número de cédula. Revisan:
- Multas pendientes registradas en el SIMIT
- Comparendos prescritos (en Colombia prescriben a los 3 años desde la infracción)
- Bloqueos que puedan afectar un trámite vehicular

SEGUIMIENTO EN LÍNEA (DIFERENCIADOR):
Cada trámite recibe un código de seguimiento único de 8 caracteres. El cliente lo ingresa
en https://tramitayopal.com/seguimiento y ve el estado actual, el historial de avances y
las fechas, a cualquier hora. Además recibe notificaciones por WhatsApp en cada cambio de
estado. Si un cliente pregunta "¿en qué va mi trámite?", indícale usar su código en esa
página, o escribir al WhatsApp ${BUSINESS.phone} si no lo tiene.

SERVICIO DIFERENCIADOR — VALIDACIÓN PREVIA:
Tramita Yopal valida al comprador, al vendedor y al vehículo ANTES de iniciar el trámite:
- Vehículo (RUNT): prendas activas no levantadas, embargos, restricciones
- Comprador y vendedor (SIMIT): multas pendientes a su nombre
- IMPORTANTE: las multas se registran a la PERSONA, no al vehículo — un carro puede tener comparendos en su historial y aun así hacerse el traspaso, siempre que esas multas no estén a nombre del comprador ni del vendedor. Lo único que bloquea siempre por el lado del vehículo es una prenda vigente.
- Documentos del propietario/comprador en orden

SERVICIOS:
${SERVICES.filter(s => s.id !== 'otros').map(s => `- ${s.name}${s.duration ? ` — ${s.duration}` : ''}: ${s.description}`).join('\n')}

DOCUMENTOS Y REQUISITOS POR TRÁMITE (misma lista oficial del sitio web — cítala tal cual):

${SEO_SERVICES.map(s =>
  `${s.name.toUpperCase()} — requisitos:\n${s.requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
).join('\n\n')}

NOTA GENERAL — SOAT: Es indispensable para TODOS los trámites sin excepción.
NOTA GENERAL — Todos los documentos deben ir sin tachones ni enmendaduras.

POLÍTICA DE COBRO (MUY IMPORTANTE):
- Se cobra en DOS etapas: 50% al aprobar la cotización e iniciar el trámite, 50% restante una vez que el tránsito aprueba y expide el documento
- El 50/50 aplica sobre el TOTAL: honorarios de Tramita Yopal + derechos de trámite (RUNT y organismo de tránsito)
- NUNCA se cobra el total por adelantado
- Si el trámite no puede completarse, se avisa de inmediato y se acuerdan los pasos con el cliente

AVALÚO EN TRASPASO DE PROPIEDAD (ÚNICA EXCEPCIÓN AL 50/50):
- En los trámites de Traspaso, el organismo de tránsito exige el pago del avalúo vehicular
- El avalúo equivale al 1% del valor comercial del vehículo y debe pagarse en su TOTALIDAD al iniciar el trámite
- Es el ÚNICO cobro que no va en el 50/50 — todo lo demás (honorarios + derechos de trámite) sí se divide

INSTRUCCIONES:
- Responde en español colombiano, cálido y directo
- Para precios: nunca dar valores — dependen del caso, remitir al WhatsApp ${BUSINESS.phone}
- Menciona la validación previa cuando sea relevante
- Menciona la política de cobro 50/50 cuando pregunten por pagos o costos
- Responde en máximo 3-4 párrafos o una lista clara`;
