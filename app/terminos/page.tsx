import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Tramita Yopal',
  description: 'Términos y condiciones del servicio de gestión de trámites vehiculares de Tramita Yopal.',
  robots: { index: false, follow: false },
};

export default function Terminos() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-slate-400 text-sm mb-10">
            Última actualización: junio de 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Descripción del servicio</h2>
              <p>
                <strong>Tramita Yopal</strong> es un servicio de gestión y asesoría en trámites
                vehiculares operado desde {BUSINESS.location}, Colombia. Actuamos como intermediarios
                entre el usuario y los organismos de tránsito competentes, facilitando la presentación
                de documentos y el seguimiento de trámites.
              </p>
              <p className="mt-2">
                <strong>No somos un organismo de tránsito ni una entidad gubernamental.</strong> Somos
                una empresa privada de servicios que gestiona trámites en representación del usuario.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Alcance del servicio</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Asesoría sobre documentos requeridos para cada trámite vehicular.</li>
                <li>Verificación previa del estado del vehículo, propietario y posibles impedimentos.</li>
                <li>Gestión presencial del trámite ante el organismo de tránsito de Yopal, Casanare.</li>
                <li>Envío de la tarjeta de propiedad al domicilio del cliente en territorio colombiano.</li>
                <li>Verificación gratuita de multas y comparendos por número de cédula.</li>
                <li>Tramitación de prescripción de comparendos de tránsito cuando aplique.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Limitaciones del servicio</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Vehículos fuera de Yopal:</strong> Tramita Yopal está especializado en el
                  organismo de tránsito de Yopal. Para vehículos matriculados en otras ciudades,
                  evaluamos caso a caso y notificamos al usuario si el servicio no es viable.
                </li>
                <li>
                  <strong>Impedimentos descubiertos:</strong> Si durante la validación previa se
                  detectan prendas, multas o restricciones que impidan el trámite, Tramita Yopal
                  informará al usuario antes de cobrar cualquier honorario. El cliente decidirá
                  si procede a resolver los impedimentos.
                </li>
                <li>
                  <strong>Tiempos del organismo:</strong> Los tiempos de resolución dependen
                  exclusivamente del organismo de tránsito y pueden variar. Los plazos informados
                  son estimados y no constituyen garantía.
                </li>
                <li>
                  <strong>Prescripción de comparendos:</strong> La verificación es gratuita pero
                  el resultado depende del historial real del usuario. La declaración de prescripción
                  tiene un costo separado que se cotiza individualmente.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cotizaciones y pagos</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Todas las cotizaciones son gratuitas y sin compromiso.</li>
                <li>
                  Los honorarios de Tramita Yopal se informan antes de iniciar el trámite y
                  no incluyen los derechos de tránsito, impuestos ni costos del organismo, los
                  cuales son variables y dependen del organismo de tránsito.
                </li>
                <li>
                  El pago de honorarios se acuerda individualmente mediante WhatsApp antes de
                  iniciar cualquier gestión.
                </li>
                <li>
                  Medios de pago aceptados: Nequi, Daviplata, Bancolombia, transferencia bancaria
                  y efectivo.
                </li>
                <li>No se cobran anticipos sin autorización expresa del cliente.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Responsabilidad del usuario</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  El usuario es responsable de la veracidad y autenticidad de los documentos
                  que entrega a Tramita Yopal para la gestión del trámite.
                </li>
                <li>
                  La entrega de documentos falsos o adulterados es responsabilidad exclusiva
                  del usuario y puede constituir un delito conforme al Código Penal colombiano.
                </li>
                <li>
                  El usuario debe informar cualquier condición especial del vehículo o del
                  trámite que pueda afectar el proceso.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Chatbot e IA</h2>
              <p>
                El asistente virtual y el validador de caso del sitio web utilizan inteligencia
                artificial (OpenAI) para orientar al usuario. Las respuestas son
                informativas y <strong>no constituyen asesoría jurídica ni garantía de resultado</strong>.
                Para información vinculante, el usuario debe comunicarse directamente con un asesor
                de Tramita Yopal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Propiedad intelectual</h2>
              <p>
                Todos los contenidos del sitio web (textos, diseño, código, estructura) son propiedad
                de Tramita Yopal. Queda prohibida su reproducción total o parcial sin autorización escrita.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Ley aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de la República de Colombia. Cualquier
                controversia será resuelta ante los jueces competentes de {BUSINESS.location},
                Colombia, con renuncia a cualquier otro fuero que pudiera corresponder.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contacto</h2>
              <p>
                📧 <a href="mailto:info@tramitayopal.com" className="text-brand-700 hover:underline">info@tramitayopal.com</a><br />
                📱 {BUSINESS.phone}<br />
                📍 {BUSINESS.location}, Colombia
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
