'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS } from '@/lib/constants';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

type Tipo = 'fisico' | 'fotomulta';
type Descuento = '50%' | '25%' | 'ninguno';

/* ── Festivos Colombia 2025-2026 ──────────────────────────────
   Los trasladables ya tienen la fecha del lunes correspondiente.
   Actualizar en diciembre de cada año.
───────────────────────────────────────────────────────────── */
const FESTIVOS = new Set([
  // 2025
  '2025-01-01','2025-01-06','2025-03-24','2025-04-17','2025-04-18',
  '2025-05-01','2025-06-02','2025-06-23','2025-06-30','2025-07-20',
  '2025-08-07','2025-08-18','2025-10-13','2025-11-03','2025-11-17',
  '2025-12-08','2025-12-25',
  // 2026
  '2026-01-01','2026-01-12','2026-03-23','2026-04-02','2026-04-03',
  '2026-05-01','2026-05-18','2026-06-08','2026-06-15','2026-06-29',
  '2026-07-20','2026-08-07','2026-08-17','2026-10-12','2026-11-02',
  '2026-11-16','2026-12-08','2026-12-25',
]);

function toKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function diasHabilesDesde(fechaStr: string): number {
  if (!fechaStr) return 0;
  const hasta = new Date();
  hasta.setHours(23, 59, 59, 999);
  const cur = new Date(fechaStr + 'T00:00:00');
  cur.setDate(cur.getDate() + 1);
  cur.setHours(0, 0, 0, 0);
  let count = 0;
  while (cur <= hasta) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6 && !FESTIVOS.has(toKey(cur))) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function isFutureDate(fechaStr: string): boolean {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(fechaStr + 'T00:00:00');
  return fecha > hoy;
}

// Para la fecha del curso CIA — al revés que el comparendo: aquí lo que
// no puede pasar es que sea una fecha ya vencida. El atributo `min` del
// input ya lo evita en la mayoría de navegadores, pero no en todos
// (algunos permiten escribir la fecha a mano), así que se valida también.
function isPastDate(fechaStr: string): boolean {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(fechaStr + 'T00:00:00');
  return fecha < hoy;
}

function calcDescuento(fecha: string, tipo: Tipo): Descuento {
  const dias = diasHabilesDesde(fecha);
  if (tipo === 'fisico') {
    if (dias >= 0 && dias <= 5)  return '50%';
    if (dias >= 6 && dias <= 20) return '25%';
  } else {
    if (dias >= 0  && dias <= 11) return '50%';
    if (dias >= 12 && dias <= 26) return '25%';
  }
  return 'ninguno';
}

const DESCUENTO_UI: Record<Descuento, { label: string; sub: string; cls: string; dot: string }> = {
  '50%':    { label: '50% de descuento',              sub: 'Estás dentro del plazo máximo',           cls: 'bg-emerald-50 border-emerald-300 text-emerald-800', dot: 'bg-emerald-500' },
  '25%':    { label: '25% de descuento',              sub: 'Todavía estás a tiempo',                  cls: 'bg-amber-50 border-amber-300 text-amber-800',       dot: 'bg-amber-500'   },
  ninguno:  { label: 'Plazo de descuento vencido',    sub: 'El plazo legal ya transcurrió',           cls: 'bg-red-50 border-red-200 text-red-700',             dot: 'bg-red-400'     },
};

type DatosEnviados = {
  nombre: string;
  telefono: string;
  tipo: Tipo;
  fecha: string;
  cedula?: string;
  numero?: string;
  descuento: Descuento;
  fechaCurso?: string;
};

// Todo el caso se envía como mensaje de WhatsApp — no queda nada guardado
// en base de datos. Así, cada envío completado genera un mensaje real,
// sin depender de un panel que alguien tenga que revisar.
function buildWaUrl(datos: DatosEnviados): string {
  const tipoLabel  = datos.tipo === 'fisico' ? 'Físico' : 'Fotomulta';
  const fechaLabel = new Date(datos.fecha + 'T12:00:00').toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const fechaCursoLabel = datos.fechaCurso
    ? new Date(datos.fechaCurso).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : null;

  const lineas = [
    `🚨 *Caso de comparendo — descuento por pronto pago*`,
    ``,
    `*Nombre:* ${datos.nombre}`,
    `*Tipo:* ${tipoLabel}`,
    `*Fecha del comparendo:* ${fechaLabel}`,
    datos.cedula ? `*Cédula:* ${datos.cedula}`           : null,
    datos.numero ? `*N° comparendo:* ${datos.numero}`    : null,
    datos.descuento !== 'ninguno'
      ? `*Descuento estimado:* ${datos.descuento}`
      : `⚠️ *El plazo de descuento ya venció* — quiero saber si mi comparendo aplica para prescripción`,
    fechaCursoLabel ? `*Fecha preferida curso CIA:* ${fechaCursoLabel}` : null,
    ``,
    `¿Me ayudan a confirmar y agendar?`,
  ].filter((l) => l !== null).join('\n');

  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lineas)}`;
}

function Exito({ datos }: { datos: DatosEnviados }) {
  const waUrl = buildWaUrl(datos);

  return (
    <div className="space-y-5">
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 flex gap-3 items-start">
        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
        </svg>
        <div>
          <p className="font-bold text-emerald-900 text-sm">¡Listo!</p>
          <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
            Deberías haber visto abrirse WhatsApp con tu caso ya escrito. Si no se abrió, usa el botón:
          </p>
        </div>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full bg-wa hover:bg-wa-hover text-white font-bold py-3.5 rounded-2xl text-sm transition-colors"
      >
        <WhatsAppIcon className="w-5 h-5" />
        Enviar por WhatsApp
      </a>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Qué sigue</p>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <p className="text-xs text-slate-600 leading-relaxed">Te contactamos para confirmar el descuento exacto y los pasos a seguir.</p>
          </li>
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Asistes al{' '}
              <a href="/tramites/curso-pedagogico/yopal" className="text-brand-700 font-semibold hover:underline">
                curso pedagógico presencial
              </a>{' '}
              obligatorio. Te confirmamos disponibilidad y te indicamos el lugar.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default function ComparendoForm() {
  const [tipo, setTipo]              = useState<Tipo>('fisico');
  const [fecha, setFecha]            = useState('');
  const [fechaCurso, setFechaCurso]      = useState('');
  const [horaCurso, setHoraCurso]        = useState('');
  const [horaPersonalizada, setHoraPersonalizada] = useState('');
  const [datosEnviados, setDatosEnviados] = useState<DatosEnviados | null>(null);

  const descuento = fecha ? calcDescuento(fecha, tipo) : null;
  const ui        = descuento ? DESCUENTO_UI[descuento] : null;

  // Todo va directo a WhatsApp al enviar — no se guarda nada en base de
  // datos, así cada envío completado genera un mensaje real de inmediato.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd         = new FormData(e.currentTarget);
    const nombre     = fd.get('nombre') as string;
    const tel        = fd.get('telefono') as string;
    const cedula     = fd.get('cedula') as string;
    const numero     = fd.get('numero_comparendo') as string;
    const fechaCurso = fd.get('fecha_curso') as string;
    const datos: DatosEnviados = {
      nombre, telefono: tel, tipo, fecha, cedula, numero,
      descuento: descuento ?? 'ninguno', fechaCurso: fechaCurso || undefined,
    };
    window.open(buildWaUrl(datos), '_blank');
    setDatosEnviados(datos);
  }

  if (datosEnviados) return <Exito datos={datosEnviados} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Tipo */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Tipo de comparendo *</p>
        <div className="grid grid-cols-2 gap-3">
          {(['fisico', 'fotomulta'] as const).map(t => (
            <button key={t} type="button" onClick={() => setTipo(t)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                tipo === t ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}>
              <p className={`text-sm font-bold ${tipo === t ? 'text-brand-800' : 'text-slate-700'}`}>
                {t === 'fisico' ? 'Físico' : 'Fotomulta'}
              </p>
              <p className={`text-xs mt-0.5 ${tipo === t ? 'text-brand-600' : 'text-slate-400'}`}>
                {t === 'fisico' ? 'Agente de tránsito o Policía de carreteras' : 'Cámara o detector electrónico'}
              </p>
            </button>
          ))}
        </div>
        <input type="hidden" name="tipo" value={tipo} />
      </div>

      {/* Fecha + indicador */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Fecha del comparendo *</label>
        <input type="date" name="fecha_comparendo" required
          value={fecha} onChange={e => setFecha(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />
        <AnimatePresence mode="wait">
          {fecha && isFutureDate(fecha) && (
            <motion.div key="futuro"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-2 flex items-start gap-3 border border-red-200 bg-red-50 rounded-xl px-4 py-3 text-red-700">
              <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0 bg-red-400" />
              <p className="text-sm font-bold">Fecha no válida — el comparendo no puede ser futuro</p>
            </motion.div>
          )}
          {fecha && !isFutureDate(fecha) && ui && (
            <motion.div key={descuento}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`mt-2 flex items-start gap-3 border rounded-xl px-4 py-3 ${ui.cls}`}>
              <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${ui.dot}`} />
              <div>
                <p className="text-sm font-bold">{ui.label}</p>
                <p className="text-xs mt-0.5 opacity-80">
                  {diasHabilesDesde(fecha) === 0
                    ? 'Comparendo de hoy — aún no han transcurrido días hábiles'
                    : `${diasHabilesDesde(fecha)} días hábiles transcurridos · ${ui.sub}`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Datos */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nombre *</label>
          <input name="nombre" required placeholder="JUAN GARCÍA"
            onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Teléfono *</label>
          <input name="telefono" required type="tel" placeholder="+57 300..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cédula</label>
          <input name="cedula" placeholder="Opcional"
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">N° comparendo</label>
          <input name="numero_comparendo" placeholder="Opcional"
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      {/* Fecha y hora preferida para el curso CIA */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
          Fecha preferida para el curso CIA
        </label>
        <input type="date"
          value={fechaCurso}
          onChange={e => { setFechaCurso(e.target.value); setHoraCurso(''); }}
          min={new Date().toISOString().split('T')[0]}
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />

        <AnimatePresence mode="wait">
          {fechaCurso && isPastDate(fechaCurso) && (
            <motion.div key="curso-pasado"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-2 flex items-start gap-3 border border-red-200 bg-red-50 rounded-xl px-4 py-3 text-red-700">
              <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0 bg-red-400" />
              <p className="text-sm font-bold">Fecha no válida — el curso no se puede agendar en el pasado</p>
            </motion.div>
          )}
        </AnimatePresence>

        {fechaCurso && !isPastDate(fechaCurso) && (
          <div className="mt-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Hora preferida</p>
            <div className="grid grid-cols-4 gap-2">
              {['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','otra'].map(h => (
                <button key={h} type="button" onClick={() => setHoraCurso(h)}
                  className={`py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    horaCurso === h
                      ? 'border-brand-500 bg-brand-50 text-brand-800'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                  }`}>
                  {h === 'otra' ? 'Otra' : h}
                </button>
              ))}
              {horaCurso === 'otra' && (
                <div className="col-span-4 mt-1">
                  <input type="time" value={horaPersonalizada} onChange={e => setHoraPersonalizada(e.target.value)}
                    className="w-full border-2 border-brand-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />
                </div>
              )}
            </div>
          </div>
        )}

        <input type="hidden" name="fecha_curso"
          value={
            fechaCurso && horaCurso
              ? `${fechaCurso}T${horaCurso === 'otra' ? horaPersonalizada : horaCurso}`
              : fechaCurso
          } />

        <p className="text-xs text-slate-400 mt-2">
          Opcional · Si hay disponibilidad te la confirmamos, de lo contrario te ofrecemos nuevas fechas.
        </p>
      </div>

      <button type="submit" disabled={(!!fecha && isFutureDate(fecha)) || (!!fechaCurso && isPastDate(fechaCurso))}
        className="w-full bg-brand-950 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl text-sm transition-colors">
        Solicitar asesoría gratuita →
      </button>
    </form>
  );
}
