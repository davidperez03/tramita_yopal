const TZ   = 'America/Bogota';
const DATE_OPTS: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', timeZone: TZ };
const DT_OPTS:   Intl.DateTimeFormatOptions = { ...DATE_OPTS, hour: '2-digit', minute: '2-digit' };

export const fmtDate     = (iso: string) => new Date(iso).toLocaleDateString('es-CO', DATE_OPTS);
export const fmtDatetime = (iso: string) => new Date(iso).toLocaleString('es-CO', DT_OPTS);
