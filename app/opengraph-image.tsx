import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tramita Yopal — Trámites vehiculares en Yopal, Casanare';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1e1b4b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Patrón diagonal sutil */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: 'repeating-linear-gradient(45deg,#f59e0b 0px,#f59e0b 1px,transparent 1px,transparent 20px)',
          }}
        />

        {/* Badge ubicación */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24' }} />
          <span style={{ color: '#fbbf24', fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
            YOPAL, CASANARE
          </span>
        </div>

        {/* Título principal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#ffffff', lineHeight: 1.05 }}>
            Tus trámites
            <br />
            vehiculares{' '}
            <span style={{ color: '#fbbf24' }}>sin enredos</span>
          </div>
          <div style={{ fontSize: 28, color: '#a5b4fc', fontWeight: 400, maxWidth: 700 }}>
            Gestión 100% remota desde Yopal · Validación previa gratuita · Tarjeta a domicilio
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: '#ffffff', fontSize: 32, fontWeight: 900 }}>Tramita Yopal</span>
            <span style={{ color: '#818cf8', fontSize: 18 }}>tramitayopal.com</span>
          </div>

          {/* Servicios */}
          <div style={{ display: 'flex', gap: 10 }}>
            {['Traspaso', 'Prenda', 'Placas', 'Comparendos'].map((s) => (
              <div
                key={s}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: '8px 16px',
                  color: '#c7d2fe',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
