import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import LivePreviewWrapper from '@/components/public/LivePreviewWrapper';

const DEFAULT_SECTIONS = [
  {
    _id: 'catalogs_fallback_id',
    pageSlug: 'e-katalog',
    type: 'catalogs',
    isVisible: true,
    content: {
      sectionTitle: 'E-Katalog',
      sectionSubtitle: 'Ürün kataloglarımızı inceleyin veya indirin',
      catalogs: [
        { title: 'Genel Ürün Kataloğu', file: '/catalogs/albert-genau-2023.pdf', cover: '/images/catalogs/urun-katalogu.png' },
        { title: 'Bioklimatik Pergola', file: '/catalogs/bioklimatik-pergola.pdf', cover: '/images/catalogs/bioklimatik-pergola.png' },
        { title: 'Hareketli Cephe Sistemleri', file: '/catalogs/hareketli-cephe.pdf', cover: '/images/catalogs/hareketli-cephe.png' },
        { title: 'Giyotin Cam Sistemleri', file: '/catalogs/giyotin-cam-sistemleri.pdf', cover: '/images/catalogs/giyotin-sistem.png' },
        { title: 'SlideMaster Sürme Sistem', file: '/catalogs/slidemaster-surme.pdf', cover: '/images/catalogs/isicamli-surme.png' },
        { title: 'Yeni Nesil Cam Balkon', file: '/catalogs/yeni-nesil-cam-balkon.pdf', cover: '/images/catalogs/yeni-nesil-cam-balkon.png' },
        { title: 'Isıcamlı Cam Balkon', file: '/catalogs/tiara-twinmax.pdf', cover: '/images/catalogs/isicamli-balkon.png' }
      ]
    }
  }
];

async function getSections() {
  try {
    await connectDB();
    const sections = await Section.find({ pageSlug: 'e-katalog', isVisible: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(sections));
  } catch (err) {
    console.error('Error fetching catalog sections:', err);
    return [];
  }
}

export default async function CatalogsPage() {
  const dbSections = await getSections();
  const sections = dbSections && dbSections.length > 0 ? dbSections : DEFAULT_SECTIONS;

  return (
    <main>
      <Navbar />
      <PageHeader title="E-Katalog" subtitle="Ürünlerimizi Detaylı İnceleyin" />
      <LivePreviewWrapper initialSections={sections} />
      <Footer />
    </main>
  );
}
