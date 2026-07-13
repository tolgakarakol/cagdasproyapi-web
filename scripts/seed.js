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
              image: '/images/biyoklimatik-balkon.png',
              title: 'Bioklimatik Pergola',
              subtitle: 'Motorlu alüminyum lamel sistemi ile dört mevsim açık hava konforu.',
              ctaText: 'HEMEN KEŞFET',
              ctaLink: '/urunler/bioklimatik-pergola'
            },
            {
              image: '/images/slides/slider_kis_bahcesi.png',
              title: 'Kış Bahçesi',
              subtitle: 'Doğayla iç içe, her mevsim yaşayan cam ve çelik konstrüksiyon sistemleri.',
              ctaText: 'İNCELE',
              ctaLink: '/urunler/kis-bahcesi'
            },
            {
              image: '/images/giyotin-balkon-banner.png',
              title: 'Giyotin Cam Balkon',
              subtitle: 'Silinebilir akıllı cam balkon sistemleri ile manzaranızı kesmeyin.',
              ctaText: 'TÜM ÜRÜNLERİ GÖR',
              ctaLink: '/urunler/giyotin-tam-balkon'
            }
          ]
        }
      },
      {
        pageSlug: 'home', type: 'products_grid', title: 'Ürünlerimiz', order: 1, isVisible: true,
        content: {
          sectionSubtitle: 'Albert Genau yetkili bayisi olarak premium çözümler sunuyoruz.',
          products: [
            {
              id: 'giyotin-tam-balkon',
              title: 'Giyotin Cam Balkon',
              description: 'Silinebilir akıllı cam balkon sistemi.',
              image: '/images/products/giyotin_final.jpg'
            },
            {
              id: 'bioklimatik-pergola',
              title: 'Bioklimatik Pergola',
              description: 'Açılır-kapanır konforlu tavan sistemleri.',
              image: '/images/products/pergola_final.jpg'
            },
            {
              id: 'katlanir-sistem-cam-balkon',
              title: 'Katlanır Cam Balkon',
              description: 'Geniş manzara, tam açılım sağlayan sistemler.',
              image: '/images/products/katlanir_teknik.jpg'
            }
          ]
        }
      },
      {
        pageSlug: 'home', type: 'guarantee_band', title: 'Garanti Bandı', order: 2, isVisible: true,
        content: {
          guarantees: [
            { icon: 'fa-regular fa-circle-check', title: '10 Yıl Garanti', subtitle: 'Paslanmazlık ve çalışma garantisi.' },
            { icon: 'fa-regular fa-star', title: 'Yetkili Bayi', subtitle: 'Albert Genau resmi teknik servis desteği.' },
            { icon: 'fa-regular fa-clock', title: 'Hızlı Montaj', subtitle: 'Deneyimli ekiplerle zamanında teslimat.' },
            { icon: 'fa-regular fa-comments', title: '7/24 Destek', subtitle: 'Satış sonrası kesintisiz müşteri hizmetleri.' }
          ]
        }
      }
    ]);
    console.log('✅ Ana sayfa bölümleri oluşturuldu');
  }

  // --- Diğer Sayfaların Bölümleri ---
  const otherPages = [
    {
      pageSlug: 'hakkimizda', type: 'about', title: 'Hakkımızda Hikayemiz', order: 0, isVisible: true,
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
      pageSlug: 'e-katalog', type: 'catalogs', title: 'Katalog Listesi', order: 0, isVisible: true,
      content: {
        sectionTitle: 'E-Katalog',
        sectionSubtitle: 'Ürün kataloglarımızı inceleyin veya indirin',
        catalogs: [
          { title: 'Genel Ürün Kataloğu', file: 'albert-genau-2023.pdf', cover: '/images/catalogs/urun-katalogu.png' },
          { title: 'Bioklimatik Pergola', file: 'bioklimatik-pergola.pdf', cover: '/images/catalogs/bioklimatik-pergola.png' },
          { title: 'Hareketli Cephe Sistemleri', file: 'hareketli-cephe.pdf', cover: '/images/catalogs/hareketli-cephe.png' },
          { title: 'Giyotin Cam Sistemleri', file: 'giyotin-cam-sistemleri.pdf', cover: '/images/catalogs/giyotin-sistem.png' },
          { title: 'SlideMaster Sürme Sistem', file: 'slidemaster-surme.pdf', cover: '/images/catalogs/isicamli-surme.png' },
          { title: 'Yeni Nesil Cam Balkon', file: 'yeni-nesil-cam-balkon.pdf', cover: '/images/catalogs/yeni-nesil-cam-balkon.png' },
          { title: 'Isıcamlı Cam Balkon', file: 'tiara-twinmax.pdf', cover: '/images/catalogs/isicamli-balkon.png' },
        ]
      }
    },
    {
      pageSlug: 'iletisim', type: 'contact', title: 'İletişim Bilgileri', order: 0, isVisible: true,
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
      pageSlug: 'iletisim', type: 'quote_form', title: 'Teklif Formu', order: 1, isVisible: true,
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

  for (const p of otherPages) {
    const exists = await Section.findOne({ pageSlug: p.pageSlug, type: p.type });
    if (!exists) {
      await Section.create(p);
      console.log(`✅ ${p.pageSlug} sayfa bölümü (${p.type}) oluşturuldu`);
    }
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
