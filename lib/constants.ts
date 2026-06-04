export const BUSINESS = {
  name: 'Tramita Yopal',
  city: 'Yopal',
  department: 'Casanare',
  get location() { return `${this.city}, ${this.department}`; },
  whatsapp: '573137168735',
  phone: '+57 313 716 8735',
  address: 'Calle 18 #21-107, Yopal, Casanare',
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

export const SERVICES = [
  {
    id: 'traspaso',
    number: '001',
    name: 'Traspaso de Propiedad',
    description: 'Formaliza el cambio de propietario de tu vehículo. Te decimos exactamente qué necesitas.',
    duration: '1 a 2 días hábiles',
    whatsappMessage: 'Hola, necesito información sobre un Traspaso de Propiedad de mi vehículo.',
  },
  {
    id: 'prenda',
    number: '002',
    name: 'Levantamiento de Prenda',
    description: 'Libera tu vehículo de gravámenes financieros una vez cancelado el crédito.',
    duration: '1 a 2 días hábiles',
    whatsappMessage: 'Hola, necesito información sobre Levantamiento de Prenda de mi vehículo.',
  },
  {
    id: 'traslado',
    number: '003',
    name: 'Traslado de Cuenta',
    description: 'Mueve el expediente de tu vehículo entre organismos de tránsito de todo el país.',
    duration: '1 a 2 días hábiles',
    whatsappMessage: 'Hola, necesito información sobre un Traslado de Cuenta de mi vehículo.',
  },
  {
    id: 'placas',
    number: '004',
    name: 'Duplicado de Placas',
    description: 'Repón tus placas en caso de pérdida, robo o daño de forma ágil.',
    duration: '1 a 2 días hábiles',
    whatsappMessage: 'Hola, necesito información sobre Duplicado de Placas para mi vehículo.',
  },
  {
    id: 'servicio',
    number: '005',
    name: 'Cambio de Servicio',
    description: 'Cambia la naturaleza de tu vehículo entre particular y público fácilmente.',
    duration: '1 a 2 días hábiles',
    whatsappMessage: 'Hola, necesito información sobre Cambio de Servicio de mi vehículo.',
  },
  {
    id: 'prescripcion',
    number: '006',
    name: 'Prescripción de Comparendos',
    description: '¿Multas de más de 3 años? Pueden estar prescritas. Revisamos gratis y tramitamos la declaración.',
    duration: '15 a 30 días hábiles',
    whatsappMessage: 'Hola, quiero verificar si tengo comparendos prescritos.',
  },
  {
    id: 'otros',
    number: '007',
    name: 'Otros trámites',
    description: '¿Tu trámite no está en la lista o tienes una duda? Escríbenos — te orientamos sin compromiso.',
    duration: null,
    whatsappMessage: 'Hola, tengo una consulta sobre un trámite vehicular y quiero saber si me pueden ayudar.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Revisa tu caso',
    description: 'Escríbenos y cuéntanos tu caso. Revisamos el vehículo y te decimos qué documentos necesitas y si hay algo que resolver primero.',
    icon: '🔍',
  },
  {
    step: '02',
    title: 'Cotizamos gratis',
    description: `Escríbenos por WhatsApp o formulario. Respondemos con precio y tiempo exactos en menos de ${BUSINESS.responseTime}.`,
    icon: '📋',
  },
  {
    step: '03',
    title: 'Envías documentos',
    description: 'Remites los originales por Interrapidísimo o Servientrega. Nos encargamos de todo el proceso.',
    icon: '📦',
  },
  {
    step: '04',
    title: 'Recibes en casa',
    description: 'Te enviamos la tarjeta de propiedad directamente a tu puerta. Sin costo adicional.',
    icon: '🏠',
  },
];

// Se activa cuando haya reseñas reales de clientes
export const REVIEWS: { name: string; year: string; type: string; text: string; rating: number }[] = [];

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
    answer: 'Antes de iniciar verificamos que el propietario, el comprador y el vehículo no tengan impedimentos — multas, prendas activas, restricciones en el RUNT — que puedan bloquear el proceso a mitad de camino. Así evitamos sorpresas costosas. Esta revisión es completamente gratuita.',
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
    answer: 'Sí. Durante todo el proceso puedes escribirnos por el mismo WhatsApp donde iniciaste el trámite y te decimos en qué estado está. No necesitas llamar al tránsito ni hacer filas — nosotros hacemos ese seguimiento por ti y te mantenemos informado.',
  },
  {
    question: '¿Puedo hacer el trámite aunque el vendedor viva en otra ciudad?',
    answer: 'Sí. Es uno de los casos más comunes. Coordinamos con el vendedor qué documentos debe firmar y cómo enviarlos. Tú y el vendedor envían sus documentos por separado y nosotros gestionamos todo ante el tránsito de Yopal. No es necesario que estén presentes al mismo tiempo.',
  },
  {
    question: '¿Cuánto cuesta un traspaso de vehículo en Yopal?',
    answer: 'El costo depende del tipo de vehículo, el organismo de tránsito y si hay pasos adicionales como levantamiento de prenda o resolución de multas. Escríbenos con los datos del vehículo y te damos el precio exacto en menos de 30 minutos — sin rangos ni letras pequeñas.',
  },
];

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

SERVICIO DIFERENCIADOR — VALIDACIÓN PREVIA:
Tramita Yopal valida al comprador, al vendedor y al vehículo ANTES de iniciar el trámite:
- Prendas activas no levantadas
- Multas o restricciones en el RUNT
- Documentos del propietario/comprador en orden
- Impedimentos que puedan bloquear el trámite a mitad de proceso

SERVICIOS:
${SERVICES.filter(s => s.id !== 'otros').map(s => `- ${s.name}${s.duration ? ` — ${s.duration}` : ''}: ${s.description}`).join('\n')}

DOCUMENTOS REQUERIDOS POR TRÁMITE:

TRASPASO DE PROPIEDAD — documentos requeridos:
1. Formulario único de solicitud de trámites (lo provee el organismo de tránsito)
2. Documento de identidad del propietario (vendedor) y del comprador — originales
3. Contrato de compraventa o documento que soporte la transferencia de dominio
4. Contratos de mandato de ambas partes (vendedor y comprador)
5. Paz y salvo y liquidación de impuesto vehicular — obligatorio para vehículos de más de 125cc
6. Improntas de chasis y motor legibles
7. SOAT vigente — indispensable
8. Revisión técnico-mecánica (tecnomecánica) vigente
9. Sin multas pendientes por parte del vendedor ni del comprador
10. Todos los documentos sin tachones ni enmendaduras

NOTA GENERAL — SOAT: Es indispensable para TODOS los trámites sin excepción.

INSTRUCCIONES:
- Responde en español colombiano, cálido y directo
- Para precios: nunca dar valores — dependen del caso, remitir al WhatsApp ${BUSINESS.phone}
- Menciona la validación previa cuando sea relevante
- Responde en máximo 3-4 párrafos o una lista clara`;
