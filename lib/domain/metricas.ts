import { calcPagos, montoPagoInicial, montoPagoFinal, type Tramite } from './tramite';

// Métricas financieras del panel admin sobre un conjunto de trámites
// (normalmente los del período seleccionado).
export function calcMetricas(tramites: Tramite[]) {
  const activos    = tramites.filter(t => t.estado !== 'cancelado');
  const cancelados = tramites.filter(t => t.estado === 'cancelado');

  const cobrado = tramites.reduce((sum, t) => {
    return sum + (t.pago_inicial ? montoPagoInicial(t) : 0) + (t.pago_final ? montoPagoFinal(t) : 0);
  }, 0);

  const devuelto = cancelados.reduce((sum, t) => {
    if (!t.pago_devuelto || !t.pago_inicial) return sum;
    return sum + montoPagoInicial(t);
  }, 0);

  // Honorarios netos = honorarios cobrados - costos operativos registrados.
  // Lo recibido (que puede no ser el 50/50 exacto) mezcla honorarios +
  // derechos + avalúo, así que se toma la proporción de honorarios sobre
  // el total pactado y se aplica a lo efectivamente recibido en total —
  // así "pagó completo en una sola cuota" también queda bien contado.
  const honorariosCobrados = activos.reduce((sum, t) => {
    const { total } = calcPagos(t);
    if (total === 0) return sum;
    const brutoRecibido = (t.pago_inicial ? montoPagoInicial(t) : 0) + (t.pago_final ? montoPagoFinal(t) : 0);
    const honorariosBrutos = brutoRecibido * (t.valor_honorarios / total);
    const costos = t.costo_tramitador + t.costo_envio + t.costo_imprevistos;
    return sum + Math.max(0, Math.round(honorariosBrutos) - costos);
  }, 0);

  const pendiente = activos
    .filter(t => t.estado !== 'entregado')
    .reduce((sum, t) => {
      const { pago1, pago2 } = calcPagos(t);
      return sum + (!t.pago_inicial ? pago1 : 0) + (!t.pago_final ? pago2 : 0);
    }, 0);

  const devolucionesPendientes = cancelados
    .filter(t => t.pago_inicial && !t.pago_devuelto)
    .reduce((sum, t) => sum + montoPagoInicial(t), 0);

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
