export type Cliente = {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string | null;
  cedula: string | null;
  ciudad: string | null;
  email: string | null;
  notas: string | null;
};

// Fila de la vista clientes_resumen (cliente + agregados de sus trámites)
export type ClienteResumen = Cliente & {
  tramites_total: number;
  tramites_activos: number;
  ultimo_tramite: string | null;
  comparendos_total: number;
};

// Solicitud de comparendo mínima para mostrar en la ficha del cliente
export type ComparendoDeCliente = {
  id: string;
  created_at: string;
  cliente_id: string | null;
  telefono: string;
  tipo: 'fisico' | 'fotomulta';
  fecha_comparendo: string;
  estado: 'pendiente' | 'en_gestion' | 'atendido';
};
