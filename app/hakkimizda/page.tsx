import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import LivePreviewWrapper from '@/components/public/LivePreviewWrapper';

const DEFAULT_SECTIONS = [
  {
    pageSlug: 'hakkimizda',
    type: 'page_header',
    order: 0,
    isVisible: true,
    title: 'Hakkımızda Sayfa Başlığı',
    content: { title: 'Hakkımızda', subtitle: '15 Yıllık Deneyim & Güven' }
  },
  {
    pageSlug: 'hakkimizda',
    type: 'about',
    order: 1,
    isVisible: true,
    title: 'Hakkımızda Özeti',
    content: {
      sectionTitle: 'Hikayemiz',
      heading: 'Sektörün Öncü\nÇözüm Ortağı',
      body: 'Çağdaş Pro Yapı olarak 15 yıldır Silivri merkezli tüm Türkiye\'ye Albert Genau kalitesini taşıyoruz. Profesyonel ekibimiz ve müşteri odaklı yaklaşımımızla yaşam alanlarınıza değer katıyoruz.',
      stats: [
        { value: '15', label: 'Yıl Deneyim' },
        { value: '500', label: 'Proje' },
        { value: '12', label: 'Uzman Ekip' },
        { value: '100', label: 'Memnuniyet' }
      ],
      hideButton: true
    }
  },
  {
    pageSlug: 'hakkimizda',
    type: 'about_story',
    order: 2,
    isVisible: true,
    title: 'Hikayemiz Detay',
    content: {
      title: 'Camın Alüminyumla Sanatsal Buluşması',
      p1: 'Çağdaş Pro Yapı olarak 15 yılı aşkın süredir, yaşam alanlarınızı daha geniş, daha aydınlık ve daha konforlu hale getirmek için çalışıyoruz. Silivri merkezli kurulan şirketimiz, bugün tüm Türkiye\'ye Albert Genau\'nun premium kalitesini taşıyan lider uygulayıcı bayilerden biri konumundadır.',
      p2: 'Bir cam balkondan veya kış bahçesinden çok daha fazlasını inşa ediyoruz. Doğanın güzelliğini dört mevsim evinize taşıyan, zorlu hava koşullarına meydan okuyan ve mimari estetiği kusursuzlaştıran özel yaşam alanları tasarlıyoruz. Her bir projemizde mühendislik disiplinini ve zanaatkar hassasiyetini bir araya getiriyoruz.',
      p3: 'Güvenlik, yalıtım ve şıklık bizim için birer opsiyon değil, standarttır.',
      image: '/images/products/katlanir_balkon_hero_v4.jpg'
    }
  },
  {
    pageSlug: 'hakkimizda',
    type: 'about_values',
    order: 3,
    isVisible: true,
    title: 'Temel Değerlerimiz',
    content: {
      title: 'Temel Değerlerimiz',
      values: [
        { icon: 'fas fa-award', title: 'Ödün Verilmeyen Kalite', desc: 'Albert Genau kalitesini Avrupa standartlarındaki montaj işçiliğimizle birleştiriyor, sıfır hata prensibiyle projelerimizi teslim ediyoruz.' },
        { icon: 'fas fa-handshake', title: 'Koşulsuz Güven', desc: 'Satış öncesi ve sonrası sunduğumuz şeffaf süreç yönetimi, garanti belgeli ürünlerimizle müşterilerimizle ömürlük bir güven inşa ediyoruz.' },
        { icon: 'fas fa-leaf', title: 'Estetik ve İnovasyon', desc: 'Teknolojiyi yakından takip eden uzman ekibimizle, modern mimarinin gereksinimlerini karşılayan estetik tasarımlara imza atıyoruz.' }
      ]
    }
  },
  {
    pageSlug: 'hakkimizda',
    type: 'about_mv',
    order: 4,
    isVisible: true,
    title: 'Vizyon & Misyon',
    content: {
      visionTitle: 'Vizyonumuz',
      visionText: 'Türkiye\'nin her köşesinde, mimari yapılara değer katan ve insanların yaşam konforunu artıran yenilikçi cam sistemleri uygulamalarında akla gelen ilk, en güvenilir marka olmak. Geleceğin mimarisini bugünden balkonlarınıza taşımak.',
      missionTitle: 'Misyonumuz',
      missionText: 'En ileri teknolojiyi ve en dayanıklı malzemeleri (Albert Genau) kullanarak, estetikten ödün vermeden, müşteri beklentilerinin de ötesinde, tam zamanında ve kusursuz işçilikle teslim edilen projeler üretmek. Mutlu yuvalar ve ferah çalışma alanları inşa etmek.'
    }
  }
];

async function getSections() {
  try {
    await connectDB();
    let sections = await Section.find({ pageSlug: 'hakkimizda' }).sort({ order: 1 }).lean();
    if (!sections || sections.length === 0) {
      sections = await Section.create(DEFAULT_SECTIONS);
    }
    return JSON.parse(JSON.stringify(sections));
  } catch (err) {
    console.error('Error fetching about sections:', err);
    return [];
  }
}

export default async function AboutPage() {
  const sections = await getSections();

  return (
    <main>
      <Navbar />
      <LivePreviewWrapper initialSections={sections} />
      <Footer />
    </main>
  );
}
