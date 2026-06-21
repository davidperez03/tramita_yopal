import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-gold-400 font-bold text-sm tracking-widest uppercase mb-4">Error 404</p>
          <h1 className="text-5xl font-extrabold text-white mb-4">Página no encontrada</h1>
          <p className="text-brand-300 text-lg mb-8 leading-relaxed">
            La página que buscas no existe o fue movida. Vuelve al inicio para continuar.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
