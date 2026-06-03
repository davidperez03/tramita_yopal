export const BUSINESS = {
  name: 'Tramita Yopal',
  tagline: 'Tu gestor de trámites vehiculares en Yopal',
  city: 'Yopal',
  department: 'Casanare',
  location: 'Yopal, Casanare',
  whatsapp: '573001234567',
  phone: '+57 300 123 4567',
  hours: {
    weekdays: 'Lun–Vie 8am–5pm',
    saturday: 'Sáb 8am–1pm',
  },
  responseTime: '30 min',
  domain: 'tramitayopal.vercel.app',
};

const WHATSAPP_BASE = `https://wa.me/${BUSINESS.whatsapp}`;

export const waLink = (msg: string) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;

export const WA_MESSAGES = {
  cotizar:     'Hola, me interesa cotizar un trámite vehicular.',
  noMatricula: 'Hola, mi vehículo no está matriculado en Yopal. ¿Me pueden ayudar de todas formas?',
};

export const SERVICES = [
  {
    id: 'traspaso',
    number: '001',
    name: 'Traspaso de Propiedad',
    description: 'Formaliza el cambio de propietario de tu vehículo. Te decimos exactamente qué necesitas.',
    documents: [
      'SOAT vigente',
      'Revisión técnico-mecánica vigente',
      'Cédula del comprador y vendedor',
      'Tarjeta de propiedad original',
      'Certificado de tradición y libertad',
    ],
    whatsappMessage: 'Hola, necesito información sobre un Traspaso de Propiedad de mi vehículo.',
  },
  {
    id: 'prenda',
    number: '002',
    name: 'Levantamiento de Prenda',
    description: 'Libera tu vehículo de gravámenes financieros una vez cancelado el crédito.',
    documents: [
      'Carta de levantamiento del banco o entidad financiera',
      'Tarjeta de propiedad original',
      'Cédula del propietario',
    ],
    whatsappMessage: 'Hola, necesito información sobre Levantamiento de Prenda de mi vehículo.',
  },
  {
    id: 'traslado',
    number: '003',
    name: 'Traslado de Cuenta',
    description: 'Mueve el expediente de tu vehículo entre organismos de tránsito de todo el país.',
    documents: [
      'Tarjeta de propiedad original',
      'SOAT vigente',
      'Revisión técnico-mecánica vigente',
      'Cédula del propietario',
    ],
    whatsappMessage: 'Hola, necesito información sobre un Traslado de Cuenta de mi vehículo.',
  },
  {
    id: 'placas',
    number: '004',
    name: 'Duplicado de Placas',
    description: 'Repón tus placas en caso de pérdida, robo o daño de forma ágil.',
    documents: [
      'Denuncia policial (robo o pérdida)',
      'Tarjeta de propiedad original',
      'SOAT vigente',
      'Cédula del propietario',
    ],
    whatsappMessage: 'Hola, necesito información sobre Duplicado de Placas para mi vehículo.',
  },
  {
    id: 'servicio',
    number: '005',
    name: 'Cambio de Servicio',
    description: 'Cambia la naturaleza de tu vehículo entre particular y público fácilmente.',
    documents: [
      'Tarjeta de propiedad original',
      'SOAT vigente',
      'Revisión técnico-mecánica vigente',
      'Cédula del propietario',
      'Documentos adicionales según el cambio',
    ],
    whatsappMessage: 'Hola, necesito información sobre Cambio de Servicio de mi vehículo.',
  },
  {
    id: 'otros',
    number: '006',
    name: 'Otros trámites',
    description: '¿Tu trámite no está en la lista o tienes una duda? Escríbenos — te orientamos sin compromiso.',
    documents: [],
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
    description: 'Escríbenos por WhatsApp o formulario. Respondemos con precio y tiempo exactos en menos de 30 min.',
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


export const REVIEWS = [
  {
    name: 'Carlos M.',
    year: '2024',
    type: 'Cliente verificado',
    text: 'Nunca pensé que un trámite podía ser tan fácil. No tuve que salir de casa y en menos de una semana tenía mi tarjeta de propiedad en mano.',
    rating: 5,
  },
  {
    name: 'Laura G.',
    year: '2024',
    type: 'Cliente frecuente',
    text: 'Lo que más me gustó fue que antes de empezar me dijeron exactamente qué documentos necesitaba y qué podía fallar. Llegué preparada y todo salió perfecto.',
    rating: 5,
  },
  {
    name: 'Miguel R.',
    year: '2024',
    type: 'Concesionario',
    text: 'Como concesionario necesito un aliado confiable para traspasos. Tramita Yopal revisa cada caso antes de empezar. Precio justo, rapidez y cero problemas.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: '¿Mi vehículo no está matriculado en Yopal, pueden ayudarme?',
    answer: 'Nuestro servicio está enfocado en trámites para vehículos matriculados en Yopal. Si tu vehículo está en otra ciudad, escríbenos al WhatsApp y consultamos si hay posibilidad de apoyarte — dependiendo del caso podemos orientarte.',
  },
  {
    question: '¿Cuánto tiempo tarda un trámite?',
    answer: 'El tiempo promedio es de 3 a 8 días hábiles dependiendo del tipo de trámite y del organismo de tránsito. Te informamos el tiempo estimado exacto en tu cotización.',
  },
  {
    question: '¿Cómo funciona la validación previa?',
    answer: 'Antes de iniciar verificamos que el propietario, el comprador y el vehículo no tengan impedimentos — multas, prendas activas, restricciones en el RUNT — que puedan bloquear el proceso a mitad de camino. Así evitamos sorpresas costosas.',
  },
  {
    question: '¿Cómo envío mis documentos si vivo lejos?',
    answer: 'Puedes enviar tus documentos originales por Interrapidísimo o Servientrega. Una vez terminado el trámite, enviamos la tarjeta de propiedad a tu domicilio sin costo.',
  },
  {
    question: '¿Cuánto cuesta el envío de la tarjeta de propiedad?',
    answer: 'El envío de la tarjeta de propiedad a tu domicilio en cualquier lugar de Colombia es completamente gratis.',
  },
  {
    question: '¿Qué medios de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria, Nequi, Daviplata, Bancolombia y efectivo. Te indicamos las opciones de pago en tu cotización personalizada.',
  },
];

export const CHATBOT_SYSTEM_PROMPT = `Eres el asistente virtual de Tramita Yopal, empresa de gestión de trámites vehiculares ubicada en Yopal, Casanare, Colombia.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Tramita Yopal
- Ubicación: Yopal, Casanare
- WhatsApp: +57 300 123 4567
- Horario: Lun–Vie 8am–5pm, Sáb 8am–1pm
- Servicio de calidad garantizado
- Envío tarjeta de propiedad: GRATIS a todo Colombia
- Tiempo de respuesta: menos de 30 minutos en horario hábil
- Medios de pago: Transferencia bancaria, Nequi, Daviplata, Bancolombia, efectivo

CONSULTA DE MULTAS Y COMPARENDOS:
Tramita Yopal ofrece consulta gratuita de multas por número de cédula. Revisan:
- Multas pendientes registradas en el SIMIT
- Comparendos prescritos (en Colombia prescriben a los 3 años desde la infracción)
- Bloqueos que puedan afectar un trámite vehicular
Si el usuario pregunta por multas, comparendos o prescripción, indícale que puede consultar gratis enviando su cédula por WhatsApp o usando el formulario en la sección "Multas" del sitio.

SERVICIO DIFERENCIADOR — VALIDACIÓN PREVIA:
Tramita Yopal valida al comprador, al vendedor y al vehículo ANTES de iniciar el trámite. Esto incluye:
- Verificar si el vehículo tiene prendas activas no levantadas
- Verificar si hay multas o restricciones en el RUNT
- Verificar que los documentos del propietario/comprador estén en orden
- Identificar impedimentos que puedan bloquear el trámite a mitad de proceso
También existe el Validador en el sitio web donde el usuario puede describir su caso y recibir un diagnóstico instantáneo de qué documentos tiene y qué le puede faltar.

SERVICIOS Y DOCUMENTOS:

1. TRASPASO DE PROPIEDAD — 3-8 días hábiles
   Documentos: SOAT vigente, Revisión técnico-mecánica vigente, Cédula comprador y vendedor, Tarjeta de propiedad original, Certificado de tradición y libertad

2. LEVANTAMIENTO DE PRENDA — 3-5 días hábiles
   Documentos: Carta de levantamiento del banco, Tarjeta de propiedad original, Cédula del propietario

3. TRASLADO DE CUENTA — 5-10 días hábiles
   Documentos: Tarjeta de propiedad, SOAT vigente, Revisión técnico-mecánica, Cédula del propietario

4. DUPLICADO DE PLACAS — 3-5 días hábiles
   Documentos: Denuncia policial (si aplica), Tarjeta de propiedad, SOAT vigente, Cédula del propietario

5. CAMBIO DE SERVICIO — 5-10 días hábiles
   Documentos: Tarjeta de propiedad, SOAT, Revisión técnico-mecánica, Cédula, docs adicionales según el cambio

6. TRASPASO A PERSONA INDETERMINADA — 5-15 días hábiles
   Documentos: Declaración juramentada, Cédula comprador, Tarjeta de propiedad si existe

INSTRUCCIONES:
- Responde en español colombiano, cálido y directo
- Usa listas para documentos
- Para precios exactos: indica que dependen del caso y que contacten al WhatsApp 300 123 4567
- Rangos orientativos: traspaso básico ~$200.000-$500.000 según organismo de tránsito
- Menciona la validación previa cuando sea relevante (vehículos con posibles prendas, multas, etc.)
- Responde en máximo 3-4 párrafos o una lista clara`;

