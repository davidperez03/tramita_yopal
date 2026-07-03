import { calcPagos, type Tramite } from './tramite';

// Métricas financieras del panel admin sobre un conjunto de trámites
// (normalmente los del período seleccionado).
export function calcMetricas(tramites: Tramite[]) {
  const activos    = tramites.filter(t => t.estado !== 'cancelado');
  const cancelados = tramites.filter(t => t.estado === 'cancelado');

  const cobrado = tramites.reduce((sum, t) => {
    const { pago1, pago2 } = calcPagos(t);
    return sum + (t.pago_inicial ? pago1 : 0) + (t.pago_final ? pago2 : 0);
  }, 0);

  const devuelto = cancelados.reduce((sum, t) => {
    if (!t.pago_devuelto || !t.pago_inicial) return sum;
    return sum + calcPagos(t).pago1;
  }, 0);

  // Honorarios netos = honorarios cobrados - costos operativos registrados
  const honorariosCobrados = activos.reduce((sum, t) => {
    const base   = t.valor_honorarios;
    const p1h    = Math.floor(base / 2);
    const p2h    = base - p1h;
    const bruto  = (t.pago_inicial ? p1h : 0) + (t.pago_final ? p2h : 0);
    const costos = t.costo_tramitador + t.costo_envio + t.costo_imprevistos;
    return sum + Math.max(0, bruto - costos);
  }, 0);

  const pendiente = activos
    .filter(t => t.estado !== 'entregado')
    .reduce((sum, t) => {
      const { pago1, pago2 } = calcPagos(t);
      return sum + (!t.pago_inicial ? pago1 : 0) + (!t.pago_final ? pago2 : 0);
    }, 0);

  const devolucionesPendientes = cancelados
    .filter(t => t.pago_inicial && !t.pago_devuelto)
    .reduce((sum, t) => sum + calcPagos(t).pago1, 0);

  const deudaPostEntrega = activos
    .filter(t => t.estado === 'entregado' && (!t.pago_inicial || !t.pago_final))
    .reduce((sum, t) => {
      const { pago1, pago2 } = calcPagos(t);
      return sum + (!t.pago_inicial ? pago1 : 0) + (!t.pago_final ? pago2 : 0);
    }, 0);

  return {
    cobrado,
    devuelto,
    neto: cobrado - devuelto,
    honorariosCobrados,
    pendiente,
    devolucionesPendientes,
    deudaPostEntrega,
  };
}
