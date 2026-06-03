import { NextResponse } from 'next/server';
import { BUSINESS } from '@/lib/constants';
import { CITIES, SEO_SERVICES } from '@/lib/seo-data';

const KEY = 'tramitayopal2024';
const HOST = BUSINESS.domain;

export async function GET() {
  const base = `https://${HOST}`;

  const urls = [
    base,
    `${base}/prescripcion-comparendos`,
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
