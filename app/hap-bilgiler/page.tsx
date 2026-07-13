import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import LivePreviewWrapper from '@/components/public/LivePreviewWrapper';

const DEFAULT_SECTIONS = [
  {
    pageSlug: 'hap-bilgiler',
    type: 'page_header',
    order: 0,
    isVisible: true,
    title: 'Hap Bilgiler Sayfa Başlığı',
    content: { title: 'Hap Bilgiler', subtitle: 'Pratik ve Teknik Bilgilendirmeler' }
  },
  {
    pageSlug: 'hap-bilgiler',
    type: 'hap_bilgiler',
    order: 1,
    isVisible: true,
    title: 'Pratik Bilgiler (Hap Bilgiler) Listesi',
    content: {
      sectionSubtitle: 'Ürünlerimizle ilgili pratik kullanım ve teknik bilgilendirme dosyaları.',
      items: [
        { title: 'SlideMaster Sürme Cambalkon', description: 'Albert Genau - SlideMaster Sürme Cambalkon pratik kullanım rehberi.', file: '/hap-bilgiler/slidemaster-surme.pdf' },
        { title: 'Tambalkon Giyotin Cam', description: 'Albert Genau - Tambalkon Giyotin Cam balkon pratik kullanım rehberi.', file: '/hap-bilgiler/tambalkon-giyotin.pdf' },
        { title: 'Tiara Katlanır Cambalkon', description: 'Albert Genau - Tiara Katlanır Cambalkon pratik kullanım rehberi.', file: '/hap-bilgiler/tiara-katlanir.pdf' },
        { title: 'Cambalkon Seçim Rehberi', description: 'Cambalkon seçerken dikkat edilmesi gereken teknik detaylar.', file: '/hap-bilgiler/cambalkon-rehberi.pdf' }
      ]
    }
  }
];

async function getSections() {
  try {
    await connectDB();
    let sections = await Section.find({ pageSlug: 'hap-bilgiler' }).sort({ order: 1 }).lean();
    if (!sections || sections.length === 0) {
      sections = await Section.create(DEFAULT_SECTIONS);
    }
    return JSON.parse(JSON.stringify(sections));
  } catch (err) {
    console.error('Error fetching hap-bilgiler sections:', err);
    return [];
  }
}

export default async function HapBilgilerPage() {
  const sections = await getSections();

  return (
    <main>
      <Navbar />
      <LivePreviewWrapper initialSections={sections} />
      <Footer />
    </main>
  );
}
