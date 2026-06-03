import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Validator from '@/components/Validator';
import Services from '@/components/Services';
import Process from '@/components/Process';
import QuoteForm from '@/components/QuoteForm';
import WhyUs from '@/components/WhyUs';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

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
        <QuoteForm />
        <WhyUs />
        {/* <Reviews /> — se activa cuando haya reseñas reales */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
