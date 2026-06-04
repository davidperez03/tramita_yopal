export type City = {
  name: string;
  slug: string;
  department: string;
  note: string;
  isOfficeCity?: boolean;
};

export type SeoService = {
  slug: string;
  name: string;
  keyword: string;
  description: string;
  duration: string;
  waMessage: string;
};

export const CITIES: City[] = [
  {
    name: 'Yopal', slug: 'yopal', department: 'Casanare', isOfficeCity: true,
    note: 'Capital de Casanare y sede del organismo de tránsito donde operamos. Gestionamos tu trámite directamente en ventanilla, sin que tengas que hacer fila ni perder el día.',
  },
  {
    name: 'Aguazul', slug: 'aguazul', department: 'Casanare',
    note: 'Atendemos propietarios de vehículos en Aguazul. Envías los documentos por mensajería, tramitamos en el tránsito de Yopal y te enviamos la tarjeta de propiedad a tu puerta en Aguazul.',
  },
  {
    name: 'Villanueva', slug: 'villanueva', department: 'Casanare',
    note: 'Atendemos trámites vehiculares para propietarios en Villanueva sin importar dónde esté matriculado el vehículo. Cuéntanos tu caso y evaluamos cómo ayudarte.',
  },
  {
    name: 'Paz de Ariporo', slug: 'paz-de-ariporo', department: 'Casanare',
    note: 'Atendemos propietarios en Paz de Ariporo. Recibimos tus documentos por mensajería y te enviamos la tarjeta de propiedad a tu dirección — sin que tengas que viajar a Yopal.',
  },
  {
    name: 'Tauramena', slug: 'tauramena', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en Tauramena. Todo por WhatsApp y mensajería — sin desplazamientos.',
  },
  {
    name: 'Trinidad', slug: 'trinidad', department: 'Casanare',
    note: 'Atendemos propietarios de vehículos en Trinidad, Casanare. Recibimos documentos por mensajería y gestionamos el proceso completo en Yopal.',
  },
  {
    name: 'Monterrey', slug: 'monterrey', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en Monterrey. Enviamos la tarjeta de propiedad directamente a tu domicilio sin costo adicional.',
  },
  {
    name: 'Sabanalarga', slug: 'sabanalarga', department: 'Casanare',
    note: 'Atendemos propietarios en Sabanalarga, Casanare. Recibimos tus documentos por Interrapidísimo o Servientrega y tramitamos en Yopal.',
  },
  {
    name: 'Nunchía', slug: 'nunchia', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en Nunchía. Solo envías los documentos y recibes la tarjeta de propiedad en tu puerta.',
  },
  {
    name: 'Pore', slug: 'pore', department: 'Casanare',
    note: 'Atendemos propietarios de vehículos en Pore, Casanare. Tramitamos en el tránsito de Yopal y enviamos la tarjeta a tu domicilio sin costo.',
  },
  {
    name: 'Orocué', slug: 'orocue', department: 'Casanare',
    note: 'Atendemos propietarios en Orocué, Casanare. Recibimos documentos por mensajería y gestionamos el trámite en Yopal — la tarjeta llega a tu puerta.',
  },
  {
    name: 'San Luis de Palenque', slug: 'san-luis-de-palenque', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en San Luis de Palenque. Proceso completo en Yopal, tarjeta de propiedad enviada a tu domicilio.',
  },
  {
    name: 'Hato Corozal', slug: 'hato-corozal', department: 'Casanare',
    note: 'Atendemos propietarios en Hato Corozal, Casanare. Coordinamos por WhatsApp — documentos por mensajería, gestión en Yopal, tarjeta a tu puerta.',
  },
  {
    name: 'Maní', slug: 'mani', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en Maní, Casanare. Todo el proceso en Yopal sin que tengas que desplazarte.',
  },
  {
    name: 'Recetor', slug: 'recetor', department: 'Casanare',
    note: 'Atendemos propietarios en Recetor, Casanare. Recibimos tus documentos por mensajería y tramitamos en ventanilla en Yopal.',
  },
  {
    name: 'Chámeza', slug: 'chameza', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en Chámeza, Casanare. Documentos por mensajería, trámite en Yopal, tarjeta a tu domicilio.',
  },
  {
    name: 'La Salina', slug: 'la-salina', department: 'Casanare',
    note: 'Atendemos propietarios en La Salina, Casanare. Gestionamos tu trámite vehicular en el tránsito de Yopal y te enviamos la tarjeta sin costo adicional.',
  },
  {
    name: 'Sácama', slug: 'sacama', department: 'Casanare',
    note: 'Gestionamos trámites vehiculares para propietarios en Sácama, Casanare. Recibimos los documentos por mensajería y gestionamos el proceso completo en Yopal.',
  },
  {
    name: 'Támara', slug: 'tamara', department: 'Casanare',
    note: 'Atendemos propietarios en Támara, Casanare. Envías los documentos por mensajería y recibes la tarjeta de propiedad directamente en tu puerta.',
  },
];

export const SEO_SERVICES: SeoService[] = [
  {
    slug:        'traspaso-propiedad',
    name:        'Traspaso de Propiedad',
    keyword:     'traspaso vehículo',
    description: 'Formaliza el cambio de propietario de tu vehículo. Revisamos el historial antes de empezar para evitar sorpresas.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un traspaso de propiedad.',
  },
  {
    slug:        'levantamiento-prenda',
    name:        'Levantamiento de Prenda',
    keyword:     'levantamiento prenda vehicular',
    description: 'Libera tu vehículo de gravámenes financieros una vez cancelado el crédito. Gestionamos el trámite ante el organismo de tránsito.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un levantamiento de prenda.',
  },
  {
    slug:        'traslado-cuenta',
    name:        'Traslado de Cuenta',
    keyword:     'traslado cuenta vehículo',
    description: 'Mueve el expediente de tu vehículo entre organismos de tránsito de cualquier ciudad de Colombia.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un traslado de cuenta.',
  },
  {
    slug:        'duplicado-placas',
    name:        'Duplicado de Placas',
    keyword:     'duplicado placas vehículo',
    description: 'Repón tus placas en caso de pérdida, robo o daño de forma ágil y sin complicaciones.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un duplicado de placas.',
  },
  {
    slug:        'cambio-servicio',
    name:        'Cambio de Servicio',
    keyword:     'cambio servicio vehículo',
    description: 'Cambia la naturaleza de tu vehículo entre particular y público de forma ágil.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un cambio de servicio.',
  },
  {
    slug:        'prescripcion-comparendos',
    name:        'Prescripción de Comparendos',
    keyword:     'prescripción comparendos tránsito',
    description: 'Las multas de más de 3 años pueden estar prescritas. Revisamos gratis y tramitamos la declaración para eliminarlas del sistema.',
    duration:    '15 a 30 días hábiles',
    waMessage:   'Hola, quiero verificar si tengo comparendos prescritos.',
  },
];
