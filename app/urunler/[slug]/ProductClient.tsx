'use client';
import styles from './product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, use } from 'react';

const PRODUCT_DATA: any = {
  'giyotin-tam-balkon': {
    badge: 'Albert Genau — Tambalkon®',
    heroTitle: 'Giyotin Tam Balkon',
    heroSub: 'Minimal profiliyle görünmez, panoramik görüşüyle fark edilir.',
    heroImg: '/images/giyotin-cam-balkon.png',
    tagline: 'Minimal profiliyle görünmez, panoramik görüşüyle fark edilir.\nİçerisiyle dışarısı arasındaki çizgiyi siler. Bu sadece bir cam balkon değil. Bu, Tambalkon®.',
    features: [
      { img: '/images/products/giyotin_remote.png', title: 'Tam Otomatik Kumandalı', desc: 'Bir tuşla açın, kapatın, kontrol tamamen sizde.' },
      { img: '/images/products/giyotin_panoramic.png', title: 'Yer Kazandıran Tasarım', desc: 'Açıldığında tüm alanı kazanırsınız.' }
    ],
    safetyImg: '/images/products/giyotin_safety.png',
    cleaningImg: '/images/products/giyotin_cleaning.png',
    cleaningSteps: ['Uzaktan kumanda ile açın.', 'Push butonlara basın.', 'Hafif eğimli konuma getirip silin.'],
    darkFeatures: [
      { icon: 'fas fa-shield-halved', title: 'Maksimum Yalıtım', desc: 'EPDM conta ve kıl fırça birleşimi.' },
      { icon: 'fas fa-pen-ruler', title: 'Estetik ve Fonksiyonel', desc: 'Minimalist tasarım and mükemmel fonksiyon.' },
      { icon: 'fas fa-wind', title: 'Havalandırma Seçenekleri', desc: 'İdeal havalandırma kontrolü.' }
    ],
    testimonials: [
      { text: 'Balkonum artık her gün kullanılabilir durumda.', name: 'Seda A.', city: 'İstanbul' },
      { text: 'Görüntü kesintisiz, temizliği de çok pratik.', name: 'Murat K.', city: 'İzmir' },
      { text: 'Kumandalı olması büyük rahatlık sağlıyor.', name: 'Gizem Y.', city: 'Ankara' }
    ]
  },
  'bioklimatik-pergola': {
    badge: 'Albert Genau — Bioklimatik',
    heroTitle: 'Bioklimatik Pergola',
    heroSub: 'Motorlu alüminyum lameller ile dört mevsim açık hava konforu.',
    heroImg: '/images/slides/slider_bioklimatik.png',
    tagline: 'Pergola, bioklimatik pergola ya da bioklimatik pergola fiyatları... Pergola ile ilgili aranan her şeyi yeniledik. Dünya’nın 86 ülkesinde 500’ün üzerinde üretici bayisi ile sektör lideri Albert Genau, yeni nesil bioklimatik pergola sistemini tasarladı. Tüm detaylarıyla, %100 Albert Genau…',
    features: [
      { img: '/images/products/pergola_hero.jpg', title: 'Makaslı Sistem', desc: 'Bioklimatik pergolanın panelleri, makas sistemi ile birbirine bağlanarak senkronize bir şekilde açılıp kapanma hareketi gerçekleştirir ve her türlü ortamda güvenilir performans sunar.' },
      { img: '/images/products/pergola_final.jpg', title: 'Monoblok Oluk', desc: 'Çift katmanlı yapısı ile ekstra dayanıklıdır. Kenet mekanizması ile montajı kolay olan oluk, monoblok oluşuyla su yalıtımını ve drenajını engellemeyecek şekilde tasarlanmıştır.' },
      { img: '/images/products/pergola_v2.jpg', title: 'Kesintisiz Oval Dikme', desc: 'Geleneksel pergola sistemlerinden farklı olarak dikmelerin görünümünü estetik ve fonksiyonel olarak çeşitlendirir. Kesintisiz bir dikme görünümü sunar.' }
    ],
    safetyImg: '/images/products/pergola_hero.jpg',
    sections: [
      {
        type: 'text_image',
        title: 'Bioklimatik Pergola Nedir?',
        content: 'Pergola, gölgelendirme amaçlı yapılmış çatı sistemlerinin genel adıdır. Bioklimatik pergola, alüminyum lamellerden oluşan çatı sistemine sahip, motor ve uzaktan kumanda ile bu çatı sisteminin lamellerinin hareket ettirildiği gölgelendirme yapısıdır. Eski nesil bioklimatik pergolaların aksine, yeni nesil sistemler çok daha esnek ve dayanıklı çözümler sunar.',
        image: '/images/products/pergola_v2.jpg',
        reverse: false
      },
      {
        type: 'text_image',
        title: 'Albert Genau Bioklimatik Pergola Sistemi',
        content: 'Albert Genau Biokimatik Pergola Sistemi, tek motor ve uzaktan kumanda ile hareket eder. Pergola sisteminin lamellerin senkronize hareketi, özel tasarım makas sistemi ile sağlanır. Kendi kendine ayakta durabilen sistem, her türlü iklim koşullarında sorunsuz ve konforlu kullanım için tasarlanmıştır.\n\nBahçenizde ve terasınızda, bioklimatik pergola sistemleri kurabilir, etrafını yine Albert Genau hareketli cambalkon sitemleri ile kapatarak keyifli mekanlar oluşturabilirsiniz.',
        image: '/images/products/pergola_final.jpg',
        reverse: true
      },
      {
        type: 'highlight',
        title: 'Bioklimatik Pergola… Ama Markası Ne?',
        content: 'Günümüzde pergola sistemlerinin bileşenleri markasız ya da toplama sistemler ile satılabilmektedir. Sistemin bileşenleri ayrı ayrı toplandığından, bütün olarak işlevde eksiklikler olabilmektedir. O yüzden bioklimatik pergola sistemini yaptırırken mutlaka markasını, garanti süresi ve koşullarını sorunuz. Mevsimlik firmalardan uzak durunuz.',
        badge: '%100 Güven'
      },
      {
        type: 'grid',
        title: 'Teknik Detaylar ve Üstünlükler',
        items: [
          { title: 'Adaptif Hareket', desc: 'Kurulum veya kullanım esnasında oluşabilecek hataları etkin bir şekilde sönümleyerek panellerin hareketini kontrol altında tutar.', icon: 'fas fa-sync' },
          { title: 'Sonsuz Modülasyon', desc: 'Özel tasarım kiriş ve bağlantı sistemleri ile çok geniş açıklıkları maksimum özgürlük ve kolaylıkla geliştirebilirsiniz.', icon: 'fas fa-expand-arrows-alt' },
          { title: '5,5 Metre Dikmesiz Açıklık', desc: 'Destek kirişi uygulaması sayesinde tam 5,5 metreye kadar ekstra dikmeye gerek olmadan ulaşılabilir.', icon: 'fas fa-arrows-alt-h' },
          { title: 'İklimlendirme Modları', desc: 'Güneşlenme, havalandırma ve tam izolasyon gibi seçenekler arasında istenen açıklık miktarını ayarlayabilirsiniz.', icon: 'fas fa-cloud-sun' },
          { title: 'Çift Yönlü İzolasyon', desc: 'Her bir panelde çift katmanlı izolasyon (hem conta hem fırça) kullanılarak su, ışık ve hava girişi tamamen engellenir.', icon: 'fas fa-shield-alt' },
          { title: 'Yalıtım Dolgulu Panel', desc: 'Yüksek yoğunluklu XPS dolgu malzemesi ile hem ısı hem de akustik yalıtım sunarak konforu artırır.', icon: 'fas fa-volume-mute' }
        ]
      }
    ],
    darkFeatures: [
      { icon: 'fas fa-tint', title: 'Üstün Performans', desc: 'Sürekli Ağır Yağmur Durumu (108 l.m2/h) testlerini başarıyla geçmiştir.' },
      { icon: 'fas fa-paint-roller', title: 'Qualicoat Boya', desc: 'Kirlenmesi zor, temizlenmesi kolay, soft-touch özellikli QualiCoat belgeli boya.' },
      { icon: 'fas fa-shield-halved', title: 'Paslanmaz Aksesuarlar', desc: 'Tüm aksamlar paslanmaz özelliktedir ve korozyon dayanımına sahiptir.' },
      { icon: 'fas fa-leaf', title: 'Yaprak Tutucu', desc: 'Oluğun içine entegre edilmiş yaprak tutucu ile su gideri tıkanmalarına karşı tam koruma.' },
      { icon: 'fas fa-lightbulb', title: 'Ambiyans Aydınlatma', desc: 'Çoklu modlara sahip, ayarlanabilir renk spektrumlu çift yönlü aydınlatma seçeneği.' },
      { icon: 'fas fa-hard-hat', title: 'T6 Alüminyum', desc: 'T6 termik seviyeli güçlendirilmiş profiller ile yüksek taşıma kapasitesi ve sağlamlık.' }
    ],
    testimonials: [
      { text: 'Terasımız artık her mevsim bizimle.', name: 'Ahmet Y.', city: 'İstanbul' },
      { text: 'Sensörler harika çalışıyor, yağmur başlayınca kendisi kapanıyor.', name: 'Zeynep L.', city: 'Muğla' },
      { text: 'Işıklandırması çok şık duruyor.', name: 'Burak T.', city: 'Bursa' }
    ]
  },
  'tiara-twinmax': {
    isCategory: false,
    featured: true,
    badge: 'Albert Genau — Tiara Twinmax®',
    heroTitle: 'Isıcamlı Cam Balkonun Zirvesi',
    heroSub: 'Türkiye\'nin En Çok Tercih Edilen Isıcamlı Sistemi.',
    heroImg: '/images/products/twinmax_hero.jpg',
    tagline: 'Isıcamlı cambalkon sistemlerinde ulaşılmış en üst düzey yalıtımla tanışın. Albert Genau teknolojisiyle balkonunuzu dört mevsim yaşanır bir odaya dönüştürün.',
    features: [
      { img: '/images/products/twinmax_insulation.jpg', title: '5 Kat Daha Fazla Yalıtım', desc: 'Tek cama göre 5.1 kata varan ısı yalıtımı performansı.' },
      { img: '/images/products/twinmax_lock.jpg', title: 'Konfor Kilit Sistemi', desc: 'Gömme kollu tasarımıyla ekstra güvenlik ve estetik bir arada. Pencere kadar güvenli.' },
      { img: '/images/products/twinmax_test.jpg', title: 'Avrupa Test Sertifikalı', desc: 'Hava, su, rüzgar dayanımında ulaşılan en yüksek sınıflar.' }
    ],
    safetyImg: '/images/products/twinmax_clean.jpg',
    cleaningImg: '/images/products/twinmax_clean.jpg',
    cleaningSteps: ['Kanatları toplayarak sistemi açın.', 'Menteşeli yapı sayesinde her iki tarafı da silin.', 'Pürüzsüz profilleri nemli bezle temizleyin.'],
    darkFeatures: [
      { icon: 'fas fa-shield-virus', title: 'Mıknatıslı Conta Sistemi', desc: 'Mıknatıslı birleşimlerle maksimum izolasyon.' },
      { icon: 'fas fa-sync', title: 'ABL Fren Mekanizması', desc: 'Kanatların sarkmasını engelleyen otomatik kilitleme.' },
      { icon: 'fas fa-window-restore', title: 'Jaluzi Perde Uyumu', desc: 'Isıcam arası jaluzi perde opsiyonu.' }
    ],
    testimonials: [
      { text: 'Balkonumuz evin en sevilen odası oldu.', name: 'Hakan B.', city: 'İstanbul' },
      { text: 'Isı yalıtımı gerçekten fark ediyor.', name: 'Derya S.', city: 'Tekirdağ' },
      { text: 'Montaj ekibi çok ilgiliydi, teşekkürler.', name: 'Caner T.', city: 'Sakarya' }
    ]
  },
  'tiara-08-10': {
    badge: 'Albert Genau — Tiara®',
    heroTitle: 'Tek Camlı Katlanır Cam Balkon',
    heroSub: 'Balkonunuzu Evinizin En Kullanışlı Odasına Dönüştürün.',
    heroImg: '/images/products/tiara_hero.jpg',
    tagline: 'Tiara, uzun yıllar teknik servise ihtiyaç duymadan kullanılmak üzere geliştirilmiş, 38 Avrupa ülkesinde patenti olan yeni nesil bir cam sistemidir. Maksimum panoramik görüntü ve eşsiz konforu bir arada sunar.',
    features: [
      { img: '/images/products/tiara_wheels.jpg', title: '38 mm Durdurulamaz Hareket', desc: 'Altta 4, üstte 4 olmak üzere toplam 8 adet %100 paslanmaz tekerlek sistemi ile en az sürtünme ve ses.' },
      { img: '/images/products/tiara_pins.jpg', title: 'Güvenli Cam Pimi Sistemi', desc: 'Kanat birleşimleri sadece kimyasal ile değil, cama monte edilen özel pimler ile sağlanır. Maksimum taşıma kapasitesi sunar.' },
      { img: '/images/products/katlanir_tek_camli.jpg', title: 'Alüminyum İzolasyon Fitilleri', desc: 'Kendinden fırçalı alüminyum fitiller ile düz veya açılı tüm birleşimlerde uzun ömürlü ve şık yalıtım.' }
    ],
    safetyImg: '/images/products/katlanir_balkon_hero_v4.jpg',
    cleaningImg: '/images/products/katlanir_balkon_hero_v4.jpg',
    cleaningSteps: [
      'Tüm cam panelleri içeriye doğru tek tek açın.',
      'Sistemin pürüzsüz yapısı sayesinde dışarı sarkmadan içeriden her iki yüzeyi de kolayca silin.',
      'Alüminyum profilleri nemli bir bezle zahmetsizce temizleyin.'
    ],
    darkFeatures: [
      { icon: 'fas fa-shield-halved', title: 'Avrupa Patentli Teknoloji', desc: '38 Avrupa ülkesinde geçerli EPO patentli, tescilli Albert Genau kalitesi.' },
      { icon: 'fas fa-tint-slash', title: 'Gizli Su Tahliye Kanalı', desc: 'Kasa profili üzerindeki gizli buhar kanalı ile hem kozmetik hem verimli su tahliyesi.' },
      { icon: 'fas fa-sync', title: 'ABL Otomatik Fren Kilidi', desc: 'Paneller park alanına geldiğinde otomatik kilitlenir, kanadın yerinden oynamasını engeller.' },
      { icon: 'fas fa-lock', title: 'Estetik Topuzlu Kilit', desc: 'Minimalist tasarım ve kullanım kolaylığı sağlayan özel kilit mekanizması.' },
      { icon: 'fas fa-child', title: 'Entegre Çocuk Kilidi', desc: 'Menteşeli paneller üzerine entegre edilebilen AG patentli çocuk emniyet sistemi.' },
      { icon: 'fas fa-check-circle', title: '10 Yıl Paslanmazlık Garantisi', desc: '%100 paslanmaz malzeme ile üretilen aksamlar için on yıl garanti.' }
    ],
    tests: [
      { icon: 'fas fa-droplet', title: 'SU TESTİ', desc: "Tiara Balkon Camlama Sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, su geçirgenliği testine tabi tutulup, Avrupa Birliği normlarına göre Class 2A sınıfını elde etti." },
      { icon: 'fas fa-wind', title: 'RÜZGAR GEÇİRGENLİĞİ TESTİ', desc: "Tiara Balkon Camlama sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, rüzgar geçirgenliği testine tabi tutulup, Avrupa Birliği normlarına göre Class 2 sınıfını elde etti." },
      { icon: 'fas fa-hand-fist', title: 'DARBE DAYANIKLILIK TESTİ', desc: "Tiara Balkon Camlama Sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, darbe dayanıklılık testine tabi tutulup, Avrupa Birliği normlarına göre Class I2/E5 sınıfını elde etti." },
      { icon: 'fas fa-gauge-high', title: 'RÜZGAR YÜKÜ TESTİ', desc: "Tiara Balkon Camlama sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, rüzgar yükü testine tabi tutulup, Avrupa Birliği normlarına göre Class 3 sınıfını elde etti." }
    ],
    testimonials: [
      { text: 'Sinpaş İncek Life projesinde kullanıldı, kalitesi ve rüzgar dayanımı gerçekten takdire şayan.', name: 'Proje Müdürü', city: 'Ankara' },
      { text: 'Zincirli kilitlerle uğraşmamak harika. Konfor kilit sistemi çok estetik.', name: 'Mehmet R.', city: 'Bursa' },
      { text: 'Panoramik görüntüsü muazzam, balkonun her köşesinden manzara kesintisiz.', name: 'Ebru Ö.', city: 'İzmir' }
    ]
  },
  'tiara-flat-slim-zero': {
    badge: 'Albert Genau — Tiara Flat/Slim/Zero®',
    heroTitle: 'Eşiksiz Kayar Katlanır',
    heroSub: 'Mekanlarınızda Sınırları Kaldırın, Konforu Keşfedin.',
    heroImg: '/images/products/pergola_final.jpg',
    tagline: 'Yeni nesil cam balkon sistemi Tiara Flat/Slim/Zero ile balkonunuzu evinizin en kullanışlı odası haline getirin. Zeminde engel istemeyen mekanlar için esnek ve güvenli çözümler.',
    features: [
      { img: '/images/products/pergola_hero.jpg', title: 'Her Mekana Uygun', desc: 'Alışveriş merkezleri, restoranlar ve ofisler için ihtiyaç duyulan alanlarda esnek çözümler sunar.' },
      { img: '/images/products/katlanir_hero.jpg', title: 'Eşiksiz Panoramik Görüntü', desc: 'Maksimum genişliğe izin veren kanat yapısı ile kesintisiz bir manzara keyfi.' }
    ],
    safetyImg: '/images/products/katlanir_hero.jpg',
    cleaningImg: '/images/products/katlanir_hero.jpg',
    cleaningSteps: [
      'Panelleri tek tek toplayarak sistemi tamamen açın.',
      'Her cam panelini güvenle içeriden silin.',
      'Eşiksiz ray kanallarını nemli bir bezle temizleyerek pürüzsüz hareketi koruyun.'
    ],
    darkFeatures: [
      { icon: 'fas fa-expand', title: 'Maksimum Esneklik', desc: 'İhtiyaç duyulan her alanda geniş ve engel tanımayan geçiş imkanı.' },
      { icon: 'fas fa-child', title: 'Entegre Çocuk Kilidi', desc: 'Menteşeli paneller üzerine entegre edilen patentli sistem ile çocuğunuz emniyette.' },
      { icon: 'fas fa-shield-halved', title: 'Yüksek Güvenlik', desc: 'Kapandığında mekanı tam güvenli ve korunaklı hale getiren kilit mekanizması.' },
      { icon: 'fas fa-sync', title: 'Uzun Ömürlü Kullanım', desc: 'Teknik servise ihtiyaç duymadan yıllarca pürüzsüz çalışma garantisi.' }
    ],
    testimonials: [
      { text: 'Restoranımızın girişi için kullandık, müşteriler eşiksiz geçişten çok memnun.', name: 'Sinan K.', city: 'İstanbul' },
      { text: 'Ofis bölmesi olarak harika bir estetik kattı.', name: 'Arda S.', city: 'Ankara' },
      { text: 'Çocuk kilidi olması içimizi çok rahatlatıyor.', name: 'Merve B.', city: 'İzmir' }
    ]
  },
  'statu-optima': {
    badge: 'Albert Genau — Statü Optima®',
    heroTitle: 'Isıcamlı Sürme Cam Balkon',
    heroSub: 'Kalite ve Uygun Fiyatın Buluştuğu Tek Camlı Çözüm.',
    heroImg: '/images/products/katlanir_ekonomik_v3.jpg',
    tagline: 'Optima 08 ile fiyat endişesi yaşamadan da kaliteli cam balkona sahip olabilirsiniz. Albert Genau kalitesini ekonomik fiyatlarla balkonunuza taşıyan, dayanıklı ve uzun ömürlü en ideal seri.',
    features: [
      { img: '/images/products/tiara_wheels.jpg', title: '36 mm Çelik Teker', desc: '4 altta, 4 üstte olmak üzere toplam 8 adet çelik taşıyıcı teker ile sessiz ve konforlu hareket.' },
      { img: '/images/products/twinmax_lock.jpg', title: 'Katlanabilir Çıkış Kolu', desc: 'Katlanabilir yapısı sayesinde cam balkonunuzda perde veya stor perde kullanımına engel olmaz.' },
      { img: '/images/products/katlanir_isicamli.jpg', title: 'Gizli Su Tahliyesi', desc: 'Kasa profili üzerindeki damlalıklı tasarım ile suyu içeri almadan doğrudan tahliye eder.' }
    ],
    safetyImg: '/images/products/katlanir_balkon_hero.jpg',
    cleaningImg: '/images/products/katlanir_balkon_hero.jpg',
    cleaningSteps: [
      'Kanatları içeriye doğru katlayarak sistemi açın.',
      'Tüm cam panellerini içeriden güvenli bir şekilde silin.',
      'Sistemin pürüzsüz raylarını nemli bezle temizleyerek bakımını tamamlayın.'
    ],
    darkFeatures: [
      { icon: 'fas fa-tint-slash', title: 'Sızdırmazlık Pulları', desc: 'Kasa profilinin zemine sabitlendiği noktalarda özel plastik pullarla su sızıntısını önler.' },
      { icon: 'fas fa-sync', title: 'Ay Parça Kilitleme', desc: 'Panellerin açma-kapama sırasında sarkmaması için özel kilitleme sistemi.' },
      { icon: 'fas fa-shield-halved', title: '8 mm Temperli Cam', desc: 'Yüksek darbe dayanımlı temperli camlar ile aileniz için tam güvenlik.' },
      { icon: 'fas fa-award', title: '2 Yıl AG Garantisi', desc: 'Sistemin tüm aksamları 2 yıl boyunca Albert Genau güvencesi altındadır.' }
    ],
    testimonials: [
      { text: 'Hem uygun fiyatlı hem de çok kaliteli. Beklentimizi tam karşıladı.', name: 'Canan V.', city: 'Kocaeli' },
      { text: 'Eski sistemimize göre çok daha rahat açılıp kapanıyor.', name: 'Murat S.', city: 'Tekirdağ' },
      { text: 'Balkonumuz tertemiz kaldı, fiyatı da çok makul.', name: 'Ferhat A.', city: 'Edirne' }
    ]
  },
  'statu-tango': {
    badge: 'Albert Genau — Statü Tango®',
    heroTitle: 'Tek Camlı Sürme Cam Balkon',
    heroSub: 'Güvenilir Performans, Alışılmış Klasik Tasarım.',
    heroImg: '/images/products/kis_bahcesi_hero.jpg',
    tagline: 'Statü Tango, yıllardır tercih edilen klasik cambalkon deneyimini Albert Genau mühendisliği ile sunar. Ekonomik çözümlerde sağlamlık ve sadelik arayanların tercihi.',
    features: [
      { img: '/images/products/katlanir_teknik.jpg', title: 'Sarsılmaz Mekanizma', desc: 'Zamanın testinden geçmiş, sağlam and güvenilir kayar katlanır çalışma sistemi.' },
      { img: '/images/products/giyotin_final.jpg', title: 'Yüksek Taşıma Kapasitesi', desc: 'Özel tasarım profilleri ile geniş cam kanatlarını bile sarsıntısız taşır.' }
    ],
    safetyImg: '/images/products/katlanir_hero.jpg',
    cleaningImg: '/images/products/katlanir_hero.jpg',
    cleaningSteps: [
      'Panelleri tek tek içeri katlayarak toplayın.',
      'İçeriden kolayca tüm cam yüzeylerini silin.',
      'Raylarda biriken tozları temizleyerek sistemin ömrünü uzatın.'
    ],
    darkFeatures: [
      { icon: 'fas fa-history', title: 'Klasikleşmiş Tasarım', desc: 'Her balkon tipine uyum sağlayan, alışılmış ve kolay kullanım.' },
      { icon: 'fas fa-award', title: 'Onaylı Dayanıklılık', desc: 'Statü serisinin en çok güvenilen, sağlamlığı tescilli klasik modeli.' },
      { icon: 'fas fa-cog', title: 'Sade ve Etkili', desc: 'Minimum hareketli parça ile uzun yıllar arızasız çalışma.' },
      { icon: 'fas fa-check-circle', title: 'Güvenli Kilit Sistemi', desc: 'Basit ama etkili kilitleme mekanizması ile balkonunuz tam koruma altında.' }
    ],
    testimonials: [
      { text: 'Sade ve kullanışlı bir sistem, çok memnunuz.', name: 'Yusuf M.', city: 'Tekirdağ' },
      { text: 'Yıllardır kullanıyoruz, hiçbir sorun çıkarmadı.', name: 'Ali T.', city: 'İstanbul' },
      { text: 'Uygun fiyatlı ve sağlam bir çözüm oldu.', name: 'Merve B.', city: 'Ankara' }
    ]
  },
  'ruzgar-kirici-sistem': {
    badge: 'Albert Genau — AirFlex',
    heroTitle: 'Rüzgar Kırıcı Sistem',
    heroTitleExtra: '',
    heroSub: 'Yeni Rüzgar Kırıcı Cam Sistemi ile Tanışın',
    heroImg: '/images/products/panoromik-yatay.png',
    safetyImg: '/images/products/airflex_safety_priority.png',
    tagline: 'Rüzgar Kırıcı Sistem – Airflex, minimalist tasarımı ile panoramik manzaranızı korurken aynı zamanda ses, toz ve rüzgarı engeller. Konforunuzu artırır.\n\nAyarlanabilir köşe çözümleri, inovatif ve estetik yer sabitleme seçenekleri ile rüzgar kırıcı sistem, hotel, restaurant ve cafelerde, teraslarda ve ofis bölmelerinde rahatlıkla uygulanabilir. Sadece 47 mm profil genişliğine sahip airflex – rüzgar kırıcı ile tanışmanın tam zamanı.',
    features: [],
    sections: [
      {
        type: 'text_image',
        title: 'Farklı Yükseklik ve Cam Tiplerine Göre Farklı Uygulama Çeşitleri',
        content: 'Estetik görünümünün yanı sıra güvenliğe de önem veren AirFlex – Rüzgar Kırıcıyı, 5 farklı yükseklik ölçülerinde ve farklı cam tiplerine uygun olarak kullanabilirsiniz.',
        image: '/images/products/giyotin_panoramic.png',
        reverse: false
      },
      {
        type: 'text_image',
        title: 'İster Sabit İster Taşınabilir Uygulama',
        content: 'Rüzgar Kırıcı - Airflex, mekânlarda yeni ve yaratıcı bölme çözümleri için size esneklik sağlar. İsterseniz farklı şekillerde zemine sabitleyerek uygulayacağınız sisteminizi, dilerseniz taşınabilir olarak da kullanabilirsiniz.',
        image: '/images/products/giyotin_remote.png',
        reverse: true
      },
      {
        type: 'highlight',
        title: 'Rüzgarı İstediğiniz Yerde, İstediğiniz Gibi Kontrol Edin!',
        content: 'AirFlex – Rüzgar Kırıcı cam sistemi tek dokunuşla açılan yeni nesil hareketli rüzgar kırıcı sistemidir. AirFlex, konutlarda, okullarda, hastanelerde, AVM’lerde stadyumlarda, kafe ve restoranlarda, kısaca istediğiniz her yerde hem trabzanlı hem de trabzansız kullanılabilen hareketli bir cam korkuluk sistemidir.',
        badge: 'Yeni Nesil'
      },
      {
        type: 'text_image',
        title: 'İzolasyonun Şık ve Estetik Hâli',
        content: 'AirFlex – Rüzgar Kırıcı sistemin minimal tasarımı, sadece 47 mm’lik dikme genişliği ile tüm mekânların izolasyonunu daha şık hâle getiriyor. Rüzgar, toz ve sokak kalabalığının etkisinden koruma sağlayacak sistemi istediğiniz zaman açık istediğiniz zaman kapalı olarak kullanabilirsiniz.',
        image: '/images/products/giyotin_safety.png',
        reverse: false
      },
      {
        type: 'text_image',
        title: 'Led ve Logo Uygulaması ile Mekâna Uygun Özel Çözümler',
        content: 'Led ışıklı trabzan seçeneği sayesinde karanlıkta bile estetik görünümü ile öne çıkan AirFlex Rüzgar Kırıcı Cam Sisteminin cam panellerine logonuzu uygulayabilir ve kurumsal imajınızı daha şık yansıtabilirsiniz.',
        image: '/images/products/giyotin_hero.jpg',
        reverse: true
      },
      {
        type: 'grid',
        title: 'Konfor ve Güvenlik',
        items: [
          { title: 'Opsiyonel Güvenlik Kilidi', desc: 'Sistem için özel tasarlanmış kilit mekanizması ile içeriden kilitlenebilir, mekânlarınızı emniyetli kılar.', icon: 'fas fa-lock' },
          { title: 'Yeni Nesil Çalışma Alanı', desc: 'Elegant tasarımıyla ofis ara bölmesi olarak kullanılarak ferah bir ortam yaratır.', icon: 'fas fa-briefcase' },
          { title: 'Minimalist Profil', desc: 'Sadece 47 mm profil genişliği ile kesintisiz manzara.', icon: 'fas fa-search-plus' }
        ]
      }
    ],
    darkFeatures: [
      { icon: 'fas fa-wind', title: 'Rüzgar Kontrolü', desc: 'Tek dokunuşla açılan yeni nesil hareketli sistem.' },
      { icon: 'fas fa-shield-halved', title: 'Mekan Emniyeti', desc: 'Özel tasarım kilit mekanizması ile tam güvenlik.' },
      { icon: 'fas fa-lightbulb', title: 'Led Aydınlatma', desc: 'Işıklı trabzan seçeneği ile gece şıklığı.' }
    ],
    testimonials: [
      { text: 'Ofis bölmesi olarak kullandık, harika bir derinlik kattı.', name: 'Murat K.', city: 'İstanbul' },
      { text: 'Restoranımızın teras bölümü için yaptırdık, rüzgar sorununu tamamen çözdü.', name: 'Selim Y.', city: 'Tekirdağ' },
      { text: 'LED aydınlatma detayı gece çok şık duruyor, montaj ekibi çok hızlıydı.', name: 'Zeynep A.', city: 'Kırklareli' }
    ]
  },
  'katlanir-sistem-cam-balkon': {
    isCategory: true,
    badge: 'Katlanır - Sürme Cam Balkon',
    heroTitle: 'Katlanır - Sürme Cam Balkon',
    heroSub: 'Balkonu dört mevsim yaşam alanına dönüştüren premium çözümler.',
    heroImg: '/images/products/katlanir_balkon_hero_v4.jpg',
    subProducts: [
      { slug: 'tiara-twinmax', title: 'Isıcamlı Katlanır Cam Balkon', desc: 'Isıcamlı cambalkonun zirvesi. Maksimum ısı yalıtımı ve konfor.', image: '/images/products/katlanir-sistem-balkon.png', badge: 'ISI YALITIMLI' },
      { slug: 'tiara-08-10', title: 'Tek Camlı Katlanır Cam Balkon', desc: 'Tek camlı sistemlerde zirve kalite. Panoramik manzara için ideal.', image: '/images/products/katlanir_tek_camli.jpg', badge: 'TEK CAMLI' },
      { slug: 'statu-optima', title: 'Isıcamlı Sürme Cam Balkon', desc: 'Albert Genau kalitesini uygun fiyatla balkonunuza taşıyın.', image: '/images/products/surme-isicamli-balkon.png', badge: 'ISI YALITIMLI' },
      { slug: 'statu-tango', title: 'Tek Camlı Sürme Cam Balkon', desc: 'Zamanın testinden geçmiş, güvenilir klasik cambalkon deneyimi.', image: '/images/products/surme-sistem-tek-camli.png', badge: 'TEK CAMLI' }
    ]
  },
  'kis-bahcesi': {
    badge: 'Özel Proje Çözümleri',
    heroTitle: 'Çelik Konstrüksiyon & Kış Bahçesi',
    heroSub: 'Dört Mevsim Yaşanabilir Ekstra Alanlar.',
    heroImg: '/images/kis-bahcesi-banner.png',
    tagline: 'Müstakil eviniz, terasınız veya ticari mekanınız için çelik taşıyıcı sistemle güçlendirilmiş, premium kış bahçesi sistemleri. Doğayla iç içe, güvenli ve estetik yaşam alanları sunuyoruz.',
    features: [
      { img: '/images/products/celik_tasiyici_govde.png', title: 'Çelik Taşıyıcı Gövde', desc: 'Ağır kar yüklerine ve rüzgara karşı ekstra dayanıklı özel tasarım çelik iskelet.' },
      { img: '/images/products/isicam-entegrasyonu.png', title: 'Isıcam Entegrasyonu', desc: 'Tavan ve yan yüzeylerde maksimum yalıtım sağlayan özel ısıcam sistemleri.' },
      { img: '/images/products/ruzgar-kirici.png', title: 'Panoramik Tasarım', desc: 'Modern mimariyle uyumlu, geniş açıklıklı ve kesintisiz görüş sunan estetik yapılar.' }
    ],
    safetyImg: '/images/products/kis_bahcesi_hero.jpg',
    cleaningImg: '/images/products/katlanir_balkon_hero_v4.jpg',
    cleaningSteps: ['Dış cephe camları özel aparatlarla yıkanabilir.', 'İç yüzeyleri standart temizleyicilerle silebilirsiniz.', 'Çelik kısımları nemli bezle düzenli olarak koruyun.'],
    darkFeatures: [
      { icon: 'fas fa-shield-alt', title: 'Yüksek Statik Dayanım', desc: 'Her türlü iklim koşuluna dayanacak mühendislik hesaplamaları.' },
      { icon: 'fas fa-sun', title: 'Dört Mevsim Kullanım', desc: 'Doğru izolasyon ile kışın sıcak, yazın ferah bir ortam.' },
      { icon: 'fas fa-tint-slash', title: 'Maksimum Yalıtım', desc: 'Özel çatı sistemleri ve yalıtım bariyerleri ile su sızıntılarına karşı tam koruma.' }
    ],
    safetyTitle: 'Sağlam ve Güvenilir Taşıyıcı Sistem',
    safetyDesc: 'Ağır kar yükü ve rüzgar direnci hesaplanarak üretilen özel çelik konstrüksiyon ile dört mevsim tam güvenlik.',
    cleaningDesc: 'Yüksek kaliteli cam ve alüminyum yüzeyler sayesinde mevsimsel temizliği oldukça kolaydır.',
    testimonials: [
      { text: 'Bahçemizi kışın da kullanabilmek harika bir duygu.', name: 'Ebru M.', city: 'İstanbul' }
    ]
  },
  'dusakabin': {
    badge: 'Premium Banyo',
    heroTitle: 'Duşakabin Sistemleri',
    heroSub: 'Banyonuzda Modern, Ferah ve Güvenli Tasarım.',
    heroImg: '/images/products/dusakabin_hero_hq.jpg',
    tagline: 'Dar alanlarda bile mekanı geniş gösteren, su sızıntısını engelleyen ve kireç tutmayan cam yüzey teknolojisine sahip duşakabin çözümleri.',
    features: [
      { img: '/images/products/dusakabin_clean.png', title: 'Su İtici Kaplama', desc: 'Cam yüzeyinde kireç ve leke tutunmasını engelleyen nano teknoloji kaplama.' },
      { img: '/images/products/dusakabin_safe.png', title: 'Sızdırmazlık Contaları', desc: 'Su kaçaklarını %100 engelleyen özel tasarlanmış manyetik ve şeffaf contalar.' },
      { img: '/images/products/dusakabin_wheels.png', title: 'Kusursuz Kayar Sistem', desc: 'Cam kapıların sessiz ve pürüzsüz şekilde kaymasını sağlayan paslanmaz tekerlek mekanizması.' }
    ],
    safetyImg: '/images/products/dusakabin_safe.png',
    cleaningImg: '/images/products/dusakabin_clean.png',
    cleaningSteps: [
      'Suyu iten özel kaplama sayesinde her duş sonrası çekçekle kolayca kurutun.',
      'Kireç lekesi oluşumunu önlemek için haftalık olarak cam temizleyici ürünlerle silin.',
      'Paslanmaz menteşe ve kulp gibi aksesuarları yumuşak, aşındırıcı olmayan bir bezle parlatın.'
    ],
    darkFeatures: [
      { icon: 'fas fa-shield-halved', title: 'Temperli Güvenlik Camı', desc: 'Olası kazalara karşı kırılmalarda dağılmayan özel 8mm cam.' },
      { icon: 'fas fa-tint-slash', title: 'Paslanmaz Aksesuar', desc: 'Su ve neme dayanıklı paslanmaz menteşe ve kulp sistemleri.' },
      { icon: 'fas fa-arrows-alt', title: 'Özel Ölçü Üretim', desc: 'Banyonuzun mimarisine ve genişliğine göre milimetrik hassasiyetle özel olarak üretilir.' }
    ],
    safetyTitle: 'Aileniz İçin Güvenli Duş Deneyimi',
    safetyDesc: '8mm kalınlığında özel temperli camlar sayesinde darbelere karşı ekstra dirençlidir. Kırılma anında küçük parçalara ayrılarak kesici özellik göstermez.',
    cleaningDesc: 'Leke ve kireç tutmayan özel cam yüzeyi sayesinde temizliği zahmetsiz hale getirir.',
    testimonials: []
  },
  'cam-kapi': {
    badge: 'Hareketli Cam Sistemleri',
    heroTitle: 'Cam Kapı Sistemleri',
    heroSub: 'Eşiksiz Zeminler, Kesintisiz Geçişler.',
    heroImg: '/images/products/giyotin_panoramic.png',
    tagline: 'Albert Genau’nun üstten askılı özel taşıyıcı profili sayesinde mekanlarınızı eşiksiz ve esnek bir şekilde bölerek panoramik manzaranın tadını çıkarın.',
    features: [
      { img: '/images/products/katlanir_isicamli.jpg', title: 'Eşiksiz Zeminler', desc: 'Zeminde ray veya kanal bulunmaz. Paneller açıkken zemin tamamen düz kalır, yürürken ayağınız takılmaz.' },
      { img: '/images/products/giyotin_remote.png', title: 'Tüy Kadar Hafif Hareket', desc: 'Özel Quattro HD tekerlek sistemi sayesinde 150 kiloluk devasa cam paneller minimum sürtünme ile hareket eder.' },
      { img: '/images/products/twinmax_lock.jpg', title: 'Gizlenebilir Park Alanları', desc: 'Sistem esnek park seçenekleri sunar. Camları bir duvarın arkasına veya kolon yanına şık bir şekilde saklayabilirsiniz.' }
    ],
    safetyImg: '/images/products/giyotin_safety.png',
    cleaningImg: '/images/products/twinmax_clean.jpg',
    cleaningSteps: ['Eşiksiz zemin sayesinde alt ray temizliği gerektirmez.', 'Cam yüzeyler standart temizleyicilerle silinebilir.'],
    darkFeatures: [
      { icon: 'fas fa-lock', title: 'Pim Güvencesi', desc: 'Cam paneller yapıştırıcıya ek olarak, Eksantrik Cam Pimleri ile mekanik olarak kilitlenir.' },
      { icon: 'fas fa-wind', title: 'Dört Mevsim Koruma', desc: 'Yan EPDM contalar ve alt-üst fırçalarla rüzgar, toz ve gürültü geçişi minimize edilir.' },
      { icon: 'fas fa-eye-slash', title: 'Estetik Park Alanı', desc: 'Sistem açıkken cam paneller minimum yer kaplar ve mekanın bütünlüğünü bozmaz.' }
    ],
    safetyTitle: 'Eksantrik Pim Güvencesi',
    safetyDesc: 'Cam paneller sadece yapıştırıcılarla değil, profilin içine giren özel pimlerle mekanik olarak tutturulur. Düşme riski yoktur.',
    cleaningDesc: 'Eşiksiz yapısı ve pürüzsüz cam yüzeyleri ile ofis ve mağaza temizliğinde büyük kolaylık sağlar.',
    testimonials: [
      { text: 'Restoranımızın teras ve iç mekanı arasındaki eşiği kaldırmak harika oldu.', name: 'Hakan T.', city: 'Tekirdağ' }
    ]
  }
};
PRODUCT_DATA['celik-konstruksiyon-kis-bahcesi'] = PRODUCT_DATA['kis-bahcesi'];
PRODUCT_DATA['dusakabin-sistemleri'] = PRODUCT_DATA['dusakabin'];
PRODUCT_DATA['cam-kapi-sistemleri'] = PRODUCT_DATA['cam-kapi'];

PRODUCT_DATA['kompozit-cephe-sistemleri'] = {
  badge: 'Çağdaş Pro Yapı — Cephe Sistemleri',
  heroTitle: 'Kompozit Cephe Sistemleri',
  heroSub: 'Binanızı Onlarca Yıl Koruyan, Estetiği Öne Çıkaran Alüminyum Kompozit Cephe Çözümleri.',
  heroImg: '/images/kompozit-cephe/kompozit-cephe-03.png',
  tagline: 'Kompozit cephe kaplaması, iki ince alüminyum levha arasına sıkıştırılmış polimer çekirdeğinden oluşan, binalara modern ve uzun soluklu bir dış yüzey kazandıran özel bir panel sistemidir. Sektörün önde gelen üreticilerinin malzemeleriyle çalışan Çağdaş Pro Yapı; ofis binaları, fabrikalar, okullar, hastaneler ve konut projelerinde estetik, dayanıklı ve güvenli cephe çözümleri sunmaktadır.',
  features: [
    { img: '/images/kompozit-cephe/kompozit-cephe-01.png', title: 'Alüminyum Kompozit Panel', desc: 'İki katmanlı alüminyum yüzey ve polimer çekirdekten oluşan ACP paneller; yaklaşık 4–6 kg/m² ağırlığıyla binaya ek statik yük bindirmeden uygulanır. Yüksek dayanım, kolay işlenebilirlik ve mükemmel estetik bir arada sunar.' },
    { img: '/images/kompozit-cephe/kompozit-cephe-02.png', title: 'PVDF Kaplama Teknolojisi', desc: 'PVDF kaplama ile işlenmiş paneller UV ışınlarına, asit yağmurlarına ve iklim koşullarına karşı 25 yıl ve üzeri renk ve parlaklığını korur. Mat, parlak, metalik ve özel efektli seçenekler mevcuttur.' },
    { img: '/images/kompozit-cephe/kompozit-cephe-04.png', title: 'Gizli Montaj Sistemi', desc: 'Özel alüminyum alt konstrüksiyon ve klibs sistemi ile paneller görünür vida veya perçin kullanılmadan monte edilir. Temiz ve minimalist bir cephe görünümü elde edilirken panel yenileme işlemleri de kolaylıkla yapılabilir.' }
  ],
  safetyImg: '/images/kompozit-cephe/kompozit-cephe-05.png',
  safetyTitle: 'Yangın Güvenliği — A2 Sınıfı Panel Seçeneği',
  safetyDesc: 'Türkiye Bina Yangın Yönetmeliği\'ne uygun olarak, yüksek katlı ve kamusal binalarda zorunlu tutulan A2 sınıfı alüminyum kompozit panel seçeneği sunulmaktadır. Mineral dolgu çekirdekli bu paneller 650°C\'ye kadar alevlenme göstermez ve yangının bina cephesinde yayılmasını önler.',
  cleaningImg: '/images/kompozit-cephe/kompozit-cephe-06.png',
  cleaningDesc: 'PVDF kaplı pürüzsüz yüzeyler hava kirliliği ve toz tutumunu minimize eder. Yıllık periyodik basınçlı su ile yıkama ve yumuşak deterjanla uygulama, cepheyi her zaman yeni gibi tutar.',
  cleaningSteps: [
    'Yüzeyi önce bol suyla yıkayarak kaba kirleri ve tozu giderin.',
    'pH nötr deterjan ve yumuşak fırça ile panel yüzeyini nazikçe temizleyin.',
    'Bol suyla durulayın; PVDF yüzey su izi ve leke bırakmaz.'
  ],
  sections: [
    {
      type: 'text_image',
      title: 'Kompozit Cephe Neden Tercih Edilir?',
      content: 'Geleneksel taş ve sıva cephe sistemleriyle karşılaştırıldığında alüminyum kompozit paneller çok daha hafif, çok daha hızlı monte edilebilir ve çok daha uzun servis ömrüne sahiptir. Kaplama altına uygulanan taş yünü veya EPS yalıtım levhası ile enerji verimliliği de önemli ölçüde artırılır. Tüm bu avantajlar, kısa montaj süreci ve düşük bakım maliyetiyle birleşince kompozit cephe; hem yeni yapı hem de yenileme projelerinde en akılcı cephe çözümü haline gelir.',
      image: '/images/kompozit-cephe/kompozit-cephe-07.png',
      reverse: false
    },
    {
      type: 'highlight',
      title: 'Renk ve Doku Özgürlüğü',
      content: '200\'ü aşkın standart RAL ve NCS rengi ile özel sipariş renk uygulamaları mümkündür. Fırçalanmış, taş, ahşap ve tuğla imitasyonlu doku seçenekleriyle mimarinizin vizyonunu birebir hayata geçirebilirsiniz.',
      badge: '200+ Renk Seçeneği'
    },
    {
      type: 'text_image',
      title: 'Hızlı ve Temiz Montaj',
      content: 'Alüminyum alt konstrüksiyon üzerine montaj yapılan kompozit cephe sistemleri çalışma süresini ve inşaat kirliliğini minimuma indirir. Saha kesim ve bükme işlemleri ile eğimli ve karmaşık geometrik formlara kolayca adapte olur. Komple cephe yenileme işlemleri haftalarca değil, gün bazında tamamlanır.',
      image: '/images/kompozit-cephe/kompozit-cephe-08.png',
      reverse: true
    },
    {
      type: 'grid',
      title: 'Teknik Avantajlar',
      items: [
        { title: 'Yangın Dayanımı', desc: 'A2 sınıfı yanmaz panel seçeneği ile TSE ve Türkiye Bina Yangın Yönetmeliği\'ne tam uyumluluk.', icon: 'fas fa-fire-extinguisher' },
        { title: 'UV Kararlılığı', desc: 'PVDF kaplama ile 25 yıl garantili renk ve parlaklık koruması; solma ve çatlama görülmez.', icon: 'fas fa-sun' },
        { title: 'Deprem Güvenliği', desc: 'Gizli montaj sistemi panel esnekliğine izin verir, deprem hareketlerinde kırılma riski yoktur.', icon: 'fas fa-shield-halved' },
        { title: 'Ses Yalıtımı', desc: 'Alüminyum–polimer–alüminyum sandviç yapı dış kaynaklı gürültüyü önemli ölçüde azaltır.', icon: 'fas fa-volume-mute' },
        { title: 'Düşük Bakım Maliyeti', desc: 'Korozyona ve kire dayanıklı yüzeyler sayesinde 10+ yıl boyunca ek bakım gerektirmez.', icon: 'fas fa-piggy-bank' },
        { title: 'Her İklime Uygun', desc: '-50°C ile +80°C arasında termal kararlılık; don, yağmur ve güneşe dayanıklı yapı.', icon: 'fas fa-temperature-high' }
      ]
    }
  ],
  darkFeatures: [
    { icon: 'fas fa-building', title: 'Ticari & Konut Projeleri', desc: 'Ofis binaları, fabrikalar, hastaneler, AVM\'ler ve konut projelerinde profesyonel uygulama deneyimi.' },
    { icon: 'fas fa-palette', title: 'Özel Renk & Doku', desc: 'Mat, parlak, metalik, taş ve ahşap imitasyonlu yüzeylerle mimarınızın vizyonunu gerçeğe taşıyın.' },
    { icon: 'fas fa-certificate', title: 'Sertifikalı Malzeme', desc: 'Uluslararası yangın, UV ve mekanik dayanım testlerinden geçmiş, TSE belgeli kompozit panel malzemeleri.' }
  ],
  testimonials: [
    { text: 'İş yerimizin cephesi tamamen yenilendi; hem daha modern göründü hem de binanın değeri arttı. Montaj ekibi çok hızlı ve özenli çalıştı.', name: 'Kemal A.', city: 'Tekirdağ' },
    { text: 'Fabrika binamızın cephesini A2 yangın sınıfı panellerle kapladık. İşçilik kalitesi ve detay hassasiyeti beklentimizin çok üzerindeydi.', name: 'Okan T.', city: 'Kırklareli' },
    { text: 'Eski sıva cephemiz çatlaklar atmıştı. Kompozit cephe ile hem güzel görüntü hem de uzun soluklu çözüm aldık.', name: 'Serdar M.', city: 'İstanbul' }
  ]
};

PRODUCT_DATA['pvc-cam-sistemleri'] = {
  badge: 'Çağdaş Pro Yapı — Premium PVC Sistemleri',
  heroTitle: 'PVC Cam Sistemleri',
  heroSub: 'Üstün Isı Yalıtımı, Akustik Konfor ve Uzun Ömürlü Kullanım İçin Estetik Çözümler.',
  heroImg: '/images/pvc_sistem_banner.png',
  tagline: 'Yaşam alanlarınızı yeniden tanımlayın. Çağdaş Pro Yapı PVC pencere ve kapı sistemleri; mükemmel ısı yalıtımı, üst düzey ses yalıtımı ve yenilikçi güvenlik özellikleriyle konforunuzu en üst seviyeye taşır. Çok odalı profil sistemiyle geliştirilen doğramalarımız, estetik tasarımı teknolojiyle buluşturarak evinizi dört mevsim korur.',
  features: [
    { img: '/images/pvc-model-01.png', title: 'Maksimum İzolasyon Teknolojisi', desc: 'İleri teknoloji 5 ve 6 odalı profil sistemleri ile enerji kayıplarını en aza indirin. Kışın sıcak, yazın serin bir yaşam alanı.' },
    { img: '/images/pvc-model-02.png', title: 'Üst Düzey Akustik Performans', desc: 'Dış dünyanın gürültüsünü dışarıda bırakın. Özel yalıtım contaları ve profil yapısı ile huzurlu ve sessiz mekanlar yaratın.' },
    { img: '/images/pvc-model-01.png', title: 'Premium Isıcam Entegrasyonu', desc: 'Gelişmiş 4+12+4 veya 4+16+4 Isıcam sistemleri ile enerji verimliliğinde zirveyi deneyimleyin. Tasarruf ve konfor bir arada.' }
  ],
  safetyImg: '/images/pvc-model-02.png',
  cleaningImg: '/images/pvc-model-01.png',
  safetyTitle: 'Ödün Vermeyen Tam Güvenlik',
  safetyDesc: 'Ailenizin güvenliği önceliğimizdir. Çevre dolaşımlı manivela sistemi ve çelik destekli çok noktalı kilit mekanizması ile PVC kapı ve pencereleriniz hırsızlığa karşı maksimum direnç gösterir.',
  cleaningDesc: 'Özel formüle edilmiş pürüzsüz PVC yüzey yapısı toz ve kir barınmasını engeller. Yıllarca ilk günkü parlaklığını koruyan sistemlerimiz, zahmetsiz temizlik imkanı sunar.',
  cleaningSteps: [
    'Profilleri nemli ve yumuşak mikrofiber bir bezle nazikçe silin.',
    'Mekanik aksamların kusursuz çalışması için menteşe ve kilitlere periyodik bakım yapın.',
    'Sızdırmazlık performansını korumak için conta sistemlerini düzenli kontrol edin.'
  ],
  sections: [
    {
      type: 'text_image',
      title: 'Mimari Mükemmellik ve Estetik Uyum',
      content: 'Klasik beyazın ötesine geçin. Çağdaş Pro Yapı PVC sistemleri, ahşap desenli lamine kaplamalar ve modern renk paletleriyle projenizin mimari dokusuna kusursuz uyum sağlar. Paslanmaz, çürümez ve güneş ışınlarına (UV) karşı yüksek dirençli yapısıyla onlarca yıl bakım gerektirmeden estetiğini korur.',
      image: '/images/pvc-model-02.png',
      reverse: false
    },
    {
      type: 'highlight',
      title: 'Sürdürülebilir Enerji ve Uzun Vadeli Kazanç',
      content: 'Doğru PVC pencere yatırımı, sadece estetik değil aynı zamanda ekonomik bir karardır. A sınıfı enerji verimliliği sunan sistemlerimiz, ısıtma ve soğutma giderlerinizde %30\'a varan tasarruf sağlayarak yatırımınızı kısa sürede amorti eder.',
      badge: 'A Sınıfı Verimlilik'
    },
    {
      type: 'grid',
      title: 'Premium Teknik Özellikler',
      items: [
        { title: 'Üstün Isı Yalıtımı', desc: 'Gelişmiş çok odalı profil yapısı ile Uf değeri 1.0 W/m²K seviyelerine ulaşan mükemmel yalıtım.', icon: 'fas fa-thermometer-empty' },
        { title: 'Maksimum Ses Yalıtımı', desc: '45 dB\'e varan akustik yalıtım kapasitesi ile şehir gürültüsünden tamamen izole edilmiş odalar.', icon: 'fas fa-headphones' },
        { title: 'UV ve Renk Dayanımı', desc: 'Özel formüllü UV katkılı yapısı sayesinde yıllar geçse de ilk günkü rengini ve parlaklığını korur.', icon: 'fas fa-sun' },
        { title: 'Çok Yönlü Açılım Sistemleri', desc: 'Mekanınıza özel tek açılım, çift açılım, sürme ve katlanır gibi zengin fonksiyonel seçenekler.', icon: 'fas fa-arrows-alt' }
      ]
    }
  ],
  darkFeatures: [
    { icon: 'fas fa-snowflake', title: 'Dört Mevsim İklim Kontrolü', desc: 'Termal bariyer teknolojisi ile kışın ısıyı hapseder, yazın kavurucu sıcaklarını dışarıda tutar.' },
    { icon: 'fas fa-shield-halved', title: 'Çelik Destekli Güvenlik', desc: 'İçerisinde yer alan galvanizli çelik destek sacları ile sarsılmaz bir yapı ve maksimum dayanım.' },
    { icon: 'fas fa-leaf', title: 'Doğa Dostu ve Sürdürülebilir', desc: 'Gelecek nesillere saygılı, %100 geri dönüştürülebilir ve çevreye duyarlı PVC formülasyonu.' }
  ],
  testimonials: [
    { text: 'Eski pencerelerimizi Çağdaş Pro Yapı PVC sistemleri ile değiştirdik. Evdeki ısı farkı inanılmaz, ayrıca dışarının gürültüsü tamamen kesildi.', name: 'Ayşe K.', city: 'Tekirdağ' },
    { text: 'Ahşap desenli kaplama tercih ettik, gerçek ahşaptan farksız duruyor ve bakımı çok kolay. Montaj ekibi de son derece profesyoneldi.', name: 'Burak M.', city: 'İstanbul' }
  ]
};

PRODUCT_DATA['kupeste-modelleri'] = {
  badge: 'Çağdaş Pro Yapı — Premium Güvenlik ve Estetik',
  heroTitle: 'Küpeşte Korkuluk Modelleri',
  heroSub: 'Merdiven, Balkon ve Teras İçin Kusursuz Mimari Detaylar, Ödün Vermeyen Güvenlik.',
  heroImg: '/images/kupeste-modelleri/kupeste-banner.png',
  tagline: 'Mekanlarınıza değer katın. Çağdaş Pro Yapı küpeşte ve korkuluk sistemleri; balkon, teras, merdiven ve havuz kenarlarında maksimum güvenlik sağlarken, minimalist ve şık tasarımlarıyla mimarinizin ayrılmaz bir parçası olur. Alüminyum, paslanmaz çelik ve temperli camın kusursuz birleşimiyle üretilen sistemlerimiz, hem iç hem dış mekanlarda prestijli bir görünüm sunar.',
  features: [
    { img: '/images/kupeste-modelleri/kupeste-model-01.png', title: 'Paslanmaz Çelik ve Dayanıklılık', desc: 'Aşırı hava koşullarına dayanıklı, 304 ve 316 kalite paslanmaz çelik profiller ile korozyona karşı tam koruma. Uzun ömürlü ve sağlam yapı.' },
    { img: '/images/kupeste-modelleri/kupeste-model-02.png', title: 'Kesintisiz Cam Korkuluk Sistemleri', desc: 'Temperli ve lamine güvenlik camları kullanılarak tasarlanan şeffaf korkuluklar ile manzaranızı bölmeden mekanlarınıza derinlik ve ferahlık katın.' },
    { img: '/images/kupeste-modelleri/kupeste-model-03.png', title: 'Mimari Alüminyum Sistemler', desc: 'Hafifliği ve esnekliği ile öne çıkan, mimari detaylara uygun tasarlanabilen alüminyum profil sistemleri. Geniş renk yelpazesi ve eloksal yüzey seçenekleri.' }
  ],
  safetyImg: '/images/kupeste-modelleri/kupeste-model-04.png',
  cleaningImg: '/images/kupeste-modelleri/kupeste-model-05.png',
  safetyTitle: 'Mühendislik Harikası Güvenlik Standartları',
  safetyDesc: 'Tüm korkuluk ve küpeşte sistemlerimiz; uluslararası statik ve rüzgar yükü hesaplamalarına uygun olarak, ailenizin ve ziyaretçilerinizin güvenliğini maksimize edecek şekilde üretilir ve monte edilir.',
  cleaningDesc: 'Paslanmaz çelik, alüminyum ve pürüzsüz cam yüzeylerimiz; kir ve leke tutunmasını zorlaştırır. Özel temizlik kimyasallarına ihtiyaç duymadan pratik bir şekilde ilk günkü görünümüne kavuşur.',
  cleaningSteps: [
    'Cam yüzeyleri profesyonel veya standart cam temizleyiciler ve mikrofiber bez ile silin.',
    'Paslanmaz çelik aksamları su damlacığı izi bırakmamak adına kuru bir bezle parlatın.',
    'Alüminyum profilleri aşındırıcı olmayan temizlik malzemeleri ile periyodik olarak temizleyin.'
  ],
  sections: [
    {
      type: 'text_image',
      title: 'Projenize Özel Mimari Çözümler',
      content: 'Her yapı benzersizdir ve kendi karakterini yansıtacak detaylara ihtiyaç duyar. Çağdaş Pro Yapı olarak, standart ölçülerin ötesinde projenizin mimari gereksinimlerine uygun, özel üretim küpeşte sistemleri tasarlıyoruz. Kavisli balkonlar, döner merdivenler veya galeri boşlukları için statik dayanımı yüksek, estetik ve yenilikçi çözümler üretiyoruz.',
      image: '/images/kupeste-modelleri/kupeste-model-02.png',
      reverse: false
    },
    {
      type: 'highlight',
      title: 'Sonsuz Renk ve Yüzey Seçenekleri',
      content: 'Alüminyum küpeştelerinizde statik toz boya ile yüzlerce farklı renk seçeneği veya eloksal kaplama ile mat, parlak, bronz gibi metalik görünümler elde edebilirsiniz. Cam korkuluklarda ise şeffaf, füme, bronz ve mavi renkli cam seçenekleriyle mekanınızın atmosferini dilediğiniz gibi yönlendirin.',
      badge: 'Premium Tasarım'
    },
    {
      type: 'text_image',
      title: 'Uzman Montaj, Ömür Boyu Konfor',
      content: 'Küpeşte ve korkuluk sistemlerinde malzemenin kalitesi kadar montajın da hassasiyeti kritik önem taşır. Uzman teknik ekibimiz, en karmaşık mimari detaylarda dahi milimetrik hesaplamalarla hatasız ve sağlam kurulumlar gerçekleştirir. Gizli bağlantı aparatları ve epoksi sabitleme yöntemleriyle sallantı ve gevşeme sorunları tamamen ortadan kaldırılır.',
      image: '/images/kupeste-modelleri/kupeste-model-04.png',
      reverse: true
    },
    {
      type: 'grid',
      title: 'Premium Özellikler ve Kullanım Alanları',
      items: [
        { title: 'Teras ve Balkon Korkulukları', desc: 'Rüzgar dayanımı yüksek, dış mekana uyumlu cam ve paslanmaz çelik balkon sistemleri.', icon: 'fas fa-home' },
        { title: 'Merdiven Küpeşteleri', desc: 'İç ve dış mekan merdivenleri için estetik tutamaklar, güvenli ve şık dönüş detayları.', icon: 'fas fa-stairs' },
        { title: 'Fransız Balkon Sistemleri', desc: 'Dar cephe boşluklarında maksimum güvenlik ve estetik sağlayan modern cam korkuluklar.', icon: 'fas fa-building' },
        { title: 'Havuz Kenarı Korkulukları', desc: 'Su ve neme karşı ekstra dirençli, güvenli ve kesintisiz görüş sağlayan cam sistemler.', icon: 'fas fa-swimming-pool' },
        { title: 'Galeri Boşluğu Sistemleri', desc: 'Villa ve iş merkezlerinin iç mekan galeri boşlukları için lüks görünümlü cam uygulamalar.', icon: 'fas fa-layer-group' },
        { title: 'Erişilebilirlik (Rampa) Çözümleri', desc: 'Engelli rampaları ve yaya geçitleri için uluslararası standartlara uygun sağlam küpeşteler.', icon: 'fas fa-wheelchair' }
      ]
    }
  ],
  darkFeatures: [
    { icon: 'fas fa-ruler-combined', title: 'Milimetrik Özel Üretim', desc: 'Mekanınızın tüm kavis ve detaylarına uygun kusursuz tasarımlar.' },
    { icon: 'fas fa-shield-alt', title: 'Üstün Statik Dayanım', desc: 'Mühendislik hesapları yapılmış, esnemeyen ve sarsılmayan rijit bağlantılar.' },
    { icon: 'fas fa-gem', title: 'Premium Yüzey İşlemleri', desc: 'Korozyona dayanıklı eloksal, elektrostatik boya ve parlak paslanmaz yüzeyler.' }
  ],
  testimonials: [
    { text: 'Villamızın merdiven ve galeri boşluklarına yapılan cam küpeşteler tek kelimeyle muazzam oldu. Evin tüm havası değişti, çok daha geniş ve lüks görünüyor.', name: 'Hakan T.', city: 'İstanbul' },
    { text: 'Fransız balkonlarımız için paslanmaz detaylı sistemler yapıldı. Gerek malzeme kalitesi gerekse ekibin titiz işçiliği harikaydı. Çok sağlam ve güven veriyor.', name: 'Serap E.', city: 'Tekirdağ' }
  ]
};

const DEFAULT_PRODUCT = {
  badge: 'Çağdaş Pro Yapı',
  heroTitle: 'Premium Cam Sistemleri',
  heroSub: 'Albert Genau yetkili bayisi olarak en kaliteli çözümler.',
  heroImg: '/images/products/giyotin_hero.jpg',
  tagline: 'Albert Genau kalitesiyle yaşam alanlarınıza değer katıyoruz.',
  features: [],
  safetyImg: '/images/products/katlanir_hero.jpg',
  cleaningImg: '/images/products/katlanir_hero.jpg',
  cleaningSteps: ['Uzman ekibimiz tüm bakım işlemlerini gerçekleştirir.'],
  darkFeatures: [
    { icon: 'fas fa-award', title: '2 Yıl Sistem Garantili', desc: 'Sistem bileşenleri 2 yıl Albert Genau garantisi altındadır.' },
    { icon: 'fas fa-tools', title: 'Profesyonel Montaj', desc: 'Uzman ekibimiz ile hızlı ve güvenli montaj.' }
  ],
  testimonials: []
};

export default function ProductClient({ params }: { params: any }) {
  const { slug } = use(params) as any;
  const product = PRODUCT_DATA[slug] || { ...DEFAULT_PRODUCT };

  return (
    <>
      <div className={styles.hero}>
        <Image src={product.heroImg} alt={product.heroTitle} fill className={styles.heroImg} priority />
        <div className={styles.heroOverlay}>
          <div>
            <div className={styles.heroBadge}>{product.badge}</div>
            <h1 className={styles.heroTitle}>
              {product.heroTitle}
              {product.heroTitleExtra && <span className={styles.heroTitleExtra}>{product.heroTitleExtra}</span>}
            </h1>
            <p className={styles.heroSub}>{product.heroSub}</p>
          </div>
        </div>
      </div>

      {product.isCategory ? (
        <section className={styles.categorySection}>
          <h2 className={styles.categorySectionTitle}>Katlanır Sistem</h2>
          <div className={styles.categoryGrid}>
            {product.subProducts.slice(0, 2).map((sub: any, i: number) => (
              <div key={i} className={`${styles.categoryCard} ${sub.featured ? styles.categoryCardFeatured : ''}`}>
                <div className={styles.categoryCardImg}>
                  <Image src={sub.image} alt={sub.title} fill />
                  <div className={styles.categoryCardBadge}>{sub.badge}</div>
                </div>
                <div className={styles.categoryCardBody}>
                  <h3 className={styles.categoryCardTitle}>{sub.title}</h3>
                  <p className={sub.featured ? styles.categoryCardDescFeatured : styles.categoryCardDesc}>{sub.desc}</p>
                  <Link href={`/urunler/${sub.slug}`} className={styles.categoryCardBtn}>
                    DETAYLI İNCELE <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <h2 className={`${styles.categorySectionTitle} ${styles.sectionGap}`}>Sürme Sistem</h2>
          <div className={styles.categoryGrid}>
            {product.subProducts.slice(2, 4).map((sub: any, i: number) => (
              <div key={i} className={`${styles.categoryCard} ${sub.featured ? styles.categoryCardFeatured : ''}`}>
                <div className={styles.categoryCardImg}>
                  <Image src={sub.image} alt={sub.title} fill />
                  <div className={styles.categoryCardBadge}>{sub.badge}</div>
                </div>
                <div className={styles.categoryCardBody}>
                  <h3 className={styles.categoryCardTitle}>{sub.title}</h3>
                  <p className={sub.featured ? styles.categoryCardDescFeatured : styles.categoryCardDesc}>{sub.desc}</p>
                  <Link href={`/urunler/${sub.slug}`} className={styles.categoryCardBtn}>
                    DETAYLI İNCELE <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section>
            <div className={styles.tagline}>
              <p className={styles.taglineText}>
                {product.tagline?.split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
          </section>

          {product.features.length > 0 && (
            <section className={styles.features}>
              <div className={styles.featuresGrid}>
                {product.features.map((f: any, i: number) => (
                  <div key={i} className={styles.featureCard}>
                    <div className={styles.featureCardImg}>
                      <Image src={f.img} alt={f.title} fill />
                    </div>
                    <div className={styles.featureCardBody}>
                      <h3 className={styles.featureCardTitle}>{f.title}</h3>
                      <p className={styles.featureCardDesc}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className={styles.fullBanner}>
            <Image src={product.safetyImg} alt="Güvenlik" fill className={styles.fullBannerImg} />
            <div className={styles.fullBannerOverlay}>
              <h2 className={styles.fullBannerTitle}>{product.safetyTitle || 'Güvenlik Önceliğimiz!'}</h2>
              <p className={styles.fullBannerDesc}>
                {product.safetyDesc || 'Paneller istenilen yükseklikte konumlanarak hem çocuklar hem de evcil hayvanlar için güvenli bir ortam oluşturur.'}
              </p>
            </div>
          </div>

          {product.cleaningSteps && product.cleaningSteps.length > 0 && (
            <section className={styles.cleaning}>
              <div className={styles.cleaningGrid}>
                <div className={styles.cleaningImgWrap}>
                  <img src={product.cleaningImg} alt="Temizlik" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.cleaningContent}>
                  <h2>Nasıl Temizlenir?</h2>
                  <p>{product.cleaningDesc || '%100 silinebilir cam panelleriyle temizliği zahmetsiz hale getirir.'}</p>
                  <ul className={styles.steps}>
                    {product.cleaningSteps.map((step: string, i: number) => (
                      <li key={i} className={styles.step}>
                        <span className={styles.stepNum}>{i + 1}</span>
                        <span className={styles.stepText}>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {product.tests && (
            <section className={styles.testSection}>
              <div className={styles.testHeader}>
                <h2 className={styles.testTitle}>Testleri Geçtik!</h2>
              </div>
              <div className={styles.testGrid}>
                {product.tests.map((test: any, i: number) => (
                  <div key={i} className={styles.testCard}>
                    <div className={styles.testIcon}><i className={test.icon} /></div>
                    <h3 className={styles.testCardTitle}>{test.title}</h3>
                    <p className={styles.testCardDesc}>{test.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={styles.darkFeatures}>
            <h2 className={styles.darkFeaturesTitle}>Teknik Üstünlükler</h2>
            <div className={styles.darkFeaturesGrid}>
              {product.darkFeatures.map((f: any, i: number) => (
                <div key={i} className={styles.darkCard}>
                  <div className={styles.darkIcon}><i className={f.icon} /></div>
                  <h3 className={styles.darkCardTitle}>{f.title}</h3>
                  <p className={styles.darkCardDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {product.sections?.map((section: any, idx: number) => {
            if (section.type === 'text_image') {
              return (
                <section key={idx} className={`${styles.textImageSection} ${section.reverse ? styles.reverse : ''}`}>
                  <div className={styles.textImageContent}>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <p className={styles.sectionText}>{section.content}</p>
                  </div>
                  <div className={styles.textImageImg}>
                    <Image src={section.image} alt={section.title} fill />
                  </div>
                </section>
              );
            }
            if (section.type === 'highlight') {
              return (
                <section key={idx} className={styles.highlightSection}>
                  <div className={styles.highlightCard}>
                    {section.badge && <span className={styles.highlightBadge}>{section.badge}</span>}
                    <h2 className={styles.highlightTitle}>{section.title}</h2>
                    <p className={styles.highlightContent}>{section.content}</p>
                  </div>
                </section>
              );
            }
            if (section.type === 'grid') {
              return (
                <section key={idx} className={styles.customGridSection}>
                  <h2 className={styles.gridTitle}>{section.title}</h2>
                  <div className={styles.customGrid}>
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className={styles.gridItem}>
                        <div className={styles.gridItemIcon}><i className={item.icon} /></div>
                        <h3 className={styles.gridItemTitle}>{item.title}</h3>
                        <p className={styles.gridItemDesc}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }
            return null;
          })}


          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaBannerTitle}>Ücretsiz Keşif ve Fiyat Teklifi</h2>
            <p className={styles.ctaBannerSub}>Albert Genau yetkili bayi olarak uzman ekibimiz adresinize geliyor.</p>
            <Link href="/iletisim" className={styles.ctaBtn}>HEMEN İLETİŞİME GEÇ</Link>
          </div>


        </>
      )}
    </>
  );
}
