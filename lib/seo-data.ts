export type City = {
  name: string;
  slug: string;
  department: string;
  isOfficeCity?: boolean;
};

export type SeoService = {
  slug: string;
  name: string;
  keyword: string;
  description: string;
  documents: string[];
  duration: string;
  waMessage: string;
};

export const CITIES: City[] = [
  { name: 'Yopal',                  slug: 'yopal',                  department: 'Casanare', isOfficeCity: true },
  { name: 'Aguazul',                slug: 'aguazul',                department: 'Casanare' },
  { name: 'Villanueva',             slug: 'villanueva',             department: 'Casanare' },
  { name: 'Paz de Ariporo',         slug: 'paz-de-ariporo',         department: 'Casanare' },
  { name: 'Tauramena',              slug: 'tauramena',              department: 'Casanare' },
  { name: 'Trinidad',               slug: 'trinidad',               department: 'Casanare' },
  { name: 'Monterrey',              slug: 'monterrey',              department: 'Casanare' },
  { name: 'Sabanalarga',            slug: 'sabanalarga',            department: 'Casanare' },
  { name: 'Nunchía',                slug: 'nunchia',                department: 'Casanare' },
  { name: 'Pore',                   slug: 'pore',                   department: 'Casanare' },
  { name: 'Orocué',                 slug: 'orocue',                 department: 'Casanare' },
  { name: 'San Luis de Palenque',   slug: 'san-luis-de-palenque',   department: 'Casanare' },
  { name: 'Hato Corozal',           slug: 'hato-corozal',           department: 'Casanare' },
  { name: 'Maní',                   slug: 'mani',                   department: 'Casanare' },
  { name: 'Recetor',                slug: 'recetor',                department: 'Casanare' },
  { name: 'Chámeza',                slug: 'chameza',                department: 'Casanare' },
  { name: 'La Salina',              slug: 'la-salina',              department: 'Casanare' },
  { name: 'Sácama',                 slug: 'sacama',                 department: 'Casanare' },
  { name: 'Támara',                 slug: 'tamara',                 department: 'Casanare' },
];

export const SEO_SERVICES: SeoService[] = [
  {
    slug:        'traspaso-propiedad',
    name:        'Traspaso de Propiedad',
    keyword:     'traspaso vehículo',
    description: 'Formaliza el cambio de propietario de tu vehículo. Revisamos el historial antes de empezar para evitar sorpresas.',
    documents:   ['SOAT vigente', 'Revisión técnico-mecánica vigente', 'Cédula del comprador y vendedor', 'Tarjeta de propiedad original', 'Certificado de tradición y libertad'],
    duration:    '3 a 8 días hábiles',
    waMessage:   'Hola, necesito cotizar un traspaso de propiedad.',
  },
  {
    slug:        'levantamiento-prenda',
    name:        'Levantamiento de Prenda',
    keyword:     'levantamiento prenda vehicular',
    description: 'Libera tu vehículo de gravámenes financieros una vez cancelado el crédito. Gestionamos el trámite ante el organismo de tránsito.',
    documents:   ['Carta de levantamiento del banco o entidad financiera', 'Tarjeta de propiedad original', 'Cédula del propietario'],
    duration:    '3 a 5 días hábiles',
    waMessage:   'Hola, necesito cotizar un levantamiento de prenda.',
  },
  {
    slug:        'traslado-cuenta',
    name:        'Traslado de Cuenta',
    keyword:     'traslado cuenta vehículo',
    description: 'Mueve el expediente de tu vehículo entre organismos de tránsito de cualquier ciudad de Colombia.',
    documents:   ['Tarjeta de propiedad original', 'SOAT vigente', 'Revisión técnico-mecánica vigente', 'Cédula del propietario'],
    duration:    '5 a 10 días hábiles',
    waMessage:   'Hola, necesito cotizar un traslado de cuenta.',
  },
  {
    slug:        'duplicado-placas',
    name:        'Duplicado de Placas',
    keyword:     'duplicado placas vehículo',
    description: 'Repón tus placas en caso de pérdida, robo o daño de forma ágil y sin complicaciones.',
    documents:   ['Denuncia policial (si aplica)', 'Tarjeta de propiedad original', 'SOAT vigente', 'Cédula del propietario'],
    duration:    '3 a 5 días hábiles',
    waMessage:   'Hola, necesito cotizar un duplicado de placas.',
  },
  {
    slug:        'cambio-servicio',
    name:        'Cambio de Servicio',
    keyword:     'cambio servicio vehículo',
    description: 'Cambia la naturaleza de tu vehículo entre particular y público de forma ágil.',
    documents:   ['Tarjeta de propiedad original', 'SOAT vigente', 'Revisión técnico-mecánica vigente', 'Cédula del propietario'],
    duration:    '5 a 10 días hábiles',
    waMessage:   'Hola, necesito cotizar un cambio de servicio.',
  },
  {
    slug:        'prescripcion-comparendos',
    name:        'Prescripción de Comparendos',
    keyword:     'prescripción comparendos tránsito',
    description: 'Las multas de más de 3 años pueden estar prescritas. Revisamos gratis y tramitamos la declaración para eliminarlas del sistema.',
    documents:   ['Número de cédula del titular', 'Placa del vehículo (si aplica)'],
    duration:    '5 a 15 días hábiles',
    waMessage:   'Hola, quiero verificar si tengo comparendos prescritos.',
  },
];
