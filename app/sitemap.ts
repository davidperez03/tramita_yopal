import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/lib/constants';
import { CITIES, SEO_SERVICES } from '@/lib/seo-data';
import { GUIAS } from '@/lib/guias';

const base = `https://${BUSINESS.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const cityServicePages = SEO_SERVICES.flatMap((service) =>
    CITIES.map((city) => ({
      url: `${base}/tramites/${service.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: city.isOfficeCity ? 0.85 : 0.75,
    }))
  );

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/tramites`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${base}/prescripcion-comparendos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/guias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...GUIAS.map((g) => ({
      url: `${base}/guias/${g.slug}`,
      lastModified: new Date(g.actualizado),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...cityServicePages,
  ];
}
