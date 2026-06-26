import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ProductClient from './ProductClient';
import { Metadata } from 'next';

const PRODUCT_SEO_DATA: any = {
  'giyotin-tam-balkon': {
    title: 'Silivri Giyotin Cam Balkon | Tambalkon® Silinebilir Sistemler',
    description: 'Silivri ve çevresinde tam otomatik, silinebilir giyotin cam balkon sistemleri. Albert Genau Tambalkon ile konforu yaşayın. Ücretsiz keşif için hemen arayın.',
  },
  'bioklimatik-pergola': {
    title: 'Silivri Bioklimatik Pergola | Açılır Kapanır Tavan Sistemleri',
    description: 'Modern tasarımlı, motorlu bioklimatik pergola sistemleri. Silivri, Selimpaşa ve Gümüşyaka bölgelerinde profesyonel montaj ve 10 yıl garanti.',
  },
  'kis-bahcesi': {
    title: 'Silivri Kış Bahçesi Tasarımları | Çağdaş Pro Yapı',
    description: 'Evinize değer katan lüks kış bahçesi çözümleri. Cam tavan ve ısı yalıtımlı sistemler ile her mevsim bahçe keyfi.',
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = PRODUCT_SEO_DATA[slug] || {
    title: 'Silivri Cam Balkon & Pergola Sistemleri',
    description: 'Albert Genau kalitesiyle Silivri ve tüm İstanbul genelinde profesyonel cam sistemleri çözümleri.'
  };

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main>
      <Navbar />
      <ProductClient slug={slug} />
      <Footer />
    </main>
  );
}
