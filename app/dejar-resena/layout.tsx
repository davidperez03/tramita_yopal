import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deja tu reseña | Tramita Yopal',
  description: 'Comparte tu experiencia con el servicio de Tramita Yopal.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
