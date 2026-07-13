const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = 'mongodb+srv://tolgakarakol_db_user:Cagdas2026@cluster0.zuy4t94.mongodb.net/cagdasproyapi?appName=Cluster0';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  
  console.log('✅ MongoDB bağlantısı kuruldu');

  // --- Admin (create-admin.js tarafından yapıldığı için devre dışı bırakıldı) ---

  // --- Settings ---
  const SettingsSchema = new mongoose.Schema({}, { strict: false });
  const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
  await Settings.findOneAndUpdate({}, {
    siteName: 'Çağdaş Pro Yapı',
    siteDescription: 'Albert Genau Yetkili Bayisi',
    phone: '0507 916 57 07',
    whatsapp: '905079165707',
    instagram: 'albertgenau_cagdaspro',
    address: 'Piri Mehmet Paşa Mahallesi, Burhan Soyaslan Caddesi 20/A, Silivri/İstanbul',
    workingHours: 'Pazartesi–Cumartesi: 09:00–19:00',
    mapLat: 41.0770615,
    mapLng: 28.2438394,
    metaTitle: 'Çağdaş Pro Yapı – Albert Genau Yetkili Bayisi | Cam Balkon & Pergola Sistemleri',
    metaDescription: 'Cam balkon, bioklimatik pergola, kış bahçesi ve cam sistemlerinde Albert Genau yetkili bayisi. 15 yıllık deneyim, Silivri/İstanbul merkezli tüm Türkiye hizmet.',
  }, { upsert: true });
  console.log('✅ Site ayarları oluşturuldu');

  // --- Appearance ---
  const AppearanceSchema = new mongoose.Schema({}, { strict: false });
  const Appearance = mongoose.models.Appearance || mongoose.model('Appearance', AppearanceSchema);
  await Appearance.findOneAndUpdate({}, {
    primaryColor: '#1a1a2e',
    accentColor: '#c8960c',
    bgColor: '#0f0f1a',
    textColor: '#f0f0f0',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    logoUrl: '/images/cagdas_pro_yapi_logo.png',
  }, { upsert: true });
  console.log('✅ Görünüm ayarları oluşturuldu');

  // --- Menus ---
  const MenuSchema = new mongoose.Schema({}, { strict: false });
  const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema);
  const menuCount = await Menu.countDocuments();
  if (menuCount === 0) {
    await Menu.insertMany([
      { label: 'Anasayfa', href: '/', order: 0, isVisible: true, isExternal: false, children: [] },
      { label: 'Ürünlerimiz', href: '#urunler', order: 1, isVisible: true, isExternal: false, children: [
        { label: 'Giyotin Cam Balkon', href: '#urunler', order: 0, isExternal: false },
        { label: 'Katlanır Sistem Cam Balkon', href: '#urunler', order: 1, isExternal: false },
        { label: 'Bioklimatik Pergola', href: '#urunler', order: 2, isExternal: false },
        { label: 'Rüzgar Kırıcı Sistem', href: '#urunler', order: 3, isExternal: false },
        { label: 'Kış Bahçesi', href: '#urunler', order: 4, isExternal: false },
        { label: 'Duşakabin Sistemleri', href: '#urunler', order: 5, isExternal: false },
        { label: 'Cam Kapı Sistemleri', href: '#urunler', order: 6, isExternal: false },
      ]},
      { label: 'Hakkımızda', href: '#hakkimizda', order: 2, isVisible: true, isExternal: false, children: [] },
      { label: 'E-Katalog', href: '#katalog', order: 3, isVisible: true, isExternal: false, children: [] },
      { label: 'Hap Bilgiler', href: '#hapbilgiler', order: 4, isVisible: true, isExternal: false, children: [] },
      { label: 'İletişim', href: '#iletisim', order: 5, isVisible: true, isExternal: false, children: [] },
    ]);
    console.log('✅ Menüler oluşturuldu');
  }

  // --- Sections ---
  const SectionSchema = new mongoose.Schema({}, { strict: false });
  const Section = mongoose.models.Section || mongoose.model('Section', SectionSchema);
  const sectionCount = await Section.countDocuments({ pageSlug: 'home' });
  if (sectionCount === 0) {
    await Section.insertMany([
      {
        pageSlug: 'home', type: 'hero_slider', title: 'Ana Slider', order: 0, isVisible: true,
        content: {
          slides: [
            {
              image: '/images/slides/bioklimatik.jpg',
              title: 'Bioklimatik Pergola Sistemleri',
              subtitle: 'Dört mevsim konfor. Akıllı havalandırma, modern estetik.',
              ctaText: 'Teklif Al',
              ctaLink: '#teklif',
            },
            {
              image: '/images/slides/kis-bahcesi.jpg',
              title: 'Kış Bahçesi Sistemleri',
              subtitle: 'Doğayı içeri taşıyın. Her mevsim, her hava şartında keyifli yaşam alanları.',
              ctaText: 'Teklif Al',
              ctaLink: '#teklif',
            },
            {
              image: '/images/giyotin-balkon-banner.png',
              title: 'Giyotin Cam Balkon Sistemleri',
              subtitle: '5 yıl paslanmaz, 2 yıl sistem garantisi. Albert Genau kalitesiyle.',
              ctaText: 'Teklif Al',
              ctaLink: '#teklif',
            },
          ]
        }
      },
      {
        pageSlug: 'home', type: 'products_grid', title: 'Ürünlerimiz', order: 1, isVisible: true,
        content: {
          sectionTitle: 'Ürünlerimiz',
          sectionSubtitle: 'Albert Genau yetkili bayisi olarak sunduğumuz premium yapı sistemleri',
          products: [
            { id: 'giyotin', title: 'Giyotin Cam Balkon', subtitle: 'Tambalkon Silinebilir Sistem', icon: '🏠', description: 'Cam panellerin birbirinin içinden geçerek katlanmasıyla maksimum açıklık. Temizlenebilir, estetik ve dayanıklı.', image: '/images/products/giyotin.jpg', tag: '2+5 Yıl Garanti' },
            { id: 'katlanir', title: 'Katlanır Sistem Cam Balkon', subtitle: 'Tiara & TwinMax Serisi', icon: '🌿', description: 'Katlanır mekanizma ile balkonunuzu istediğinizde tamamen açın, istediğinizde kapatın.', image: '/images/products/katlanir.jpg', tag: '2+5 Yıl Garanti' },
            { id: 'bioklimatik', title: 'Bioklimatik Pergola', subtitle: 'Akıllı Havalandırma Sistemi', icon: '☀️', description: 'Motor kontrollü lamel sistemi. Güneş, rüzgar, yağmur sensörleri ile otomatik çalışma seçeneği.', image: '/images/products/bioklimatik.jpg', tag: 'Premium Sistem' },
            { id: 'ruzgar-kirici', title: 'Rüzgar Kırıcı Sistem', subtitle: 'Airflex Serisi', icon: '💨', description: 'Açık alanlarınızı rüzgardan koruyun. Şeffaf cam paneller ile görünümü bozmadan maksimum konfor.', image: '/images/products/ruzgar-kirici.jpg', tag: 'Özel Tasarım' },
            { id: 'kis-bahcesi', title: 'Çelik Konstrüksiyon & Kış Bahçesi', subtitle: 'Özel Tasarım Sistemler', icon: '❄️', description: 'Çelik taşıyıcı sistem üzerine cam kaplamalı kış bahçesi. 4 mevsim kullanılabilir konforlu yaşam alanı.', image: '/images/products/kis-bahcesi.jpg', tag: 'Özel Proje' },
            { id: 'dusakabin', title: 'Duşakabin Sistemleri', subtitle: 'Banyo Cam Sistemleri', icon: '🚿', description: 'Temperli güvenlik camı, paslanmaz profiller. Sabit, sürgülü, pivot kapı seçenekleri.', image: '/images/products/dusakabin.jpg', tag: 'İç Mekan' },
            { id: 'cam-kapi', title: 'Cam Kapı Sistemleri', subtitle: 'Hareketli Cam Duvarlar', icon: '🚪', description: 'Ofis, mağaza ve villa girişleri için estetik cam kapı ve cam duvar sistemleri.', image: '/images/products/cam-kapi.jpg', tag: 'Ticari & Konut' },
          ]
        }
      },
      {
        pageSlug: 'home', type: 'guarantee_band', title: 'Garanti Bandı', order: 2, isVisible: true,
        content: {
          guarantees: [
            { icon: '🛡️', title: '2 Yıl Sistem Garantisi', subtitle: 'Albert Genau güvencesiyle' },
            { icon: '⚙️', title: '5 Yıl Paslanmaz Garanti', subtitle: 'Profil ve aksamlarda' },
            { icon: '🏆', title: '15 Yıl Sektör Deneyimi', subtitle: 'Uzman ekibimizle' },
            { icon: '🚀', title: 'Tüm Türkiye Hizmet', subtitle: 'Silivri/İstanbul merkezli' },
          ]
        }
      },
      {
        pageSlug: 'home', type: 'about', title: 'Hakkımızda', order: 3, isVisible: true,
        content: {
          sectionTitle: 'Hakkımızda',
          heading: '15 Yıllık Deneyim,\nProfesyonel Ekip',
          body: 'Çağdaş Pro Yapı olarak 2009 yılından bu yana alüminyum ve cam sistemleri sektöründe hizmet vermekteyiz. Albert Genau yetkili bayisi sıfatıyla, Silivri/İstanbul merkezimizden tüm Türkiye\'ye ulaşan 12 kişilik uzman ekibimizle müşterilerimize en kaliteli çözümleri sunuyoruz.',
          stats: [
            { value: '15', suffix: '+', label: 'Yıl Deneyim' },
            { value: '12', suffix: '', label: 'Uzman Ekip' },
            { value: '500', suffix: '+', label: 'Tamamlanan Proje' },
            { value: '100', suffix: '%', label: 'Müşteri Memnuniyeti' },
          ],
          badges: ['Albert Genau Yetkili Bayisi', 'Silivri / İstanbul', 'Tüm Türkiye Hizmet'],
        }
      },
      {
        pageSlug: 'home', type: 'partners', title: 'Çözüm Ortaklarımız', order: 4, isVisible: true,
        content: {
          sectionTitle: 'Çözüm Ortaklarımız',
          brands: [
            { name: 'Albert Genau', logo: '/images/brands/albert-genau.png' },
            { name: 'Kömmerling', logo: '/images/brands/kommerling.png' },
            { name: 'Schuco', logo: '/images/brands/schuco.png' },
            { name: 'Winsa', logo: '/images/brands/winsa.png' },
            { name: 'Egepen', logo: '/images/brands/egepen.png' },
            { name: 'Pimapen', logo: '/images/brands/pimapen.png' },
            { name: 'Asaş', logo: '/images/brands/asas.png' },
          ]
        }
      },
      {
        pageSlug: 'home', type: 'catalogs', title: 'E-Katalog', order: 5, isVisible: true,
        content: {
          sectionTitle: 'E-Katalog',
          sectionSubtitle: 'Ürün kataloglarımızı inceleyin veya indirin',
          catalogs: [
            { title: 'Albert Genau 2023 Ana Katalog', file: '/e-katalog/Albert_Genau_-_2023_-TR.pdf', size: '9.4 MB' },
            { title: 'Bioklimatik Pergola Kataloğu', file: '/e-katalog/Albert-Genau-Bioklimatik-Pergola-Katalogu+2.pdf', size: '2.3 MB' },
            { title: 'Atrium Momentum Centrum Camlama', file: '/e-katalog/Albert_Genau_Atrium_Momentum_Centrum_Camlama_Sistemleri.pdf', size: '9.5 MB' },
            { title: 'Isıcamlı Giyotin Sistem — Vertiflex Twin', file: '/e-katalog/Albert_Genau_Isicam_li_Giyotin_Sistemi_Vertiflex_Twin.pdf', size: '17 MB' },
            { title: 'SlideMaster Dijital Katalog', file: '/e-katalog/SlideMaster_Dijital.pdf', size: '3.8 MB' },
            { title: 'Tiara TwinMax Brochure', file: '/e-katalog/Tiara_Twinmax_Brosur_A3_digital_.pdf', size: '5.1 MB' },
            { title: 'Tiara 08-10 Kataloğu', file: '/e-katalog/tiara08-10web.pdf', size: '5.5 MB' },
          ]
        }
      },
      {
        pageSlug: 'home', type: 'hap_bilgiler', title: 'Hap Bilgiler', order: 6, isVisible: true,
        content: {
          sectionTitle: 'Hap Bilgiler',
          sectionSubtitle: 'Cam balkon yaptırmadan önce bilmeniz gerekenler',
          items: [
            { title: 'Albert Genau SlideMaster Sürme Cambalkon', file: '/hapbilgiler/Albert Genau - SlideMaster Sürme Cambalkon Sistemi.pdf', description: 'SlideMaster sürme cam balkon sisteminin teknik özellikleri ve kullanım kılavuzu.' },
            { title: 'Albert Genau Tambalkon Giyotin Cam Sistemi', file: '/hapbilgiler/Albert Genau - Tambalkon Giyotin Cam Sistemi.pdf', description: 'Tambalkon giyotin cam sisteminin detaylı teknik bilgileri.' },
            { title: 'Albert Genau Tiara Katlanır Cambalkon', file: '/hapbilgiler/Albert Genau - Tiara Katlanır Cambalkon Sistemi.pdf', description: 'Tiara katlanır cam balkon sisteminin özellikleri ve kurulum bilgileri.' },
            { title: 'Cambalkon Yaptırırken Dikkat Etmeniz Gerekenler', file: '/hapbilgiler/Cambalkon Yaptırırken Dikkat Etmeniz Gerekenler.pdf', description: 'Cam balkon yaptırmadan önce mutlaka okumanız gereken önemli bilgiler.' },
          ]
        }
      },
      {
        pageSlug: 'home', type: 'quote_form', title: 'Teklif Al', order: 7, isVisible: true,
        content: {
          sectionTitle: 'Ücretsiz Teklif Alın',
          sectionSubtitle: 'Formu doldurun, WhatsApp üzerinden anında iletişime geçelim',
          whatsapp: '905079165707',
          services: [
            'Giyotin Cam Balkon',
            'Katlanır Sistem Cam Balkon',
            'Bioklimatik Pergola',
            'Rüzgar Kırıcı Sistem',
            'Kış Bahçesi',
            'Duşakabin Sistemleri',
            'Cam Kapı Sistemleri',
            'Diğer',
          ]
        }
      },
      {
        pageSlug: 'home', type: 'contact', title: 'İletişim', order: 8, isVisible: true,
        content: {
          sectionTitle: 'İletişim',
          address: 'Piri Mehmet Paşa Mahallesi, Burhan Soyaslan Caddesi 20/A, Silivri/İstanbul',
          phone: '0507 916 57 07',
          whatsapp: '905079165707',
          instagram: 'albertgenau_cagdaspro',
          workingHours: 'Pazartesi–Cumartesi: 09:00–19:00',
          mapLat: 41.0770615,
          mapLng: 28.2438394,
          mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3!2d28.2438394!3d41.0770615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b5153dffc233f9%3A0x412e31643c326a5a!2sALBERT%20GENAU%20CAGDAS%20PRO%20YAPI!5e0!3m2!1str!2str!4v1715000000000!5m2!1str!2str',
        }
      },
    ]);
    console.log('✅ Ana sayfa bölümleri oluşturuldu');
  }

  // --- Home page ---
  const PageSchema = new mongoose.Schema({}, { strict: false });
  const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
  const homeExists = await Page.findOne({ slug: 'home' });
  if (!homeExists) {
    await Page.create({
      title: 'Anasayfa',
      slug: 'home',
      isVisible: true,
      showInMenu: false,
      metaTitle: 'Çağdaş Pro Yapı – Albert Genau Yetkili Bayisi | Cam Balkon & Pergola',
      metaDescription: 'Cam balkon, bioklimatik pergola, kış bahçesi ve cam sistemlerinde Albert Genau yetkili bayisi. 15 yıllık deneyim.',
      order: 0,
    });
    console.log('✅ Ana sayfa oluşturuldu');
  }

  console.log('\n🎉 Seed tamamlandı!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
