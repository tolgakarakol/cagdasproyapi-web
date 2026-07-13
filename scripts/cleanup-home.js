const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://tolgakarakol_db_user:Cagdas2026@cluster0.zuy4t94.mongodb.net/cagdasproyapi?appName=Cluster0';

const SectionSchema = new mongoose.Schema({}, { strict: false });
const Section = mongoose.models.Section || mongoose.model('Section', SectionSchema);

async function clean() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Delete unwanted sections from home page
  const result = await Section.deleteMany({
    pageSlug: 'home',
    type: { $nin: ['hero_slider', 'products_grid', 'guarantee_band'] }
  });
  console.log(`Deleted ${result.deletedCount} unwanted sections from home page`);

  // Reset hero_slider on home
  await Section.findOneAndUpdate(
    { pageSlug: 'home', type: 'hero_slider' },
    {
      title: 'Ana Slider',
      order: 0,
      isVisible: true,
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
    { upsert: true }
  );
  console.log('Reset hero_slider');

  // Reset products_grid on home
  await Section.findOneAndUpdate(
    { pageSlug: 'home', type: 'products_grid' },
    {
      title: 'Ürünlerimiz',
      order: 1,
      isVisible: true,
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
    { upsert: true }
  );
  console.log('Reset products_grid');

  // Reset guarantee_band on home
  await Section.findOneAndUpdate(
    { pageSlug: 'home', type: 'guarantee_band' },
    {
      title: 'Garanti Bandı',
      order: 2,
      isVisible: true,
      content: {
        guarantees: [
          { icon: 'fa-regular fa-circle-check', title: '10 Yıl Garanti', subtitle: 'Paslanmazlık ve çalışma garantisi.' },
          { icon: 'fa-regular fa-star', title: 'Yetkili Bayi', subtitle: 'Albert Genau resmi teknik servis desteği.' },
          { icon: 'fa-regular fa-clock', title: 'Hızlı Montaj', subtitle: 'Deneyimli ekiplerle zamanında teslimat.' },
          { icon: 'fa-regular fa-comments', title: '7/24 Destek', subtitle: 'Satış sonrası kesintisiz müşteri hizmetleri.' }
        ]
      }
    },
    { upsert: true }
  );
  console.log('Reset guarantee_band');

  console.log('Cleanup finished successfully!');
  process.exit(0);
}

clean().catch(err => { console.error(err); process.exit(1); });
