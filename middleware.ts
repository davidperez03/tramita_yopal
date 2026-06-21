import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session  = request.cookies.get('admin_session')?.value;
  const expected = `ty_admin_${process.env.ADMIN_PASSWORD}`;
  const { pathname } = request.nextUrl;

  // Deja pasar la página /admin sin cookie (muestra el login)
  if (pathname === '/admin') {
    if (session && session === expected) return NextResponse.next();
    // Si hay cookie inválida, la borra antes de mostrar el login
    if (session && session !== expected) {
      const res = NextResponse.next();
      res.cookies.delete('admin_session');
      return res;
    }
    return NextResponse.next();
  }

  // Cualquier sub-ruta de /admin requiere cookie válida
  if (pathname.startsWith('/admin/')) {
    if (!session || session !== expected) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
