import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cagdasproyapi.com'; // Burayı gerçek domain ile değiştirirsin

  const staticPages = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/e-katalog',
    '/hap-bilgiler',
    '/galeri',
    '/urunler/giyotin-tam-balkon',
    '/urunler/katlanir-sistem-cam-balkon',
    '/urunler/bioklimatik-pergola',
    '/urunler/ruzgar-kirici-sistem',
    '/urunler/kis-bahcesi',
    '/urunler/dusakabin-sistemleri',
    '/urunler/cam-kapi-sistemleri',
    '/urunler/kompozit-cephe-sistemleri',
    '/urunler/pvc-cam-sistemleri',
    '/urunler/kupeste-modelleri',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticPages];
}
