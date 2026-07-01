import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparendoForm from './ComparendoForm';

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Paga tu Comparendo con Descuento en Yopal | Tramita Yopal',
  description: 'Paga tu comparendo en Yopal con hasta el 50% de descuento pagando a tiempo. Verifica tu plazo y solicita asesoría gratis.',
  alternates: { canonical: `${siteUrl}/descuento-comparendo` },
  openGraph: {
    title: 'Paga tu Comparendo con Descuento en Yopal | Tramita Yopal',
    description: 'Hasta 50% de descuento en tu comparendo de tránsito en Yopal.',
    url: `${siteUrl}/descuento-comparendo`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function DescuentoComparendoPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative bg-brand-950 overflow-hidden pt-28 pb-16 sm:pb-24">
          {/* Patrón de fondo */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `repeating-linear-gradient(45deg,#10b981 0px,#10b981 1px,transparent 1px,transparent 20px)` }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Izquierda — info */}
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Descuento en comparendos · Yopal, Casanare
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
                  Paga tu comparendo<br />
                  <span className="text-emerald-400">con hasta el 50% menos</span>
                </h1>

                <p className="text-lg text-brand-200 leading-relaxed mb-10 max-w-lg">
                  La ley te permite pagar con descuento si actúas dentro de los plazos
                  y completas el curso pedagógico presencial. Te guiamos en todo el proceso.
                </p>

                {/* Tarjetas de plazos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-5">
                    <p className="text-4xl font-black text-emerald-400 leading-none mb-4">50%</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Físico:</span><br />
                        Primeros 5 días hábiles
                      </p>
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Fotomulta:</span><br />
                        Primeros 11 días hábiles
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-amber-500/30 rounded-2xl p-5">
                    <p className="text-4xl font-black text-amber-400 leading-none mb-4">25%</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Físico:</span><br />
                        Días hábiles 6 al 20
                      </p>
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Fotomulta:</span><br />
                        Días hábiles 12 al 26
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs text-brand-400">
                  ⚠️ Requiere curso pedagógico presencial obligatorio para aplicar al descuento
                </p>
              </div>

              {/* Derecha — formulario */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Verifica tu plazo y agenda tu caso
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Asesoría gratuita · Respondemos en menos de 30 min
                </p>
                <ComparendoForm />
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
