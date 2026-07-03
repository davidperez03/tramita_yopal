import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Componentes above-fold — carga inmediata
import AboutUs from '@/components/AboutUs';
import Validator from '@/components/Validator';
import Services from '@/components/Services';

// Componentes below-fold — carga diferida
const Process          = dynamic(() => import('@/components/Process'));
const TrackingPromo    = dynamic(() => import('@/components/TrackingPromo'));
const PaymentGuarantee = dynamic(() => import('@/components/PaymentGuarantee'));
const QuoteForm        = dynamic(() => import('@/components/QuoteForm'));
const WhyUs            = dynamic(() => import('@/components/WhyUs'));
const Reviews          = dynamic(() => import('@/components/Reviews'));
const GuidesTeaser     = dynamic(() => import('@/components/GuidesTeaser'));
const FAQ       = dynamic(() => import('@/components/FAQ'));
const Contact   = dynamic(() => import('@/components/Contact'));
const Footer    = dynamic(() => import('@/components/Footer'));
const ChatBot   = dynamic(() => import('@/components/ChatBot'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Validator />
        <Services />
        <Process />
        <TrackingPromo />
        <PaymentGuarantee />
        <QuoteForm />
        <WhyUs />
        <Reviews />
        <GuidesTeaser />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
