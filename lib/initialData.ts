export const INITIAL_SECTIONS = [
  {
    _id: 'hero',
    type: 'hero_slider',
    content: {
      slides: [
        {
          image: '/images/slides/slider_bioklimatik.png',
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
          image: '/images/giyotin-cam-balkon.png',
          title: 'Giyotin Cam Balkon',
          subtitle: 'Silinebilir akıllı cam balkon sistemleri ile manzaranızı kesmeyin.',
          ctaText: 'TÜM ÜRÜNLERİ GÖR',
          ctaLink: '/urunler/giyotin-tam-balkon'
        }
      ]
    }
  },
  {
    _id: 'products',
    type: 'products_grid',
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
    _id: 'guarantee',
    type: 'guarantee_band',
    content: {
      guarantees: [
        { icon: 'fa-regular fa-circle-check', title: '10 Yıl Garanti', subtitle: 'Paslanmazlık ve çalışma garantisi.' },
        { icon: 'fa-regular fa-star', title: 'Yetkili Bayi', subtitle: 'Albert Genau resmi teknik servis desteği.' },
        { icon: 'fa-regular fa-clock', title: 'Hızlı Montaj', subtitle: 'Deneyimli ekiplerle zamanında teslimat.' },
        { icon: 'fa-regular fa-comments', title: '7/24 Destek', subtitle: 'Satış sonrası kesintisiz müşteri hizmetleri.' }
      ]
    }
  }
];
