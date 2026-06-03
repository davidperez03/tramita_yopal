import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Tramita Yopal',
  description: 'Política de privacidad y tratamiento de datos personales de Tramita Yopal, conforme a la Ley 1581 de 2012.',
  robots: { index: false, follow: false },
};

export default function PoliticaPrivacidad() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Política de Privacidad
          </h1>
          <p className="text-slate-400 text-sm mb-10">
            Última actualización: junio de 2026 · Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Responsable del tratamiento</h2>
              <p>
                <strong>Tramita Yopal</strong> es el responsable del tratamiento de datos personales
                que se recojan a través del sitio web <strong>tramitayopal.vercel.app</strong>.
              </p>
              <p className="mt-2">
                Correo de contacto para asuntos de privacidad:{' '}
                <a href="mailto:d12mcdavo@gmail.com" className="text-brand-700 hover:underline">
                  d12mcdavo@gmail.com
                </a>
                <br />
                Ubicación: {BUSINESS.location}, Colombia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Datos que recopilamos y cómo los usamos</h2>
              <p>
                Tramita Yopal <strong>no almacena datos personales en ninguna base de datos propia</strong>.
                A continuación se describe cómo fluye la información que el usuario ingresa voluntariamente:
              </p>
              <ul className="mt-3 space-y-3 list-none pl-0">
                <li className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <strong className="block text-slate-900 mb-1">Formulario de cotización</strong>
                  Nombre, teléfono, tipo de trámite, ciudad y descripción del caso. Estos datos
                  son procesados exclusivamente en el dispositivo del usuario y enviados directamente
                  a WhatsApp mediante un enlace generado en el navegador. No transitan ni se almacenan
                  en nuestros servidores.
                </li>
                <li className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <strong className="block text-slate-900 mb-1">Formulario de verificación de multas</strong>
                  Número de cédula y placa del vehículo (opcional). Igual al anterior: el enlace
                  se genera en el navegador y el dato va directamente a WhatsApp sin pasar por nuestros servidores.
                </li>
                <li className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <strong className="block text-slate-900 mb-1">Chatbot y Validador de caso</strong>
                  Los mensajes enviados al asistente virtual son procesados de forma temporal por
                  nuestra función de servidor (Vercel) y enviados a la API de Anthropic Inc. para
                  generar la respuesta. No se almacena ningún historial de conversación en nuestros
                  servidores. El procesamiento es estrictamente en tiempo real y transitorio.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Terceros que intervienen</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>WhatsApp / Meta Platforms Inc.</strong> — Plataforma de mensajería hacia la que
                  se redirige la información de los formularios. Su tratamiento de datos se rige por la
                  política de privacidad de WhatsApp.
                </li>
                <li>
                  <strong>Anthropic Inc.</strong> — Proveedor del modelo de inteligencia artificial que
                  procesa las conversaciones del chatbot. Anthropic procesa los mensajes conforme a sus
                  propios términos de servicio y política de privacidad.
                </li>
                <li>
                  <strong>Vercel Inc.</strong> — Plataforma de alojamiento del sitio web. Vercel puede
                  procesar datos de tráfico (IPs, user-agents) para el funcionamiento de la infraestructura,
                  conforme a su política de privacidad.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies y tecnologías de rastreo</h2>
              <p>
                Este sitio web <strong>no utiliza cookies propias de rastreo ni herramientas de análisis
                como Google Analytics</strong>. Vercel puede utilizar cookies técnicas estrictamente
                necesarias para el funcionamiento del sitio (caché, seguridad), que no identifican
                personalmente al usuario.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Derechos del titular (Habeas Data)</h2>
              <p>
                Conforme a la Ley 1581 de 2012, los titulares de datos personales tienen derecho a:
              </p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li>Conocer, actualizar y rectificar sus datos personales.</li>
                <li>Solicitar prueba de la autorización otorgada.</li>
                <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
                <li>Revocar la autorización y/o solicitar la supresión de sus datos.</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
              </ul>
              <p className="mt-3">
                Dado que Tramita Yopal no almacena bases de datos de usuarios, las solicitudes de
                acceso, rectificación o supresión se atenderán en un plazo de <strong>10 días hábiles</strong>{' '}
                a través del correo <strong>d12mcdavo@gmail.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Seguridad</h2>
              <p>
                El sitio opera bajo protocolo HTTPS. Al no mantener bases de datos de usuarios,
                el riesgo de exposición de datos personales almacenados es inexistente.
                La comunicación entre el usuario y WhatsApp está protegida por el cifrado
                extremo a extremo de esa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Cambios a esta política</h2>
              <p>
                Tramita Yopal se reserva el derecho de actualizar esta política en cualquier momento.
                Los cambios serán publicados en esta misma página con la fecha de actualización.
                El uso continuado del sitio web implica la aceptación de la versión vigente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con el tratamiento de sus datos personales:
              </p>
              <p className="mt-2">
                📧 <a href="mailto:d12mcdavo@gmail.com" className="text-brand-700 hover:underline">d12mcdavo@gmail.com</a><br />
                📍 {BUSINESS.location}, Colombia<br />
                🕐 {BUSINESS.hours.weekdays}
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
