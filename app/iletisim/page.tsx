import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import LivePreviewWrapper from '@/components/public/LivePreviewWrapper';

const DEFAULT_SECTIONS = [
  {
    pageSlug: 'iletisim',
    type: 'page_header',
    order: 0,
    isVisible: true,
    title: 'İletişim Sayfa Başlığı',
    content: { title: 'İletişim', subtitle: 'Size Bir Telefon Kadar Yakınız' }
  },
  {
    pageSlug: 'iletisim',
    type: 'contact',
    order: 1,
    isVisible: true,
    title: 'İletişim Bilgileri',
    content: { 
      sectionTitle: 'Bize Ulaşın',
      address: 'Piri Mehmet Paşa Mah. Burhan Soyaslan Cad. No: 20/A Silivri / İstanbul',
      phone: '0507 916 57 07',
      whatsapp: '905079165707',
      instagram: 'albertgenau_cagdaspro',
      email: 'info@cagdasproyapi.com',
      workingHours: 'Pazartesi–Cumartesi: 09:00–19:00',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3!2d28.2438394!3d41.0770615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b5153dffc233f9%3A0x412e31643c326a5a!2sALBERT%20GENAU%20CAGDAS%20PRO%20YAPI!5e0!3m2!1str!2str!4v1715000000000!5m2!1str!2str'
    }
  },
  {
    pageSlug: 'iletisim',
    type: 'quote_form',
    order: 2,
    isVisible: true,
    title: 'Teklif Al Formu',
    content: { 
      sectionTitle: 'Fiyat Teklifi İsteyin', 
      whatsapp: '905079165707',
      services: [
        'Cam Balkon',
        'Kış Bahçesi',
        'Duşakabin',
        'Cam Kapı',
        'Çelik Konstrüksiyon',
        'Bioklimatik Pergola',
        'Rüzgar Kırıcı Sistem',
        'Diğer Hizmetler'
      ]
    }
  }
];

async function getSections() {
  try {
    await connectDB();
    let sections = await Section.find({ pageSlug: 'iletisim' }).sort({ order: 1 }).lean();
    if (!sections || sections.length === 0) {
      sections = await Section.create(DEFAULT_SECTIONS);
    }
    return JSON.parse(JSON.stringify(sections));
  } catch (err) {
    console.error('Error fetching contact sections:', err);
    return [];
  }
}

export default async function ContactPage() {
  const sections = await getSections();

  return (
    <main>
      <Navbar />
      <LivePreviewWrapper initialSections={sections} />
      <Footer />
    </main>
  );
}
