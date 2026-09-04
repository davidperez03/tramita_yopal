import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';

// El resto del contenido de marketing (quiénes somos, proceso, garantías,
// reseñas, FAQ, contacto...) vive dentro de /rna, /rnc y /comparendos —
// la home solo presenta y deja escoger categoría, sin saturar con todo
// junto. Ver esas páginas para ese contenido.
const QuoteForm = dynamic(() => import('@/components/QuoteForm'));
const Footer    = dynamic(() => import('@/components/Footer'));
const ChatBot   = dynamic(() => import('@/components/ChatBot'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <QuoteForm />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
