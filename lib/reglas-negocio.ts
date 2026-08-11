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
