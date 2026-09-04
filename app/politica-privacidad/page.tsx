import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Tramita Yopal',
  description: 'Política de privacidad y tratamiento de datos personales de Tramita Yopal para trámites de vehículo, licencia de conducción y comparendos, conforme a la Ley 1581 de 2012.',
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
            Última actualización: septiembre de 2026 · Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Responsable del tratamiento</h2>
              <p>
                <strong>Tramita Yopal</strong> es el responsable del tratamiento de datos personales
                recopilados a través del sitio web <strong>tramitayopal.com</strong>.
              </p>
              <p className="mt-2">
                Correo de contacto para asuntos de privacidad:{' '}
                <a href={`mailto:${BUSINESS.email}`} className="text-brand-700 hover:underline">
                  {BUSINESS.email}
                </a>
                <br />
                Ubicación: {BUSINESS.location}, Colombia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Datos que recopilamos y cómo los usamos</h2>

              <ul className="mt-3 space-y-3 list-none pl-0">
                <li className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <strong className="block text-slate-900 mb-1">Clientes y gestión de trámites</strong>
                  <p className="mb-2">
                    Hoy la relación con el cliente empieza y se coordina directamente por{' '}
                    <strong>WhatsApp</strong>. Cuando un trámite se formaliza, lo registramos en nuestro
                    sistema para poder darte seguimiento: tu <strong>nombre</strong>,{' '}
                    <strong>teléfono</strong>, <strong>ciudad</strong> y, de forma opcional, tu{' '}
                    <strong>número de cédula</strong> y <strong>correo electrónico</strong>, junto con los
                    datos del trámite: tipo de trámite, estado, fechas y valores del servicio, y — cuando
                    aplica — la <strong>placa del vehículo</strong> (trámites de RNA) o la{' '}
                    <strong>categoría de licencia</strong> (trámites de RNC).
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                    <li>Finalidad: gestionar tu trámite, mantenerte informado de su avance por WhatsApp y emitir los soportes correspondientes.</li>
                    <li>La cédula se usa exclusivamente para los trámites que la exigen ante el organismo de tránsito y el RUNT.</li>
                    <li>Conservamos estos datos durante la relación comercial; puedes solicitar su supresión cuando dejen de ser necesarios.</li>
                  </ul>
                </li>

                <li className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <strong className="block text-slate-900 mb-1">Notificaciones por WhatsApp y seguimiento en línea</strong>
                  <p className="mb-2">
                    Al contratar un trámite autorizas que te enviemos <strong>notificaciones por
                    WhatsApp</strong> sobre el avance de tu trámite (recibido, en proceso, aprobado,
                    entregado o cancelado) al teléfono que nos proporcionaste. Estos envíos se realizan
                    a través de la API oficial de WhatsApp Business (Meta) y quedan registrados
                    internamente para auditoría.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                    <li>Puedes pedir que dejemos de enviarte notificaciones en cualquier momento respondiendo al mismo chat o escribiendo a {BUSINESS.email}.</li>
                    <li>
                      El <strong>seguimiento en línea</strong> funciona con un código aleatorio que solo tú
                      recibes. La página de seguimiento muestra el tipo de trámite, la placa, la ciudad,
                      el estado y las fechas — <strong>nunca muestra tu nombre, cédula, teléfono ni valores
                      del servicio</strong>.
                    </li>
                  </ul>
                </li>

                <li className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <strong className="block text-slate-900 mb-1">Formulario de cotización</strong>
                  Nombre, tipo de trámite, ciudad y descripción del caso. Estos datos son procesados
                  en el dispositivo del usuario y enviados directamente a WhatsApp mediante un enlace
                  generado en el navegador. No transitan ni se almacenan en nuestros servidores.
                </li>

                <li className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <strong className="block text-slate-900 mb-1">Chatbot y Validador de caso</strong>
                  Los mensajes enviados al asistente virtual son procesados de forma temporal por
                  nuestra función de servidor y enviados a la API de OpenAI Inc. para generar la
                  respuesta. No se almacena ningún historial de conversación. El procesamiento es
                  estrictamente en tiempo real y transitorio.
                </li>

                <li className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <strong className="block text-slate-900 mb-1">Formulario de descuento en comparendos</strong>
                  <p className="mb-2">
                    Nombre, teléfono, tipo y fecha del comparendo y, opcionalmente, cédula y número
                    del comparendo. El porcentaje de descuento se calcula localmente en tu navegador.
                    Al enviar el formulario, estos datos se convierten en un mensaje de WhatsApp que
                    se abre en tu dispositivo — igual que el formulario de cotización general.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                    <li>Estos datos no transitan ni se almacenan en nuestros servidores ni en base de datos alguna — solo llegan a nuestro WhatsApp cuando envías el mensaje.</li>
                  </ul>
                </li>

                <li className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <strong className="block text-slate-900 mb-1">Reseñas de clientes</strong>
                  <p className="mb-2">
                    Cuando un cliente envía una reseña a través del sitio, recopilamos su{' '}
                    <strong>nombre</strong> y <strong>correo electrónico</strong>. Estos datos se
                    almacenan en nuestra base de datos con el único propósito de publicar y gestionar
                    las reseñas que aparecen en el sitio web.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                    <li>El <strong>nombre</strong> puede aparecer visible en la reseña publicada.</li>
                    <li>
                      El <strong>correo electrónico nunca es visible</strong> para otros usuarios del
                      sitio ni se muestra en ninguna parte pública — se mantiene de forma interna
                      únicamente para verificación de identidad y contacto ante solicitudes de
                      modificación o eliminación de la reseña.
                    </li>
                    <li>
                      Estos datos <strong>no son distribuidos, cedidos, vendidos ni compartidos</strong>{' '}
                      con terceros bajo ninguna circunstancia.
                    </li>
                    <li>
                      El titular puede solicitar la modificación o eliminación de su reseña y sus
                      datos en cualquier momento escribiendo a{' '}
                      <a href={`mailto:${BUSINESS.email}`} className="text-brand-700 hover:underline">
                        {BUSINESS.email}
                      </a>.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Terceros que intervienen</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Supabase Inc.</strong> — Base de datos en la nube donde se almacenan
                  los datos de clientes y trámites, y las reseñas. Los datos se almacenan en
                  servidores ubicados en Estados Unidos bajo el estándar de seguridad SOC 2.
                  Supabase actúa como encargado del tratamiento, sin acceso ni uso propio de los datos.
                </li>
                <li>
                  <strong>WhatsApp / Meta Platforms Inc.</strong> — Plataforma de mensajería hacia
                  la que se redirige la información de los formularios de cotización, y a través de
                  cuya API oficial (WhatsApp Business Platform) enviamos las notificaciones de avance
                  de trámites a los clientes que contrataron nuestro servicio. Su tratamiento se rige
                  por la política de privacidad de WhatsApp.
                </li>
                <li>
                  <strong>OpenAI Inc.</strong> — Proveedor del modelo de inteligencia artificial
                  que procesa las conversaciones del chatbot. OpenAI procesa los mensajes conforme
                  a sus propios términos de servicio.
                </li>
                <li>
                  <strong>Vercel Inc.</strong> — Plataforma de alojamiento del sitio web. Vercel
                  recopila métricas de uso anónimas (páginas visitadas, tiempos de carga) sin
                  identificar personalmente al usuario, conforme a su política de privacidad.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies y análisis de tráfico</h2>
              <p>
                Este sitio web no utiliza cookies propias de rastreo ni herramientas como
                Google Analytics. Utilizamos <strong>Vercel Analytics</strong>, que recopila métricas
                de rendimiento y tráfico de forma <strong>anónima y agregada</strong>, sin identificar
                individualmente a los usuarios ni almacenar información personal.
                Vercel puede utilizar cookies técnicas estrictamente necesarias para el funcionamiento
                de la infraestructura (caché, seguridad).
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
                Las solicitudes de acceso, rectificación o supresión serán atendidas en un plazo
                de <strong>10 días hábiles</strong> a través del correo{' '}
                <strong>{BUSINESS.email}</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Seguridad</h2>
              <p>
                El sitio opera bajo protocolo HTTPS con cabeceras de seguridad estrictas
                (Content-Security-Policy, HSTS). Los datos almacenados en Supabase están protegidos
                mediante cifrado en tránsito (TLS) y en reposo, con políticas de acceso por fila
                (Row Level Security) que impiden el acceso no autorizado: los datos de clientes y
                trámites solo son accesibles para el personal autorizado de Tramita Yopal, con
                perfiles de acceso diferenciados según el rol. Los formularios públicos cuentan con
                límites anti-abuso. El correo electrónico de los autores de reseñas nunca se expone
                en las interfaces públicas del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Cambios a esta política</h2>
              <p>
                Tramita Yopal se reserva el derecho de actualizar esta política en cualquier momento.
                Los cambios serán publicados en esta misma página con la fecha de actualización.
                El uso continuado del sitio implica la aceptación de la versión vigente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contacto</h2>
              <p>Para cualquier consulta relacionada con el tratamiento de sus datos personales:</p>
              <p className="mt-2">
                Correo: <a href={`mailto:${BUSINESS.email}`} className="text-brand-700 hover:underline">{BUSINESS.email}</a><br />
                Dirección: {BUSINESS.location}, Colombia<br />
                Horario: {BUSINESS.hours.full}
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
