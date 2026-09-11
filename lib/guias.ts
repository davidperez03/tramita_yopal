import { SEO_SERVICES } from './seo-data';
import { REGLA_AVALUO, CALE_INFO } from './reglas-negocio';

// Requisitos desde el catálogo único (lib/seo-data.ts) — así las guías
// siempre muestran la misma lista que las páginas de servicio y el chatbot.
const requisitosDe = (slug: string): string[] =>
  SEO_SERVICES.find((s) => s.slug === slug)?.requisitos ?? [];

export type GuiaSeccion = {
  titulo: string;
  parrafos: string[];
  lista?: string[];
};

export type Guia = {
  slug: string;
  titulo: string;
  tituloCorto: string;
  descripcion: string;
  actualizado: string; // ISO — actualizar al editar contenido
  minutos: number;
  intro: string[];
  secciones: GuiaSeccion[];
  faqs: { q: string; a: string }[];
  servicioSlug: string;
  waMessage: string;
};

export const GUIAS: Guia[] = [
  {
    slug:        'como-hacer-traspaso-vehiculo-yopal',
    titulo:      'Cómo hacer el traspaso de un vehículo en Yopal (2026): requisitos, costos y pasos',
    tituloCorto: 'Traspaso de vehículo en Yopal, paso a paso',
    descripcion: 'Guía completa y actualizada del traspaso de propiedad en Yopal, Casanare: documentos, cuánto cuesta, cuánto tarda, errores comunes y cómo hacerlo sin ir al organismo de tránsito.',
    actualizado: '2026-08-09',
    minutos:     7,
    intro: [
      'Compraste o vendiste un carro o una moto y ahora viene el paso que casi todos aplazan: el traspaso. En esta guía te explicamos exactamente cómo funciona el traspaso de propiedad ante el organismo de tránsito de Yopal, qué documentos necesitas, cuánto cuesta y los errores que más bloquean el trámite.',
      'La escribimos desde la experiencia: gestionamos traspasos todas las semanas en la ventanilla del tránsito de Yopal, para clientes de todo Casanare.',
    ],
    secciones: [
      {
        titulo: '¿Qué es el traspaso y por qué es urgente hacerlo?',
        parrafos: [
          'El traspaso es el registro oficial del cambio de propietario ante el organismo de tránsito y el RUNT. Mientras no se haga, el vehículo sigue legalmente a nombre del vendedor: los comparendos con fotomulta le llegan a él, y el comprador no puede demostrar propiedad plena ni vender después.',
          'El famoso "traspaso abierto" —comprar con carta abierta y no registrar el cambio— es la fuente número uno de problemas vehiculares en Colombia: multas ajenas, líos en accidentes, vehículos imposibles de vender años después porque el antiguo dueño falleció o no aparece. Si acabas de comprar, haz el traspaso ya.',
        ],
      },
      {
        titulo: 'Documentos que necesitas',
        parrafos: ['Para radicar el traspaso en Yopal necesitas tener a la mano:'],
        lista: requisitosDe('traspaso-propiedad'),
      },
      {
        titulo: '¿Cuánto cuesta el traspaso en Yopal?',
        parrafos: [
          `El costo tiene tres componentes: los derechos del organismo de tránsito, la retención en la fuente del 1% sobre el valor del vehículo y los honorarios de gestión si lo haces con un tramitador. Sobre ese 1%: ${REGLA_AVALUO.larga}.`,
          'Como los derechos cambian cada año y la retención depende del valor de tu vehículo, la única cifra seria es una cotización sobre tu caso concreto. Nosotros la damos gratis y cerrada antes de empezar: sabes el total exacto antes de pagar un peso.',
        ],
      },
      {
        titulo: 'El paso que casi nadie hace y evita el 90% de los problemas',
        parrafos: [
          'Antes de firmar o pagar nada, revisa el vehículo en el RUNT (prendas vigentes, embargos, medidas cautelares) y el estado de comprador y vendedor en el SIMIT (multas pendientes a su nombre). Un vehículo puede tener comparendos en su historial sin que eso bloquee el traspaso — lo que sí bloquea es una prenda vigente o que las multas estén a nombre de una de las dos partes. Descubrir un bloqueo con la plata ya entregada es un dolor de cabeza; por eso revisamos todo antes.',
          'Esa validación previa la hacemos gratis. Si aparece un bloqueo, te decimos exactamente cómo resolverlo (levantamiento de prenda, prescripción de comparendos, acuerdo de pago) y en qué orden.',
        ],
      },
      {
        titulo: 'Paso a paso del trámite',
        parrafos: ['Así funciona el proceso completo con nosotros, sin que tengas que hacer una sola fila:'],
        lista: [
          '1. Validación previa gratuita del vehículo, vendedor y comprador en RUNT y SIMIT.',
          '2. Cotización cerrada por WhatsApp: derechos + retención + honorarios.',
          '3. Recibimos los documentos en nuestra oficina en Yopal o por mensajería desde tu municipio.',
          '4. Liquidamos, pagamos derechos y radicamos en el organismo de tránsito de Yopal.',
          '5. Seguimiento en línea con tu código: ves cada avance en tramitayopal.com/seguimiento.',
          '6. Te entregamos la nueva tarjeta de propiedad — envío gratis a cualquier municipio de Casanare.',
        ],
      },
      {
        titulo: '¿Cuánto tarda?',
        parrafos: [
          'Con los documentos completos y sin bloqueos, la radicación y aprobación toma normalmente 1 a 2 días hábiles en el organismo de tránsito de Yopal.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿El vendedor puede hacer el traspaso sin el comprador (o viceversa)?',
        a: 'Con los documentos firmados y autenticados por ambas partes, ninguno tiene que ir en persona: nosotros radicamos en ventanilla. Si una de las partes tiene dificultad para firmar o autenticar sus documentos, cuéntanos tu caso y te decimos cómo proceder.',
      },
      {
        q: '¿El vehículo puede tener multas y aun así hacer el traspaso?',
        a: 'Sí. Las multas de tránsito se registran a nombre de la persona, no del vehículo — un carro puede tener comparendos en su historial y seguir habilitado para traspaso, siempre que esas multas no estén a nombre del comprador ni del vendedor. Lo que sí bloquea el trámite es una prenda vigente sobre el vehículo.',
      },
      {
        q: '¿Qué pasa con el SOAT y el impuesto vehicular después del traspaso?',
        a: 'El SOAT sigue vigente hasta su vencimiento (va atado al vehículo, no al dueño). El impuesto vehicular del año en curso debe estar al día para tramitar; los años siguientes ya quedan a cargo del nuevo propietario.',
      },
    ],
    servicioSlug: 'traspaso-propiedad',
    waMessage:    'Hola, leí la guía de traspaso y quiero cotizar el mío.',
  },
  {
    slug:        'prescripcion-comparendos-colombia',
    titulo:      'Prescripción de comparendos en Colombia: cómo eliminar multas de más de 3 años (2026)',
    tituloCorto: 'Cómo eliminar multas de tránsito prescritas',
    descripcion: 'Las multas de tránsito con más de 3 años pueden estar prescritas, pero no se borran solas. Te explicamos cuándo aplica la prescripción, cómo se solicita y qué documentos necesitas.',
    actualizado: '2026-07-03',
    minutos:     6,
    intro: [
      'Miles de colombianos tienen multas de tránsito viejas acumulando intereses en el SIMIT sin saber que la ley les da una salida: la prescripción. Si tu multa quedó en firme hace más de 3 años y la autoridad no ejecutó el cobro correctamente, tienes derecho a que la eliminen — con intereses incluidos.',
      'En esta guía te explicamos cómo funciona, cuándo aplica y cómo se tramita ante las autoridades de tránsito, incluido el organismo de tránsito de Yopal.',
    ],
    secciones: [
      {
        titulo: '¿Qué es la prescripción de un comparendo?',
        parrafos: [
          'Es la pérdida de la facultad de la autoridad para cobrarte la multa por el paso del tiempo. En materia de tránsito, la regla general es que la sanción prescribe a los 3 años contados desde que quedó en firme, siempre que en ese lapso la autoridad no haya interrumpido válidamente el cobro.',
          'Importante: prescribe la multa, no el comparendo como hecho histórico. Lo que se elimina es la obligación de pago y su reporte en el SIMIT, que es lo que realmente te bloquea.',
        ],
      },
      {
        titulo: '¿Qué interrumpe la prescripción?',
        parrafos: ['El conteo de los 3 años se reinicia si ocurre alguna de estas situaciones:'],
        lista: [
          'Firmaste un acuerdo de pago con la autoridad (aunque no lo hayas cumplido).',
          'Te notificaron válidamente un mandamiento de pago dentro del proceso de cobro coactivo.',
          'Hiciste un abono a la deuda.',
        ],
      },
      {
        titulo: 'La prescripción NO es automática',
        parrafos: [
          'Este es el punto que más confunde. Aunque tu multa tenga 5 o 10 años, seguirá apareciendo en el SIMIT hasta que la autoridad de tránsito declare la prescripción mediante una resolución. Hay que solicitarla formalmente, sustentarla y hacerle seguimiento.',
          'Mientras la multa siga reportada, no puedes hacer traspasos ni refrendar la licencia en la mayoría de los casos, y el cobro puede escalar a embargo de cuentas o de salario.',
        ],
      },
      {
        titulo: 'Cómo se tramita, paso a paso',
        parrafos: ['El proceso ante la autoridad de tránsito funciona así:'],
        lista: [
          '1. Consulta de tu estado en SIMIT y RUNT: identificamos qué multas tienen más de 3 años (esta consulta la hacemos gratis).',
          '2. Verificación de interrupciones: revisamos que no haya acuerdos de pago ni mandamientos notificados que reinicien el conteo.',
          '3. Solicitud formal de prescripción ante la autoridad que impuso la multa.',
          '4. Seguimiento hasta la resolución que declara la prescripción.',
          '5. Verificación de que la multa desaparezca del SIMIT y entrega del soporte.',
        ],
      },
      {
        titulo: '¿Cuánto tarda y cuánto cuesta?',
        parrafos: [
          'Las autoridades suelen resolver en 15 a 30 días hábiles, aunque varía según la entidad y su carga de trabajo. La consulta inicial con nosotros es gratuita; los honorarios se cotizan según el número de multas y la autoridad ante la que haya que actuar — y solo cobramos por gestionar casos que de verdad tienen mérito.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Puedo pedir la prescripción yo mismo?',
        a: 'Sí, es un derecho que puedes ejercer directamente. El valor de hacerlo con nosotros está en la verificación técnica previa (que no haya interrupciones que hundan la solicitud), la redacción correcta y el seguimiento hasta que el SIMIT quede limpio.',
      },
      {
        q: 'Tengo una multa de hace 4 años pero firmé acuerdo de pago hace 2, ¿prescribió?',
        a: 'El acuerdo interrumpió la prescripción y el conteo arrancó de nuevo desde la fecha del acuerdo (o del último abono). En tu ejemplo faltaría un año, salvo otros detalles del expediente. Por eso revisamos caso por caso antes de radicar.',
      },
      {
        q: '¿Aplica para fotomultas?',
        a: 'Sí. Las fotodetecciones siguen las mismas reglas de firmeza y prescripción. De hecho, muchas fotomultas viejas tienen problemas de notificación que fortalecen la solicitud.',
      },
    ],
    servicioSlug: 'prescripcion-comparendos',
    waMessage:    'Hola, leí la guía de prescripción y quiero que revisen mis comparendos.',
  },
  {
    slug:        'levantamiento-prenda-vehiculo',
    titulo:      'Levantamiento de prenda: cómo liberar tu vehículo después de pagar el crédito (2026)',
    tituloCorto: 'Cómo levantar la prenda de tu vehículo',
    descripcion: 'Terminaste de pagar el crédito del carro o la moto, pero el vehículo sigue "prendado". Te explicamos qué es la prenda, por qué no desaparece sola y cómo levantarla ante el tránsito de Yopal.',
    actualizado: '2026-07-03',
    minutos:     5,
    intro: [
      'Pagaste la última cuota del crédito de tu vehículo. Felicitaciones — pero ojo: tu carro o moto sigue apareciendo con prenda a favor del banco en el RUNT, y así seguirá hasta que hagas el levantamiento. Esta guía te explica el trámite completo.',
    ],
    secciones: [
      {
        titulo: '¿Qué es la prenda y qué implica?',
        parrafos: [
          'Cuando financias un vehículo, la entidad financiera inscribe una prenda (garantía mobiliaria) sobre él ante el organismo de tránsito. Es su respaldo: si dejas de pagar, puede perseguir el vehículo.',
          'Mientras la prenda esté vigente en el RUNT, no puedes traspasar el vehículo ni venderlo formalmente. Muchos negocios de compraventa se caen en el último momento porque el vendedor descubre que su vehículo sigue prendado años después de haber pagado.',
        ],
      },
      {
        titulo: 'Pagué el crédito, ¿por qué la prenda sigue apareciendo?',
        parrafos: [
          'Porque el banco no hace el levantamiento por ti. Al terminar el crédito, la entidad emite una carta de levantamiento de prenda (o paz y salvo con autorización de levantamiento), pero registrar ese levantamiento ante el organismo de tránsito es responsabilidad del propietario.',
          'Es un trámite corto, pero con un detalle crítico: la carta del banco debe cumplir los requisitos exactos del organismo de tránsito (datos del vehículo, de la obligación, firmas autorizadas). Una carta incompleta es la causa número uno de rechazo.',
        ],
      },
      {
        titulo: 'Documentos y pasos',
        parrafos: ['Necesitas lo siguiente:'],
        lista: requisitosDe('levantamiento-prenda'),
      },
      {
        titulo: 'Cómo lo gestionamos',
        parrafos: ['El proceso con nosotros toma normalmente 1 a 2 días hábiles:'],
        lista: [
          '1. Verificamos la prenda en el RUNT y revisamos que la carta del banco esté completa.',
          '2. Si la carta tiene problemas, te decimos exactamente qué pedirle al banco antes de radicar.',
          '3. Recibimos tus documentos en oficina o por mensajería.',
          '4. Radicamos el levantamiento y pagamos los derechos ante el tránsito de Yopal.',
          '5. Te confirmamos con soporte cuando el vehículo queda libre de gravamen en el RUNT.',
        ],
      },
      {
        titulo: '¿Vas a vender el vehículo?',
        parrafos: [
          'Si ya tienes comprador, gestionamos el levantamiento y el traspaso como un solo proceso: se radica el levantamiento y, apenas queda en firme, entra el traspaso. Así el negocio no se enfría esperando trámites.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo tengo para levantar la prenda después de pagar?',
        a: 'No hay un plazo que te sancione, pero cada mes que pasa aumenta el riesgo de complicaciones: bancos que se fusionan o liquidan, cartas que hay que volver a pedir, firmas autorizadas que cambian. Hazlo apenas termines de pagar.',
      },
      {
        q: 'El banco que me financió ya no existe, ¿qué hago?',
        a: 'Hay que rastrear a la entidad que absorbió la cartera y pedirle la carta a ella. Es más demorado pero se puede — lo hemos gestionado varias veces. Escríbenos con los datos de tu caso.',
      },
      {
        q: '¿Puedo hacer el levantamiento si tengo multas pendientes?',
        a: 'El organismo de tránsito exige paz y salvo del SIMIT para radicar. Si tienes multas viejas, revisa primero si están prescritas: podemos gestionar la prescripción y el levantamiento en un solo paquete.',
      },
    ],
    servicioSlug: 'levantamiento-prenda',
    waMessage:    'Hola, leí la guía de levantamiento de prenda y quiero cotizar el mío.',
  },
  {
    slug:        'pagar-comparendo-descuento-yopal',
    titulo:      'Cómo pagar un comparendo con descuento en Yopal (2026): plazos, porcentajes y curso pedagógico',
    tituloCorto: 'Pagar tu comparendo con descuento, paso a paso',
    descripcion: 'Guía completa del descuento por pronto pago de comparendos en Yopal: cuánto puedes ahorrar, los plazos exactos según el tipo de comparendo, el curso pedagógico obligatorio y cómo no perder el plazo.',
    actualizado: '2026-08-09',
    minutos:     5,
    intro: [
      'Un comparendo de tránsito no hay que pagarlo por el valor completo si actúas rápido: la ley permite un descuento de hasta el 50% por pronto pago. El problema es que el plazo corre en días hábiles desde el momento de la infracción, y mucha gente lo pierde por no saber exactamente cuánto tiempo le queda.',
      'En esta guía te explicamos los plazos exactos, por qué el curso pedagógico es un paso obligatorio (no opcional) y cómo lo gestionamos contigo sin que se te venza el descuento.',
    ],
    secciones: [
      {
        titulo: '¿Cómo funciona el descuento por pronto pago?',
        parrafos: [
          'La Ley 769 de 2002 (Código Nacional de Tránsito) y sus modificaciones establecen un descuento escalonado según qué tan rápido pagues después de la infracción. El conteo es en días hábiles, no calendario, y empieza el día siguiente al comparendo.',
          'El porcentaje que aparece en cualquier calculadora (incluida la nuestra) es una estimación basada en la fecha. El definitivo es el que refleje el SIMIT al momento en que liquides y pagues.',
        ],
      },
      {
        titulo: 'Plazos y porcentajes exactos',
        parrafos: ['Los plazos son distintos según el tipo de comparendo:'],
        lista: [
          'Comparendo físico (impuesto por un agente): 50% de descuento en los primeros 5 días hábiles; 25% entre el día hábil 6 y el 20.',
          'Fotomulta (cámara o detector electrónico): 50% de descuento en los primeros 11 días hábiles; 25% entre el día hábil 12 y el 26.',
          'Después de esos plazos, ya no aplica ningún descuento — se paga el valor completo.',
        ],
      },
      {
        titulo: 'El curso pedagógico: el paso que no puedes saltarte',
        parrafos: [
          'Aquí es donde más gente pierde el descuento sin darse cuenta: la ley exige completar un curso pedagógico presencial obligatorio dentro del mismo plazo del descuento. Sin el certificado de asistencia, el porcentaje no se aplica aunque hayas pagado a tiempo.',
          'El curso es una jornada única y hay que agendarlo con cupo disponible en un centro autorizado — por eso conviene hacerlo apenas conozcas tu caso, no en los últimos días del plazo.',
        ],
      },
      {
        titulo: 'Cómo lo gestionamos contigo',
        parrafos: ['El proceso completo, para que no se te pase ningún plazo:'],
        lista: [
          '1. Nos das la fecha exacta de tu comparendo y el tipo (físico o fotomulta).',
          '2. Calculamos automáticamente los días hábiles transcurridos y tu porcentaje de descuento vigente.',
          '3. Agendamos tu curso pedagógico dentro del plazo, en un centro autorizado.',
          '4. Recibimos tu certificado de asistencia.',
          '5. Formalizamos el pago del comparendo con el descuento ya aplicado.',
        ],
      },
      {
        titulo: '¿Y si ya se venció el plazo del descuento?',
        parrafos: [
          'Si ya pasaron los días hábiles del descuento, lo pierdes — pero eso no significa que no haya nada que hacer. Si el comparendo tiene más de 3 años, puede aplicar la prescripción: un trámite distinto que elimina la multa por completo, no solo un porcentaje. Vale la pena revisar tu caso.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿El curso pedagógico tiene costo aparte?',
        a: 'Sí, pero no es un gasto adicional al descuento: la suma del valor del curso más el comparendo ya con el descuento aplicado equivale al 50% o al 25% del valor total, según el plazo en que estés. Te confirmamos el desglose exacto (curso + comparendo) antes de agendar, sin sorpresas.',
      },
      {
        q: '¿Puedo pagar el comparendo sin hacer el curso?',
        a: 'Sí, pero sin el certificado de asistencia el sistema no aplica el descuento — pagarías el valor completo.',
      },
      {
        q: '¿Qué pasa si mi comparendo es una fotomulta y no me he enterado hasta ahora?',
        a: 'Las fotomultas se notifican por correo certificado, pero a veces la notificación no llega o se pierde. Consulta tu cédula en el SIMIT para saber la fecha real de notificación, de la que dependen tus días hábiles disponibles.',
      },
      {
        q: '¿El descuento aplica igual en todo Colombia?',
        a: 'El marco legal (Ley 769 de 2002) es nacional, pero la gestión del curso pedagógico y del pago depende de la autoridad de tránsito que impuso el comparendo. Nosotros gestionamos casos del organismo de tránsito de Yopal y coordinamos con otras autoridades cuando aplica.',
      },
    ],
    servicioSlug: 'curso-pedagogico',
    waMessage:    'Hola, leí la guía de descuento de comparendos y quiero verificar mi plazo.',
  },
  {
    slug:        'vigencia-refrendacion-licencia-conduccion-colombia',
    titulo:      'Cada cuánto se vence la licencia de conducción en Colombia y cómo refrendarla (2026)',
    tituloCorto: 'Vigencia y refrendación de la licencia de conducción',
    descripcion: 'Cuánto dura tu licencia de conducción según el tipo de servicio y tu edad, qué dice la norma, y cómo refrendarla antes de que venza sin pasar por el CEA ni por los CALE.',
    actualizado: '2026-09-11',
    minutos:     5,
    intro: [
      'La licencia de conducción no dura para siempre — y el plazo cambia según si es de servicio particular o público, y según tu edad. Muchos conductores se enteran de que está vencida justo cuando la necesitan para un trámite o un control de tránsito.',
      'En esta guía te explicamos cuánto dura exactamente, qué dice la norma, y cómo funciona la refrendación en el RNC — el trámite para ponerla al día, que es más simple que sacarla de nuevo.',
    ],
    secciones: [
      {
        titulo: '¿Cada cuánto se vence la licencia de conducción?',
        parrafos: [
          'El artículo 197 del Decreto 019 de 2012 (Ley Antitrámites) fija la vigencia según el tipo de servicio del vehículo y la edad del conductor:',
        ],
        lista: [
          'Servicio particular, menor de 60 años: 10 años.',
          'Servicio particular, entre 60 y 80 años: 5 años.',
          'Servicio particular, mayor de 80 años: 1 año.',
          'Servicio público (categorías C1, C2, C3), menor de 60 años: 3 años.',
          'Servicio público, mayor de 60 años: 1 año.',
        ],
      },
      {
        titulo: '¿Qué es la refrendación y en qué se diferencia de sacarla de nuevo?',
        parrafos: [
          'Refrendar es poner al día una licencia que está vencida o por vencer — sigue siendo la misma licencia, con las mismas categorías. No es lo mismo que sacarla por primera vez ni que recategorizarla: la refrendación no exige curso en un Centro de Enseñanza Automovilística (CEA) ni el examen independiente de los CALE, sin importar la categoría que tengas.',
          'Lo único que sí pide la norma es un examen médico y de aptitud física, mental y de coordinación motriz vigente, presentado en un Centro de Reconocimiento de Conductores (CRC/IPS) autorizado, además de estar a paz y salvo con comparendos en el SIMIT.',
        ],
      },
      {
        titulo: 'Documentos que necesitas',
        parrafos: ['Para radicar la refrendación necesitas:'],
        lista: requisitosDe('refrendacion-licencia'),
      },
      {
        titulo: '¿Qué pasa si la dejaste vencida hace mucho tiempo?',
        parrafos: [
          'El organismo de tránsito puede pedir requisitos adicionales según cuánto tiempo lleve vencida tu licencia — no es lo mismo un vencimiento de unos meses que de varios años. Por eso conviene revisar tu caso puntual antes de radicar, para saber exactamente qué te van a exigir.',
        ],
      },
      {
        titulo: 'Cómo lo gestionamos contigo',
        parrafos: ['El proceso con nosotros:'],
        lista: [
          '1. Revisamos tu licencia actual y confirmamos que no tengas comparendos pendientes que bloqueen el trámite.',
          '2. Te orientamos y agendamos tu cita de examen médico en un CRC/IPS autorizado — el examen lo presentas tú directamente allí.',
          '3. Verificamos que el resultado quede cargado correctamente en el RUNT.',
          '4. Radicamos la solicitud de refrendación ante el organismo de tránsito y hacemos seguimiento hasta la expedición.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿La refrendación exige el examen de los CALE?',
        a: `No. ${CALE_INFO.tramitesLibres}. La refrendación solo requiere el examen médico vigente en el CRC — no pasa por el CEA ni por los CALE.`,
      },
      {
        q: '¿La vigencia es la misma para todas las categorías particulares (A1, A2, B1, B2, B3)?',
        a: 'Sí — dentro del servicio particular, la norma fija la vigencia por edad del conductor (10, 5 o 1 año), no por categoría específica de la licencia.',
      },
      {
        q: '¿Qué pasa si mi licencia lleva mucho tiempo vencida?',
        a: 'El organismo de tránsito puede pedir requisitos adicionales según cuánto tiempo lleve vencida. Revisamos tu caso puntual y te confirmamos exactamente qué necesitas antes de radicar, para que no tengas sorpresas.',
      },
    ],
    servicioSlug: 'refrendacion-licencia',
    waMessage:    'Hola, leí la guía de refrendación y necesito refrendar mi licencia.',
  },
  {
    slug:        'licencia-conduccion-primera-vez-colombia',
    titulo:      'Licencia de conducción por primera vez en Colombia (2026): requisitos y cómo funciona el trámite',
    tituloCorto: 'Sacar la licencia de conducción por primera vez',
    descripcion: 'Guía completa para sacar la licencia de conducción por primera vez ante el RNC: requisitos, el papel del RUNT, el examen médico en el CRC, el curso en el CEA y qué pasa con los CALE.',
    actualizado: '2026-09-11',
    minutos:     6,
    intro: [
      'Sacar la licencia de conducción por primera vez pasa por varias entidades distintas — RUNT, CRC, CEA y el organismo de tránsito — y no siempre es claro en qué orden va cada cosa. En esta guía te explicamos el proceso completo y qué hay que saber sobre los CALE, la reforma que sigue aplazada.',
    ],
    secciones: [
      {
        titulo: 'Requisitos para sacarla por primera vez',
        parrafos: ['Necesitas:'],
        lista: requisitosDe('licencia-primera-vez'),
      },
      {
        titulo: 'Cómo funciona el proceso',
        parrafos: [
          'El trámite pasa por tres entidades independientes, en este orden: primero el RUNT (donde debes estar inscrito), luego el Centro de Reconocimiento de Conductores (CRC/IPS) para el examen médico y de aptitud, y luego el Centro de Enseñanza Automovilística (CEA) para el curso teórico-práctico. Con esos dos resultados cargados en el RUNT, se radica la solicitud de expedición ante el organismo de tránsito.',
        ],
      },
      {
        titulo: '¿Qué son los CALE y afectan este trámite?',
        parrafos: [
          `Los Centros de Apoyo Logístico de Evaluación (CALE) son las entidades que el Ministerio de Transporte creó para examinar de forma independiente a quien saca licencia por primera vez o recategoriza, separando esa evaluación de las escuelas de conducción (CEA). Es uno de ${CALE_INFO.tramitesAfectados} sobre los que aplicarán cuando entren en operación.`,
          `Por ahora ${CALE_INFO.estado} (${CALE_INFO.circular}, sobre la ${CALE_INFO.resolucion}). Mientras tanto, el proceso sigue siendo el de siempre: examen médico en el CRC y curso en el CEA, sin el examen adicional de los CALE.`,
        ],
      },
      {
        titulo: '¿Cuánto cuesta y por qué no damos una cifra única?',
        parrafos: [
          `El valor total incluye inscripción en el RUNT, examen médico, curso en el CEA y derechos ante el organismo de tránsito — varía según la ciudad y la categoría, así que cualquier cifra genérica puede quedar desactualizada. Te cotizamos el valor exacto según tu caso. Ten en cuenta que ${CALE_INFO.riesgoCosto}, así que conviene no esperar demasiado.`,
        ],
      },
      {
        titulo: 'Cómo lo gestionamos contigo',
        parrafos: ['Te acompañamos en todo el proceso, sin presentar el examen ni el curso por ti (eso lo exige la ley que lo hagas en persona):'],
        lista: [
          '1. Verificamos tu inscripción en el RUNT y te ayudamos a completarla si te falta.',
          '2. Te orientamos y agendamos tu cita de examen médico en un CRC/IPS autorizado.',
          '3. Te ayudamos a agendar el curso en un CEA autorizado.',
          '4. Verificamos que los resultados queden cargados correctamente en el RUNT.',
          '5. Radicamos la solicitud de expedición ante el organismo de tránsito y hacemos seguimiento hasta que tu licencia esté lista.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Es cierto que ahora hay que pasar por un centro CALE aparte del CEA?',
        a: `Esa era la idea, pero aún no está en operación. ${CALE_INFO.estado} (${CALE_INFO.circular}). Mientras tanto, el proceso sigue siendo el de siempre: examen médico en el CRC y curso en el CEA.`,
      },
      {
        q: '¿Qué edad mínima se necesita?',
        a: 'Según el artículo 19 del Código Nacional de Tránsito (Ley 769 de 2002), 16 años cumplidos para servicio particular — carro o moto, la misma edad para ambos — y 18 años si es para servicio público (taxi, bus, camión).',
      },
      {
        q: '¿Qué hace exactamente Tramita Yopal en este trámite?',
        a: 'Te acompañamos y asesoramos: inscripción en el RUNT, agendamiento en el CRC/IPS y en el CEA, verificación de que todo quede bien cargado, y radicación ante el organismo de tránsito. El examen médico y el curso/evaluación los presentas tú directamente en el CRC y el CEA — no los hacemos nosotros por ti.',
      },
    ],
    servicioSlug: 'licencia-primera-vez',
    waMessage:    'Hola, leí la guía de licencia por primera vez y quiero más información.',
  },
];
