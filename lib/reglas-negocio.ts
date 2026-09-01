// Reglas de negocio/legales que se repiten en varios lugares del sitio
// (marketing, chatbot, panel admin, términos). Si el dueño del negocio
// corrige una de estas cifras o reglas, se cambia aquí — no archivo por
// archivo. Ver docs/CONFIGURACION.md.

// Base sobre la que se calcula el 1% de avalúo/retención en el Traspaso.
// NO depende del cilindraje del vehículo — depende de si existe
// liquidación de impuesto vehicular:
//  - Si el vehículo tiene liquidación de impuesto (la generalidad de los
//    casos), la base es esa liquidación.
//  - Si el vehículo está exento y por tanto no tiene liquidación, la base
//    es el valor indicado en el contrato de compraventa.
export const REGLA_AVALUO = {
  larga: 'la base del 1% es la liquidación de impuesto vehicular cuando el vehículo la tiene; si está exento y no tiene liquidación, la base es el valor del contrato de compraventa',
  corta: 'según la liquidación de impuestos del vehículo, o el valor del contrato de compraventa si está exento',
};

// Umbrales del descuento por pronto pago de comparendos — deben coincidir
// exactamente con calcDescuento() en app/descuento-comparendo/ComparendoForm.tsx.
export const DESCUENTO_COMPARENDO = {
  fisico:    { dias50: 5,  diasHasta25: 20 },
  fotomulta: { dias50: 11, diasHasta25: 26 },
};

// Las multas de tránsito se registran a la persona (SIMIT), no al
// vehículo (RUNT) — un carro puede tener comparendos en su historial y
// seguir habilitado para trámites como el traspaso.
export const MULTAS_SON_DE_LA_PERSONA =
  'las multas de tránsito se registran a nombre de la persona, no del vehículo — un carro puede tener comparendos en su historial y seguir habilitado para el traspaso, siempre que esas multas no estén a nombre del comprador ni del vendedor. Lo que sí bloquea el trámite es una prenda vigente sobre el vehículo';

// Estado de los CALE (Centros de Apoyo Logístico de Evaluación) para
// licencias de conducción. Verificado el 2026-09-01 — si el Ministerio de
// Transporte anuncia una fecha de entrada en operación, actualizar aquí
// (única fuente para lib/seo-data.ts y app/licencias/page.tsx).
export const CALE_INFO = {
  resolucion:  'Resolución 20253040037125 de 2025',
  circular:    'Circular 0317 del 28 de agosto de 2026',
  estado:
    'el Ministerio de Transporte aplazó su entrada en operación mientras revisa la estructura y los costos que asumirían los conductores — sin fijar todavía una nueva fecha',
  tramitesAfectados: 'la licencia por primera vez y la recategorización',
  tramitesLibres:    'la renovación y el duplicado no requieren examen, con o sin CALE',
  costoActual:   '$1.400.000 aprox.',
  costoConCale:  'hasta $2.200.000 aprox. (unos $800.000 más)',
  leyVigente:
    'La Ley 2251 de 2022 sigue vigente — el aplazamiento es operativo, no una derogación, así que los CALE igual van a entrar en operación',
  resumenCorto:
    'El Ministerio de Transporte aplazó el 28 de agosto de 2026 la entrada en operación de los CALE (Circular 0317), que exigirán un examen independiente para licencia por primera vez y recategorización. El aplazamiento busca revisar el costo, que podría subir de $1.400.000 a $2.200.000. No hay fecha fija de reactivación — tramitar ahora evita ese posible sobrecosto.',
};
