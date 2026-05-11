import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cagdasproyapi.com'; // Burayı gerçek domain ile değiştirirsin

  const staticPages = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/e-katalog',
    '/hap-bilgiler',
    '/urunler/giyotin-tam-balkon',
    '/urunler/katlanir-sistem-cam-balkon',
    '/urunler/bioklimatik-pergola',
    '/urunler/kis-bahcesi',
    '/urunler/dusakabin-sistemleri',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticPages];
}
