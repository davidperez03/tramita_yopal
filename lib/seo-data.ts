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
    note: 'Municipio petrolero a unos 50 km de Yopal, con una flota vehicular importante por la actividad de la industria. Recibimos tus documentos por mensajería y gestionamos el trámite en el tránsito de Yopal — la tarjeta llega a tu puerta en Aguazul.',
  },
  {
    name: 'Villanueva', slug: 'villanueva', department: 'Casanare',
    note: 'Municipio del piedemonte casanareño a unos 70 km de Yopal. Atendemos cualquier trámite vehicular para propietarios en Villanueva sin importar dónde esté matriculado el vehículo — escríbenos y evaluamos tu caso.',
  },
  {
    name: 'Paz de Ariporo', slug: 'paz-de-ariporo', department: 'Casanare',
    note: 'Uno de los municipios más extensos de Casanare, al norte del departamento. La distancia no es problema: recibimos tus documentos por mensajería desde Paz de Ariporo y te enviamos la tarjeta de propiedad a tu dirección.',
  },
  {
    name: 'Tauramena', slug: 'tauramena', department: 'Casanare',
    note: 'Municipio petrolero a unos 100 km de Yopal. Gestionamos tu trámite vehicular en el tránsito de Yopal sin que tengas que desplazarte — todo por WhatsApp y mensajería.',
  },
  {
    name: 'Trinidad', slug: 'trinidad', department: 'Casanare',
    note: 'Municipio llanero en el oriente de Casanare. Para propietarios de vehículos en Trinidad, recibimos documentos por mensajería desde cualquier punto del departamento y gestionamos el proceso completo en Yopal.',
  },
  {
    name: 'Monterrey', slug: 'monterrey', department: 'Casanare',
    note: 'Municipio del piedemonte casanareño. Si compraste un vehículo en Monterrey y necesitas el traspaso, o tienes una prenda que levantar, lo gestionamos en el tránsito de Yopal y te enviamos la tarjeta a tu domicilio.',
  },
  {
    name: 'Sabanalarga', slug: 'sabanalarga', department: 'Casanare',
    note: 'Municipio de Casanare con vías de conexión hacia el piedemonte. Recibimos tus documentos por Interrapidísimo o Servientrega y tramitamos en Yopal sin que tengas que viajar.',
  },
  {
    name: 'Nunchía', slug: 'nunchia', department: 'Casanare',
    note: 'Municipio del piedemonte a unos 80 km de Yopal. Coordinamos todo por WhatsApp y gestionamos el trámite en ventanilla — solo envías los documentos y recibes la tarjeta de propiedad en Nunchía.',
  },
  {
    name: 'Pore', slug: 'pore', department: 'Casanare',
    note: 'Municipio histórico de Casanare, antigua capital de la provincia. Gestionamos tu trámite vehicular en el tránsito de Yopal y te enviamos la tarjeta a Pore sin costo adicional de envío.',
  },
  {
    name: 'Orocué', slug: 'orocue', department: 'Casanare',
    note: 'Puerto sobre el Río Meta en el oriente de Casanare. La lejanía no es un obstáculo: recibimos documentos por mensajería y gestionamos el trámite en Yopal, enviando la tarjeta de vuelta a Orocué.',
  },
  {
    name: 'San Luis de Palenque', slug: 'san-luis-de-palenque', department: 'Casanare',
    note: 'Municipio ganadero del oriente casanareño. Para propietarios con vehículos en San Luis de Palenque, gestionamos el trámite completo en Yopal y enviamos la tarjeta de propiedad a tu domicilio.',
  },
  {
    name: 'Hato Corozal', slug: 'hato-corozal', department: 'Casanare',
    note: 'Municipio del norte de Casanare, limítrofe con Arauca. Coordinamos el trámite por WhatsApp desde Hato Corozal — documentos por mensajería, gestión en Yopal, tarjeta a tu puerta.',
  },
  {
    name: 'Maní', slug: 'mani', department: 'Casanare',
    note: 'Municipio del centro-oriente de Casanare con importante actividad agropecuaria. Gestionamos tu trámite vehicular en el tránsito de Yopal y enviamos el resultado a Maní sin desplazamiento.',
  },
  {
    name: 'Recetor', slug: 'recetor', department: 'Casanare',
    note: 'Municipio del piedemonte casanareño. Recibimos tus documentos por mensajería desde Recetor y tramitamos en ventanilla en Yopal, ahorrándote el viaje hasta la capital del departamento.',
  },
  {
    name: 'Chámeza', slug: 'chameza', department: 'Casanare',
    note: 'Municipio del piedemonte con actividad petrolera. Coordinamos todo el proceso por WhatsApp desde Chámeza — documentos por mensajería, trámite en Yopal, tarjeta a tu domicilio.',
  },
  {
    name: 'La Salina', slug: 'la-salina', department: 'Casanare',
    note: 'Municipio en la zona andina de Casanare. Gestionamos tu trámite vehicular en el tránsito de Yopal y te enviamos la tarjeta a La Salina sin costo adicional de mensajería.',
  },
  {
    name: 'Sácama', slug: 'sacama', department: 'Casanare',
    note: 'Municipio del piedemonte casanareño. Para vehículos de propietarios en Sácama que necesitan tramitar en Yopal, recibimos los documentos por mensajería y gestionamos el proceso completo.',
  },
  {
    name: 'Támara', slug: 'tamara', department: 'Casanare',
    note: 'Municipio andino de Casanare con vías de acceso al piedemonte. Coordinamos tu trámite por WhatsApp — envías los documentos desde Támara y recibes la tarjeta de propiedad en tu puerta.',
  },
];

export const SEO_SERVICES: SeoService[] = [
  {
    slug:        'traspaso-propiedad',
    name:        'Traspaso de Propiedad',
    keyword:     'traspaso vehículo',
    description: 'Formaliza el cambio de propietario de tu vehículo. Revisamos el historial antes de empezar para evitar sorpresas.',
    duration:    '3 a 8 días hábiles',
    waMessage:   'Hola, necesito cotizar un traspaso de propiedad.',
  },
  {
    slug:        'levantamiento-prenda',
    name:        'Levantamiento de Prenda',
    keyword:     'levantamiento prenda vehicular',
    description: 'Libera tu vehículo de gravámenes financieros una vez cancelado el crédito. Gestionamos el trámite ante el organismo de tránsito.',
    duration:    '3 a 5 días hábiles',
    waMessage:   'Hola, necesito cotizar un levantamiento de prenda.',
  },
  {
    slug:        'traslado-cuenta',
    name:        'Traslado de Cuenta',
    keyword:     'traslado cuenta vehículo',
    description: 'Mueve el expediente de tu vehículo entre organismos de tránsito de cualquier ciudad de Colombia.',
    duration:    '5 a 10 días hábiles',
    waMessage:   'Hola, necesito cotizar un traslado de cuenta.',
  },
  {
    slug:        'duplicado-placas',
    name:        'Duplicado de Placas',
    keyword:     'duplicado placas vehículo',
    description: 'Repón tus placas en caso de pérdida, robo o daño de forma ágil y sin complicaciones.',
    duration:    '3 a 5 días hábiles',
    waMessage:   'Hola, necesito cotizar un duplicado de placas.',
  },
  {
    slug:        'cambio-servicio',
    name:        'Cambio de Servicio',
    keyword:     'cambio servicio vehículo',
    description: 'Cambia la naturaleza de tu vehículo entre particular y público de forma ágil.',
    duration:    '5 a 10 días hábiles',
    waMessage:   'Hola, necesito cotizar un cambio de servicio.',
  },
  {
    slug:        'prescripcion-comparendos',
    name:        'Prescripción de Comparendos',
    keyword:     'prescripción comparendos tránsito',
    description: 'Las multas de más de 3 años pueden estar prescritas. Revisamos gratis y tramitamos la declaración para eliminarlas del sistema.',
    duration:    '5 a 15 días hábiles',
    waMessage:   'Hola, quiero verificar si tengo comparendos prescritos.',
  },
];
