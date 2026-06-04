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
    note: 'Capital de Casanare y sede del organismo de tránsito donde operamos. Ciudad petrolera — hogar de los campos Cusiana y Cupiagua, los más grandes del país. Gestionamos tu trámite directamente en ventanilla, sin que tengas que hacer fila ni perder el día.',
  },
  {
    name: 'Aguazul', slug: 'aguazul', department: 'Casanare',
    note: 'Municipio sede del campo petrolero Cupiagua, uno de los de mayor producción en Colombia. Con una flota vehicular importante por la actividad industrial, atendemos propietarios en Aguazul — documentos por mensajería, trámite en Yopal, tarjeta a tu puerta.',
  },
  {
    name: 'Villanueva', slug: 'villanueva', department: 'Casanare',
    note: 'El municipio más joven de Casanare, erigido en 1982. Su economía gira en torno al cultivo de palma africana. Atendemos trámites vehiculares para propietarios en Villanueva sin importar dónde esté matriculado el vehículo.',
  },
  {
    name: 'Paz de Ariporo', slug: 'paz-de-ariporo', department: 'Casanare',
    note: 'Uno de los municipios más extensos de Colombia con cerca de 13.800 km², y el tercer municipio con mayor hato ganadero del país. Atendemos propietarios en Paz de Ariporo — recibimos documentos por mensajería y te enviamos la tarjeta a tu dirección.',
  },
  {
    name: 'Tauramena', slug: 'tauramena', department: 'Casanare',
    note: 'Municipio sede del campo Cusiana, uno de los mayores descubrimientos petroleros en la historia de Colombia. En 2013, sus ciudadanos votaron para proteger las zonas de recarga hídrica de la explotación. Gestionamos trámites vehiculares para propietarios en Tauramena — todo por WhatsApp y mensajería.',
  },
  {
    name: 'Trinidad', slug: 'trinidad', department: 'Casanare',
    note: 'Municipio llanero a orillas del río Pauto, con sabanas que se inundan estacionalmente y una vocación ganadera tradicional. Atendemos propietarios de vehículos en Trinidad — recibimos documentos por mensajería y tramitamos en Yopal.',
  },
  {
    name: 'Monterrey', slug: 'monterrey', department: 'Casanare',
    note: 'Municipio del piedemonte con altitudes entre 300 y 2.000 m, lo que le da diversidad de climas y cultivos: café, cacao, caña de azúcar y plátano. Gestionamos trámites vehiculares para propietarios en Monterrey y enviamos la tarjeta directamente a tu domicilio.',
  },
  {
    name: 'Sabanalarga', slug: 'sabanalarga', department: 'Casanare',
    note: 'Municipio fundado hacia 1890 por colonos boyacenses, enclavado en el piedemonte de la Cordillera Oriental. Su economía se basa en la citricultura y la ganadería. Atendemos propietarios en Sabanalarga — documentos por mensajería, trámite en Yopal.',
  },
  {
    name: 'Nunchía', slug: 'nunchia', department: 'Casanare',
    note: 'Municipio donde confluyen cuatro ríos: Tocaría, Payero, Nunchía y Pauto. Con más de 65.000 cabezas de ganado y 12.000 hectáreas de arroz cultivadas. Gestionamos trámites vehiculares para propietarios en Nunchía — solo envías los documentos y recibes la tarjeta en tu puerta.',
  },
  {
    name: 'Pore', slug: 'pore', department: 'Casanare',
    note: 'Fundado en 1644, Pore fue declarado Pueblo Patrimonio de Colombia en 2021. Aquí se unieron Bolívar y Santander antes de la Batalla de Boyacá en 1819. Atendemos propietarios de vehículos en Pore — tramitamos en Yopal y enviamos la tarjeta a tu domicilio.',
  },
  {
    name: 'Orocué', slug: 'orocue', department: 'Casanare',
    note: 'Municipio a orillas del río Meta, nominado por Colombia ante la ONU Turismo como "Mejor Aldea Turística". Combina ganadería, palma de aceite y pesca. Atendemos propietarios en Orocué — recibimos documentos por mensajería y la tarjeta llega a tu puerta.',
  },
  {
    name: 'San Luis de Palenque', slug: 'san-luis-de-palenque', department: 'Casanare',
    note: 'Municipio llanero de 3.052 km² con vocación ganadera extensiva, considerado apto para certificación de carne orgánica. Gestionamos trámites vehiculares para propietarios en San Luis de Palenque — proceso completo en Yopal, tarjeta enviada a tu domicilio.',
  },
  {
    name: 'Hato Corozal', slug: 'hato-corozal', department: 'Casanare',
    note: 'Municipio de las llanuras inundables del norte de Casanare, en las riberas de los ríos Chire, Aricaporo y Casanare. Economía basada casi exclusivamente en la ganadería extensiva. Atendemos propietarios en Hato Corozal — documentos por mensajería, tarjeta a tu puerta.',
  },
  {
    name: 'Maní', slug: 'mani', department: 'Casanare',
    note: 'Fundado por los jesuitas en 1685 y reconocido como la capital turística de Casanare. Su economía combina ganadería, arroz y palma de aceite. Gestionamos trámites vehiculares para propietarios en Maní — sin necesidad de desplazarse a Yopal.',
  },
  {
    name: 'Recetor', slug: 'recetor', department: 'Casanare',
    note: 'Municipio fundado en 1740 por misioneros jesuitas, conocido por sus antiguos depósitos de sal. Con cerca de 1.400 habitantes, ganó el Premio Nacional de Superación de la Pobreza por sus modelos productivos comunitarios. Atendemos propietarios en Recetor — tramitamos en Yopal y la tarjeta llega a tu domicilio.',
  },
  {
    name: 'Chámeza', slug: 'chameza', department: 'Casanare',
    note: 'El municipio más antiguo de Casanare, fundado en 1538, ubicado a 1.100 m sobre el nivel del mar en el piedemonte de la Cordillera Oriental. Desarrolla el aviturismo como motor económico. Gestionamos trámites vehiculares para propietarios en Chámeza — documentos por mensajería, tarjeta a tu domicilio.',
  },
  {
    name: 'La Salina', slug: 'la-salina', department: 'Casanare',
    note: 'Fundado hacia 1527, La Salina debe su nombre a la producción artesanal de sal que se practica desde tiempos indígenas en aproximadamente veinte hornos tradicionales. Altitudes entre 1.100 y 4.200 m. Atendemos propietarios en La Salina — tramitamos en Yopal y enviamos la tarjeta sin costo adicional.',
  },
  {
    name: 'Sácama', slug: 'sacama', department: 'Casanare',
    note: 'Municipio andino con presencia del Resguardo Indígena U\'wa de Barronegro, de ancestral tradición en la región. Su economía es agrícola y cuenta con reservas de carbón y sal aún sin explotar. Gestionamos trámites vehiculares para propietarios en Sácama — proceso completo en Yopal.',
  },
  {
    name: 'Támara', slug: 'tamara', department: 'Casanare',
    note: 'Fundado en 1628 y declarado Patrimonio Histórico Cultural y Arquitectónico de Casanare. A 1.156 m sobre el nivel del mar, el café es su cultivo principal desde tiempos coloniales. Atendemos propietarios en Támara — envías los documentos y recibes la tarjeta directamente en tu puerta.',
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
