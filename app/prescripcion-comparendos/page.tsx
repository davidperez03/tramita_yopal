import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrescripcionPage from '@/components/PrescripcionPage';

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Prescripción de Comparendos en Yopal | Tramita Yopal',
  description:
    '¿Tienes multas de tránsito de más de 3 años sin pagar? Pueden estar prescritas y ya no debes pagarlas. Tramitamos la prescripción de comparendos en Yopal, Casanare. Consulta gratis.',
  keywords: [
    'prescripción comparendos Yopal',
    'prescripción multas Yopal',
    'comparendos prescritos Casanare',
    'prescripción infracciones tránsito Colombia',
    'cómo prescribir comparendo',
    'multas vencidas Yopal',
    'tramitar prescripción comparendo Yopal',
    'comparendos de más de 3 años',
  ],
  alternates: {
    canonical: `${siteUrl}/prescripcion-comparendos`,
  },
  openGraph: {
    title: 'Prescripción de Comparendos en Yopal | Tramita Yopal',
    description:
      '¿Multas de más de 3 años sin pagar? En Colombia los comparendos prescriben. Te ayudamos a tramitar la prescripción en Yopal, Casanare.',
    url: `${siteUrl}/prescripcion-comparendos`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Prescripción de Comparendos de Tránsito',
    description:
      'Tramitación de la declaración de prescripción de comparendos de tránsito para infracciones de más de 3 años. Servicio presencial en el organismo de tránsito de Yopal, Casanare.',
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      telephone: `+${BUSINESS.whatsapp}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Yopal',
        addressRegion: 'Casanare',
        addressCountry: 'CO',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Yopal',
      containedInPlace: { '@type': 'State', name: 'Casanare' },
    },
    serviceType: 'Prescripción de Comparendos',
    offers: {
      '@type': 'Offer',
      description: 'Verificación gratuita. Cotización del proceso si aplica prescripción.',
      priceCurrency: 'COP',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuándo prescribe un comparendo de tránsito en Colombia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las infracciones de tránsito prescriben a los 3 años contados desde la fecha en que se impuso el comparendo, siempre que la autoridad no haya iniciado el cobro coactivo en ese plazo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa si no tramito la prescripción aunque la multa ya venció?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sin la declaración formal de prescripción, la multa sigue activa en los sistemas de tránsito y puede bloquear un traspaso, un traslado de cuenta o la expedición del paz y salvo vehicular.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo sé si mis comparendos están prescritos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ingresa tu número de cédula en el formulario y te revisamos gratis si tienes comparendos y cuáles llevan más de 3 años sin cobrar. Si aplica prescripción, te cotizamos el proceso.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo tarda tramitar la prescripción?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El proceso en el organismo de tránsito de Yopal tarda entre 15 y 30 días hábiles dependiendo del volumen de casos. Te informamos el tiempo exacto en tu cotización.',
        },
      },
    ],
  },
];

export default function PrescripcionRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <PrescripcionPage />
      </main>
      <Footer />
    </>
  );
}
