import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';

// El resto del contenido de marketing (quiénes somos, proceso, garantías,
// reseñas, FAQ, contacto...) vive dentro de /rna, /rnc y /comparendos —
// la home solo presenta y deja escoger categoría, sin saturar con todo
// junto. Las guías sí van aquí: no son de una sola categoría.
const GuidesTeaser = dynamic(() => import('@/components/sections/GuidesTeaser'));
const QuoteForm    = dynamic(() => import('@/components/sections/QuoteForm'));
const Footer       = dynamic(() => import('@/components/layout/Footer'));
const ChatBot      = dynamic(() => import('@/components/layout/ChatBot'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <GuidesTeaser />
        <QuoteForm />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
