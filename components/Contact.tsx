import { BUSINESS, waLink } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

const waUrl = waLink('Hola, me gustaría obtener más información sobre sus servicios.');

export default function Contact() {
  return (
    <section id="contacto" className="py-14 sm:py-20 bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Contáctanos
          </h2>
          <p className="mt-3 text-brand-300 text-lg max-w-xl mx-auto">
            Escríbenos y te respondemos en menos de 30 minutos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* WhatsApp */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-wa/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <WhatsAppIcon className="w-7 h-7 text-wa" />
            </div>
            <h3 className="font-bold text-white text-lg mb-1">WhatsApp</h3>
            <p className="text-wa font-semibold">{BUSINESS.phone}</p>
            <p className="text-brand-400 text-xs mt-2">Respuesta en &lt;{BUSINESS.responseTime}</p>
          </div>

          {/* Horario */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-brand-700/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">Horario</h3>
            <p className="text-brand-200">{BUSINESS.hours.weekdays}</p>
            <p className="text-brand-200">{BUSINESS.hours.saturday}</p>
            <p className="text-brand-500 text-xs mt-2">{BUSINESS.address}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:shadow-xl hover:shadow-green-900/30 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Escribir ahora
          </a>
        </div>
      </div>
    </section>
  );
}
