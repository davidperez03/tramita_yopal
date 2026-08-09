export type City = {
  name: string;
  slug: string;
  department: string;
  note: string;
  isOfficeCity?: boolean;
};

export type ServiceFaq = { q: string; a: string };

export type SeoService = {
  slug: string;
  name: string;
  keyword: string;
  description: string;
  duration: string;
  waMessage: string;
  requisitos: string[];
  pasos: string[];
  faqs: ServiceFaq[];
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

// ══════════════════════════════════════════════════════════════
// CATÁLOGO ÚNICO DE TRÁMITES — única fuente de verdad.
//
// Para AGREGAR UN TRÁMITE nuevo basta con añadir una entrada aquí
// (slug único, name, keyword, description, duration, waMessage,
// requisitos, pasos y faqs). De esta lista se generan solas:
//  - Las tarjetas de la home y los enlaces del footer
//  - Las páginas /tramites/[slug]/[ciudad] (una por municipio) y el sitemap
//  - Los requisitos, pasos y FAQs de esas páginas (+ FAQPage para Google)
//  - Lo que sabe el chatbot (servicios y requisitos)
//  - Las opciones del formulario "Nuevo trámite" del panel admin
//
// Para ACTUALIZAR REQUISITOS: edita solo el arreglo `requisitos` del
// trámite — se refleja en páginas, chatbot y guías al desplegar.
// ══════════════════════════════════════════════════════════════
export const SEO_SERVICES: SeoService[] = [
  {
    slug:        'traspaso-propiedad',
    name:        'Traspaso de Propiedad',
    keyword:     'traspaso vehículo',
    description: 'Formaliza el cambio de propietario de tu vehículo. Revisamos el historial antes de empezar para evitar sorpresas.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un traspaso de propiedad.',
    requisitos: [
      'Documentos de identidad de comprador y vendedor (copias legibles por ambas caras)',
      'Contrato de compraventa del vehículo',
      'Contrato de mandato de comprador y vendedor (original y autenticado)',
      'SOAT vigente y revisión técnico-mecánica vigente (si el vehículo ya la requiere)',
      'Paz y salvo de multas en el SIMIT de comprador y vendedor',
      'Improntas del vehículo',
      'Paz y salvo de impuesto vehicular (si aplica)'
    ],
    pasos: [
      'Validación previa gratuita: revisamos el vehículo en el RUNT (prendas, embargos) y el estado de vendedor y comprador en el SIMIT (multas a su nombre) — cualquier bloqueo te lo explicamos antes de cobrar.',
      'Recibes la cotización cerrada por WhatsApp: honorarios + derechos del organismo de tránsito, sin sorpresas.',
      'Nos haces llegar los documentos en nuestra oficina en Yopal o por mensajería desde tu municipio.',
      'Liquidamos y pagamos los derechos, radicamos el trámite en el organismo de tránsito y te vamos informando cada avance.',
      'Recibes la nueva tarjeta de propiedad a domicilio, con envío gratis.',
    ],
    faqs: [
      {
        q: '¿Comprador y vendedor tienen que ir al organismo de tránsito?',
        a: 'No. Con los documentos firmados y autenticados nosotros gestionamos todo en ventanilla. Tú solo envías los papeles y recibes la tarjeta nueva en tu casa.',
      },
      {
        q: '¿Qué pasa si compro un vehículo y no hago el traspaso?',
        a: 'El vehículo sigue a nombre del vendedor: sus multas y responsabilidades te pueden afectar y tú no puedes demostrar propiedad plena. Un "traspaso abierto" también expone al vendedor a comparendos y responsabilidad civil por un carro que ya no usa. Es el trámite más importante después de comprar.',
      },
      {
        q: '¿Cuánto cuesta un traspaso?',
        a: 'Depende del avalúo del vehículo y del organismo de tránsito. La base del 1% de retención en la fuente cambia según el cilindraje: sobre el avalúo de la liquidación de impuestos si supera 125 cc, o sobre el valor del contrato de compraventa si es de 125 cc o menos. Por eso hacemos la validación previa gratis: te damos una cotización cerrada antes de que pagues un peso.',
      },
      {
        q: '¿El vehículo puede tener multas y aun así hacer el traspaso?',
        a: 'Sí. Las multas de tránsito se registran a nombre de la persona, no del vehículo — un carro puede tener comparendos en su historial y seguir habilitado para traspaso, siempre que esas multas no estén a nombre del comprador ni del vendedor. Lo que sí bloquea el trámite es una prenda vigente sobre el vehículo; si existe, primero hay que levantarla.',
      },
    ],
  },
  {
    slug:        'levantamiento-prenda',
    name:        'Levantamiento de Prenda',
    keyword:     'levantamiento prenda vehicular',
    description: 'Libera tu vehículo de gravámenes financieros una vez cancelado el crédito. Gestionamos el trámite ante el organismo de tránsito.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un levantamiento de prenda.',
    requisitos: [
      'Carta de levantamiento de prenda emitida por el banco o entidad financiera (paz y salvo del crédito)',
      'Cédula del propietario (copia legible por ambas caras)',
      'Tarjeta de propiedad (licencia de tránsito) original',
      'Paz y salvo de multas en el SIMIT',
    ],
    pasos: [
      'Verificamos en el RUNT que la prenda esté registrada y a favor de qué entidad.',
      'Revisamos que la carta del banco cumpla los requisitos del organismo de tránsito (es el error más común).',
      'Recibimos tus documentos en oficina o por mensajería.',
      'Radicamos el levantamiento ante el organismo de tránsito y pagamos los derechos.',
      'Te confirmamos cuando el vehículo queda libre de gravamen en el RUNT y te enviamos el soporte.',
    ],
    faqs: [
      {
        q: '¿Qué es la prenda y por qué debo levantarla?',
        a: 'Es el gravamen que el banco inscribe sobre tu vehículo como garantía del crédito. Aunque termines de pagar, la prenda no desaparece sola: hay que tramitar el levantamiento. Mientras exista, no puedes vender ni traspasar el vehículo.',
      },
      {
        q: 'Ya pagué el crédito, ¿el banco no hace el levantamiento automáticamente?',
        a: 'No. El banco te entrega la carta de levantamiento, pero el registro ante el organismo de tránsito y el RUNT es responsabilidad del propietario. Ese es el trámite que hacemos por ti.',
      },
      {
        q: '¿Puedo vender mi vehículo con la prenda vigente?',
        a: 'En la práctica no: el traspaso queda bloqueado hasta levantar el gravamen. Si ya tienes comprador, gestionamos levantamiento y traspaso juntos para que sea un solo proceso.',
      },
    ],
  },
  {
    slug:        'traslado-cuenta',
    name:        'Traslado de Cuenta',
    keyword:     'traslado cuenta vehículo',
    description: 'Mueve el expediente de tu vehículo entre organismos de tránsito de cualquier ciudad de Colombia.',
    duration:    '15 a 30 días hábiles',
    waMessage:   'Hola, necesito cotizar un traslado de cuenta.',
    requisitos: [
      'Cédula del propietario (copia legible por ambas caras)',
      'Tarjeta de propiedad (licencia de tránsito) original',
      'SOAT vigente y revisión técnico-mecánica vigente (si aplica)',
      'Paz y salvo de multas en el SIMIT',
      'Paz y salvo de impuestos vehiculares del departamento de origen',
    ],
    pasos: [
      'Confirmamos en qué organismo de tránsito está matriculado tu vehículo y verificamos que no haya bloqueos.',
      'Te cotizamos el traslado completo: derechos de salida y de entrada.',
      'Recibimos los documentos y solicitamos el expediente al organismo de origen.',
      'Radicamos la matrícula en el organismo de destino.',
      'Recibes tu nueva tarjeta de propiedad con la matrícula actualizada, a domicilio.',
    ],
    faqs: [
      {
        q: '¿Para qué sirve trasladar la cuenta de mi vehículo?',
        a: 'Para que el expediente quede en el organismo de tránsito donde realmente vives o donde te resulta más práctico hacer trámites futuros: traspasos, duplicados y renovaciones se vuelven más ágiles cuando la cuenta está cerca.',
      },
      {
        q: '¿Puedo trasladar la cuenta desde cualquier ciudad de Colombia?',
        a: 'Sí. No importa dónde esté matriculado el vehículo: solicitamos el expediente al organismo de origen y lo radicamos en el de destino, sin que tengas que viajar.',
      },
      {
        q: '¿El traslado cambia mis placas?',
        a: 'No necesariamente: la placa acompaña al vehículo. Lo que cambia es el organismo de tránsito responsable del expediente, y tu tarjeta de propiedad se actualiza.',
      },
    ],
  },
  {
    slug:        'duplicado-placas',
    name:        'Duplicado de Placas',
    keyword:     'duplicado placas vehículo',
    description: 'Repón tus placas en caso de pérdida, robo o daño. Radicación y documento de tránsito restringido inmediatos; las placas físicas llegan en 15 a 30 días hábiles.',
    duration:    'Radicación inmediata · placas físicas en 15 a 30 días hábiles',
    waMessage:   'Hola, necesito cotizar un duplicado de placas.',
    requisitos: [
      'Cédula del propietario (copia legible por ambas caras)',
      'Tarjeta de propiedad (licencia de tránsito)',
      'Denuncia por pérdida o hurto (se hace en línea, te guiamos)',
      'Entrega de la placa deteriorada, si el duplicado es por daño',
      'Paz y salvo de multas en el SIMIT',
    ],
    pasos: [
      'Te ayudamos a formalizar la denuncia de pérdida o hurto si aún no la tienes.',
      'Verificamos el vehículo en el RUNT y te damos la cotización cerrada.',
      'Radicamos la solicitud de duplicado ante el organismo de tránsito y pagamos los derechos — la aprobación es el mismo día.',
      'Te entregamos el documento de tránsito restringido, válido mientras se fabrican las placas nuevas.',
      'El organismo ordena la fabricación de las placas — toma entre 15 y 30 días hábiles.',
      'Te avisamos apenas estén listas y coordinamos la entrega o el envío.',
    ],
    faqs: [
      {
        q: '¿Puedo circular mientras me entregan las placas nuevas?',
        a: 'Sí. Al radicar el duplicado, el organismo de tránsito emite un documento de tránsito restringido que te permite circular legalmente mientras se fabrican las placas nuevas — proceso que toma entre 15 y 30 días hábiles. Debes portar ese documento en el vehículo.',
      },
      {
        q: 'Me robaron una sola placa, ¿debo duplicar las dos?',
        a: 'Sí. Las placas se fabrican y entregan por juego: el duplicado repone el par completo con la misma nomenclatura.',
      },
      {
        q: '¿Cuánto tardan en fabricar las placas?',
        a: 'La radicación toma 1 a 2 días hábiles; la fabricación depende del proveedor del organismo de tránsito y suele tardar unos días más. Te mantenemos informado con el código de seguimiento.',
      },
    ],
  },
  {
    slug:        'cambio-servicio',
    name:        'Cambio de Servicio',
    keyword:     'cambio servicio vehículo',
    description: 'Cambia la naturaleza de tu vehículo entre particular y público de forma ágil.',
    duration:    '1 a 2 días hábiles',
    waMessage:   'Hola, necesito cotizar un cambio de servicio.',
    requisitos: [
      'Cédula del propietario (copia legible por ambas caras)',
      'Tarjeta de propiedad (licencia de tránsito) original',
      'SOAT y revisión técnico-mecánica vigentes acordes al servicio de destino',
      'Paz y salvo de multas en el SIMIT',
      'Documentos adicionales según el caso (capacidad transportadora, vinculación a empresa, etc. — te confirmamos en la validación)',
    ],
    pasos: [
      'Analizamos tu caso: no todos los cambios de servicio son viables y depende de la normativa vigente y del tipo de vehículo.',
      'Te confirmamos requisitos exactos y cotización antes de iniciar.',
      'Reunimos y revisamos la documentación completa.',
      'Radicamos ante el organismo de tránsito y hacemos seguimiento hasta la aprobación.',
      'Recibes la tarjeta de propiedad actualizada con el nuevo servicio.',
    ],
    faqs: [
      {
        q: '¿Todos los vehículos pueden cambiar de servicio?',
        a: 'No. El cambio entre particular y público depende de la normativa del Ministerio de Transporte vigente, el tipo de vehículo y, en el caso del servicio público, de la capacidad transportadora y la vinculación a una empresa habilitada. Por eso lo primero que hacemos es estudiar tu caso y decirte con franqueza si es viable.',
      },
      {
        q: '¿Qué cambia en la práctica con el servicio del vehículo?',
        a: 'Cambian las condiciones del SOAT, la periodicidad de la revisión técnico-mecánica, los impuestos y lo que legalmente puedes hacer con el vehículo (por ejemplo, transportar pasajeros o carga con ánimo de lucro).',
      },
    ],
  },
  {
    slug:        'prescripcion-comparendos',
    name:        'Prescripción de Comparendos',
    keyword:     'prescripción comparendos tránsito',
    description: 'Las multas de más de 3 años pueden estar prescritas. Revisamos gratis y tramitamos la declaración para eliminarlas del sistema.',
    duration:    '15 a 30 días hábiles',
    waMessage:   'Hola, quiero verificar si tengo comparendos prescritos.',
    requisitos: [
      'Cédula del interesado (copia legible por ambas caras)',
      'Consulta de tus comparendos en el SIMIT (la hacemos gratis contigo)',
      'Poder o autorización para presentar la solicitud ante la autoridad de tránsito',
    ],
    pasos: [
      'Consultamos gratis tu estado en el SIMIT y el RUNT e identificamos qué multas tienen más de 3 años.',
      'Verificamos que no haya actos que hayan interrumpido la prescripción (acuerdos de pago, cobros coactivos notificados).',
      'Preparamos y radicamos la solicitud de prescripción ante la autoridad de tránsito correspondiente.',
      'Hacemos seguimiento hasta obtener la resolución.',
      'Confirmamos la eliminación de la multa del SIMIT y te enviamos el soporte.',
    ],
    faqs: [
      {
        q: '¿Cuándo prescribe un comparendo en Colombia?',
        a: 'Como regla general, la sanción prescribe a los 3 años desde que la multa quedó en firme, siempre que la autoridad no haya interrumpido válidamente el cobro (por ejemplo, con un mandamiento de pago notificado o un acuerdo de pago que tú hayas firmado). Cada caso hay que revisarlo — por eso la consulta es gratis.',
      },
      {
        q: '¿La prescripción es automática?',
        a: 'No. Aunque el derecho exista, la multa sigue apareciendo en el SIMIT hasta que la autoridad declare la prescripción mediante resolución. Ese es exactamente el trámite que gestionamos.',
      },
      {
        q: '¿Por qué me conviene eliminar multas prescritas?',
        a: 'Mientras aparezcan en el SIMIT no puedes hacer traspasos ni la mayoría de trámites vehiculares, y el cobro puede escalar a embargos. Con la resolución de prescripción quedas a paz y salvo.',
      },
      {
        q: '¿Qué pasa si firmé un acuerdo de pago hace años y no lo cumplí?',
        a: 'El acuerdo de pago interrumpe la prescripción y el conteo de los 3 años arranca de nuevo. Igual vale la pena revisar: en muchos casos el nuevo término también ya venció.',
      },
    ],
  },
  {
    slug:        'curso-pedagogico',
    name:        'Curso Pedagógico de Infractor (CIA)',
    keyword:     'curso pedagógico infractor tránsito',
    description: 'Requisito obligatorio para acceder al descuento de tu comparendo. Te agendamos el curso presencial dentro de tu plazo legal y confirmamos el cupo.',
    duration:    'Sujeto a disponibilidad de cupo — agéndalo apenas conozcas tu plazo',
    waMessage:   'Hola, necesito agendar el curso pedagógico para el descuento de mi comparendo.',
    requisitos: [
      'Cédula del infractor (copia legible por ambas caras)',
      'Comparendo o soporte de la infracción, si lo tienes a la mano',
      'Conocer la fecha del comparendo — de ahí depende el plazo máximo para tomar el curso',
      'Disponibilidad para asistir de forma presencial en la jornada asignada',
    ],
    pasos: [
      'Calculamos tu plazo legal de descuento (50% o 25%) según la fecha de tu comparendo.',
      'Verificamos cupo y agendamos el curso en un centro autorizado dentro de ese plazo.',
      'Te confirmamos fecha, hora y lugar de la jornada presencial.',
      'Asistes al curso — es una jornada única.',
      'Recibimos tu certificado de asistencia y con él formalizamos el pago del comparendo con el descuento correspondiente.',
    ],
    faqs: [
      {
        q: '¿Es obligatorio el curso para acceder al descuento?',
        a: 'Sí. La ley exige completar el curso pedagógico presencial dentro del plazo del descuento — sin el certificado de asistencia no se aplica ni el 50% ni el 25%.',
      },
      {
        q: '¿Cuánto dura el curso?',
        a: 'Es una jornada presencial única. El horario exacto lo confirma el centro autorizado según cupo disponible; te avisamos apenas quede agendado.',
      },
      {
        q: '¿Hasta cuándo puedo tomar el curso?',
        a: 'Debe hacerse dentro del plazo legal del descuento: los primeros 5 días hábiles para comparendo físico (11 para fotomulta) dan 50%; hasta el día 20 (26 para fotomulta) dan 25%. Después de eso ya no aplica el descuento. Por eso conviene agendarlo apenas conozcas tu caso.',
      },
      {
        q: '¿El curso reemplaza el pago del comparendo?',
        a: 'No. El curso es un requisito adicional para acceder al descuento — el comparendo se paga aparte, con el porcentaje de descuento ya aplicado una vez tengas el certificado de asistencia.',
      },
    ],
  },
];
