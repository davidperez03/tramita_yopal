export type TramiteEstado = 'recibido' | 'en_proceso' | 'aprobado' | 'entregado' | 'cancelado';

// Datos del cliente embebidos vía join (tramites.cliente_id → clientes)
export type ClienteRef = {
  nombre: string;
  telefono: string | null;
  ciudad: string | null;
};

export type Tramite = {
  id: string;
  created_at: string;
  updated_at: string | null;
  cliente_id: string;
  cliente: ClienteRef | null;
  asignado_a: string | null;
  placa: string | null;
  tipos: string[];
  estado: TramiteEstado;

  // Lo que cobra al cliente
  valor_honorarios: number;
  valor_derechos: number;
  valor_avaluo: number;

  // Costos operativos — se registran al cerrar el trámite
  costo_tramitador: number;
  costo_envio: number;
  costo_imprevistos: number;

  // Pagos del cliente
  pago_inicial: boolean;
  pago_inicial_fecha: string | null;
  pago_inicial_metodo: string | null;
  pago_final: boolean;
  pago_final_fecha: string | null;
  pago_final_metodo: string | null;

  cancelacion_motivo: string | null;
  pago_devuelto: boolean;
  codigo_seguimiento: string | null;
};

// Usuario asignable como tramitador (auth.users sin rol admin)
export type TramitadorOption = { id: string; email: string };

export type HistorialEntry = {
  tramite_id: string;
  ts: string;
  estado: string;
  nota: string | null;
};

export const ESTADOS: TramiteEstado[] = [
  'recibido', 'en_proceso', 'aprobado', 'entregado', 'cancelado',
];

export const METODOS_PAGO = ['efectivo', 'transferencia', 'nequi', 'daviplata', 'otro'] as const;
export type MetodoPago = (typeof METODOS_PAGO)[number];

export const ESTADO_CONFIG = {
  recibido:   {
    label:      'Recibido',
    badge:      'bg-slate-100 text-slate-600 border-slate-200',
    pillActive: 'bg-slate-200 border-slate-400 text-slate-800',
    band:       'bg-slate-300',
  },
  en_proceso: {
    label:      'En proceso',
    badge:      'bg-blue-50 text-blue-700 border-blue-200',
    pillActive: 'bg-blue-100 border-blue-500 text-blue-800',
    band:       'bg-blue-500',
  },
  aprobado:   {
    label:      'Aprobado',
    badge:      'bg-emerald-50 text-emerald-700 border-emerald-200',
    pillActive: 'bg-emerald-100 border-emerald-500 text-emerald-800',
    band:       'bg-emerald-500',
  },
  entregado:  {
    label:      'Entregado',
    badge:      'bg-brand-50 text-brand-700 border-brand-200',
    pillActive: 'bg-brand-100 border-brand-500 text-brand-800',
    band:       'bg-brand-600',
  },
  cancelado:  {
    label:      'Cancelado',
    badge:      'bg-red-50 text-red-600 border-red-200',
    pillActive: 'bg-red-100 border-red-400 text-red-700',
    band:       'bg-red-400',
  },
} satisfies Record<TramiteEstado, { label: string; badge: string; pillActive: string; band: string }>;

export function calcPagos(t: Pick<Tramite, 'valor_honorarios' | 'valor_derechos' | 'valor_avaluo'>) {
  const base      = t.valor_honorarios + t.valor_derechos;
  const pago1base = Math.floor(base / 2);
  const pago2base = base - pago1base;
  return { pago1: pago1base + t.valor_avaluo, pago2: pago2base, total: base + t.valor_avaluo };
}

export function calcNeto(t: Pick<Tramite, 'valor_honorarios' | 'costo_tramitador' | 'costo_envio' | 'costo_imprevistos'>) {
  return t.valor_honorarios - t.costo_tramitador - t.costo_envio - t.costo_imprevistos;
}
