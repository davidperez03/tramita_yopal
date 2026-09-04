import { NextResponse } from 'next/server';
import { BUSINESS } from '@/lib/constants';
import { CITIES, SEO_SERVICES } from '@/lib/seo-data';
import { GUIAS } from '@/lib/guias';

const KEY  = process.env.INDEXNOW_KEY ?? 'tramitayopal2024';
const HOST = BUSINESS.domain;

export async function GET() {
  const base = `https://${HOST}`;

  const urls = [
    base,
    `${base}/rna`,
    `${base}/rnc`,
    `${base}/comparendos`,
    `${base}/tramites`,
    `${base}/prescripcion-comparendos`,
    `${base}/descuento-comparendo`,
    `${base}/guias`,
    ...GUIAS.map((g) => `${base}/guias/${g.slug}`),
    ...SEO_SERVICES.flatMap((s) =>
      CITIES.map((c) => `${base}/tramites/${s.slug}/${c.slug}`)
    ),
  ];

  const body = { host: HOST, key: KEY, keyLocation: `${base}/${KEY}.txt`, urlList: urls };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ submitted: urls.length, status: res.status });
  } catch {
    return NextResponse.json({ error: 'IndexNow failed' }, { status: 500 });
  }
}
