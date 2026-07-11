'use client';
import styles from './product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const PRODUCT_DATA: any = {
  'giyotin-tam-balkon': {
    badge: 'Albert Genau — Tambalkon®',
    heroTitle: 'Giyotin Tam Balkon',
    heroSub: 'Minimal profiliyle görünmez, panoramik görüşüyle fark edilir.',
    heroImg: '/images/giyotin-balkon-banner.png',
    tagline: 'Balkonunuzda yer kaybetmeden, tek tuşla açılıp kapanan yeni nesil motorlu giyotin cam sistemi ile tanışın. Albert Genau mühendisliğiyle geliştirilen Tambalkon®, minimal profil yapısı, panoramik görüş avantajı, yüksek yalıtım performansı ve güvenli dikey hareket teknolojisiyle yaşam alanlarınıza modern bir konfor standardı kazandırır.',
    textFeatures: {
      title: 'Neden Tambalkon® Giyotin Cam Balkon',
      desc: 'Klasik cam balkon sistemlerinde alan kaybı, panel birikmesi ve manuel kullanım alışkanlıklarını geride bırakın. Tambalkon®, dikey hareket eden cam panelleri sayesinde balkonunuzu ferah, güvenli ve fonksiyonel bir yaşam alanına dönüştürür.',
      img: '/images/cambalkon/tambalkon_odul.jpg',
      items: [
        { title: 'Tam Otomatik Kumandalı Kullanım', desc: 'Cam panelleri tek tuşla açın, kapatın veya dilediğiniz seviyede durdurun. Tambalkon®, günlük kullanımda pratik ve konforlu bir deneyim sunar.' },
        { title: 'Yer Kazandıran Dikey Hareket', desc: 'Katlanır sistemlerdeki panel birikmesi yerine, camlar yukarı-aşağı hareket eder. Böylece balkon mobilyalarınız ve kullanım alanınız korunur.' },
        { title: 'Panoramik ve Minimal Görünüm', desc: 'Az profilli tasarım ve geniş cam yüzeyler sayesinde manzaranız kesintiye uğramaz; içerisiyle dışarısı arasındaki sınır zarifçe azalır.' }
      ]
    },
    features: [],
    safetyImg: '/images/cambalkon/cam_balkon_guvenlik.jpg',
    safetyTitle: 'Güvenliği Önceleyen Dikey Cam Sistemi',
    safetyDesc: 'Paneller istenilen yükseklikte konumlandırılabilir. Böylece çocuklar ve evcil hayvanlar için daha kontrollü, daha güvenli ve daha konforlu bir balkon kullanımı sağlanır.',
    cleaningImg: '/images/cambalkon/tambalkon-temizleme.mp4',
    cleaningTitle: 'Tambalkon nasıl temizlenir?',
    cleaningDesc: 'Tambalkon®, %100 erişilebilir cam panelleriyle temizlik sürecini güvenli ve zahmetsiz hale getirir. Dışarıya sarkmaya gerek kalmadan tüm yüzeylere içeriden ulaşabilirsiniz.',
    cleaningSteps: [
      'Uzaktan kumanda ile sistemi tam açık konuma getirin.',
      'Push butonlara basarak alt paneli serbest bırakın.',
      'Panelleri eğimli konuma alarak camları içeriden temizleyin.'
    ],
    darkFeatures: [
      { icon: 'fas fa-shield-halved', title: 'Maksimum Yalıtım Performansı', desc: 'EPDM conta ve kıl fırça birleşimiyle tüm temas noktalarında çok katmanlı yalıtım sağlar. Cambalkonlar arasında en yüksek yalıtım değerine sahip sistem.' },
      { icon: 'fas fa-pen-ruler', title: 'Estetik ve Fonksiyonellik', desc: 'Az profilli tasarımı ve açıldığında korkuluk görevi görmesiyle şık ve estetik bir balkon keyfi sunar. Minimalist bir şıklık, mükemmel fonksiyon.' },
      { icon: 'fas fa-wind', title: 'Havalandırma Seçenekleri', desc: 'Tam açık, tam kapalı veya istediğiniz aralıkta. Tambalkon, size dilediğiniz şekilde havalandırma seçeneği sunarak maksimum fonksiyonellik sağlar.' }
    ],
    bottomFeatures: [
      { img: '/images/cambalkon/Kumandali-Cambalkon.webp', title: 'Tam Otomatik Kumandalı Kolaylık', desc: 'Bir tuşla açın, kapatın, kontrol tamamen sizde. Tambalkon®, uzaktan kumanda ile pratik ve konforlu bir cam balkon deneyimi sunar.' },
      { img: '/images/cambalkon/Yer-Kazandiran-Giyotin-Cambalkon.webp', title: 'Tambalkon Yer Kazandıran Giyotin Cam Balkon', desc: 'Yer Kazandıran Tasarım. Katlanır cam sistemleri birikme yapar, yer kaybettirir. Tambalkon aşağı ve yukarı hareket eden camlar ile yer tasarrufu sağlar, alanınızı genişletir. Hayalinizdeki balkonu dekore edebilirsiniz.' },
      { img: '/images/cambalkon/Panoramik-Manzara-Giyotin-Cambalkon.webp', title: 'Tambalkon Panoramik Manzara', desc: 'Tam Panoramik Manzara. Minimal profiller ve geniş cam yüzeyler, manzaranızı kesintisiz algılamanızı sağlar. Tambalkon®, balkona daha ferah ve modern bir atmosfer kazandırır.' }
    ],
    sections: [
      {
        type: 'text_image',
        reverse: true,
        bg: '#f1f2f2',
        imageFit: 'contain',
        title: 'Paslanmaz Inox Zincir',
        content: 'Tambalkon®’da kullanılan paslanmaz inox zincirler, 1440 saat tuzlu su testine tabi tutulmuş ve 10 yıl paslanmazlık garantisi ile sunulmuştur.\n\nBu teknoloji; sessiz, sıkışma yapmayan ve uzun ömürlü bir kullanım sağlarken, klasik zincir veya kayış arızalarına karşı yüksek dayanım sunar.',
        image: '/images/cambalkon/inox-gorsel.webp'
      }
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
    heroImg: '/images/biyoklimatik-balkon.png',
    tagline: 'Pergola, bioklimatik pergola ya da bioklimatik pergola fiyatları... Pergola ile ilgili aranan her şeyi yeniledik. Dünya’nın 86 ülkesinde 500’ün üzerinde üretici bayisi ile sektör lideri Albert Genau, yeni nesil bioklimatik pergola sistemini tasarladı. Tüm detaylarıyla, %100 Albert Genau…',
    features: [
      { img: '/images/bioklimatik/Kesintisiz-Oval-Dikme.webp', title: 'Kesintisiz Oval Dikme', desc: 'Albert Genau Bioklimatik Pergola, geleneksel pergola sistemlerinden farklı olarak dikmelerin görünümünü estetik ve fonksiyonel olarak çeşitlendirir. Oval dikme kapağı ve düz dikme kapağı gibi seçeneklerle farklı zevklere hitap ederken, her iki seçenekte de kesintisiz bir dikme görünümü sunar.' },
      { img: '/images/bioklimatik/Makasli-Sistem.webp', title: 'Makaslı Sistem', desc: 'Bioklimatik pergolanın panelleri, makas sistemi ile birbirine bağlanarak senkronize bir şekilde açılıp kapanma hareketi gerçekleştirir ve her türlü ortamda güvenilir performans sunar. Bu makaslar, hareket sırasında panellerin konumunu ve hızını kontrol altında tutarak sistemin bütünlüğünü her an korur.' },
      { img: '/images/bioklimatik/Monoblok-Oluk.webp', title: 'Monoblok Oluk', desc: 'Pergolanın olukları çift katmanlı yapısı ile ekstra dayanıklıdır. Bu çift hücreli yapı anti sehim geometri özelliği taşır. Kenet mekanizması ile montajı ekstra kolay olan oluk, monoblok oluşuyla her türlü Albert Genau cam balkon, sürme ve giyotin sistem entegrasyonunda, su yalıtımını ve drenajını engellemeyecek şekilde tasarlanmıştır.' },
      { img: '/images/bioklimatik/Adaptif-Hareket.webp', title: 'Adaptif Hareket', desc: 'Albert Genau Bioklimatik Pergola, özenle tasarlanmış ray ve panel mekanizmalarıyla donatılmıştır. Adaptif hareket özelliği, kurulum sırasında veya kullanım esnasında oluşabilecek hataları etkin bir şekilde sönümleyerek panellerin hareketini kontrol altında tutar ve güvenli bir şekilde sistem hareketi devam eder.', isWide: true }
    ],
    safetyTitle: 'Yaprak Tutuculu Drenaj Sistemi',
    safetyDesc: 'Bioklimatik Pergola, su drenaj sisteminde özel olarak tasarlanmış yaprak tutucusuyla donatılmıştır. Bu yaprak tutuculu drenaj sistemi, oluğun içine entegre edilerek su giderini tıkayabilecek materyallere karşı koruma sağlar. Aynı zamanda, kolay takılabilir ve çıkarılabilir yapısıyla bakımı son derece pratiktir. Pergolanın su drenaj sistemi, kullanıcıya hem güvenlik hem de kolaylık sağlayarak, uzun ömürlü ve düşük bakım gereksinimli bir çözüm sunar.',
    safetyImg: '/images/bioklimatik/yaprak-tutucu.webp',
    sections: [
      {
        type: 'text_image',
        title: 'Bioklimatik Pergola Nedir?',
        content: 'Pergola, gölgelendirme amaçlı yapılmış çatı sistemlerinin genel adıdır. Bioklimatik pergola, alüminyum lamellerden oluşan çatı sistemine sahip, motor ve uzaktan kumanda ile bu çatı sisteminin lamellerinin hareket ettirildiği gölgelendirme yapısıdır. Eski nesil bioklimatik pergolaların sadece lamelleri olduğu yerde hareket eder ya da motorun yanı sıra ikinci bir aktüatör yardımı ile lameller hareket ettirilir, lamel hareketleri çelik teller ile sağlanır.',
        image: '/images/products/pergola_v2.jpg',
        reverse: false
      },
      {
        type: 'text_image',
        title: 'Albert Genau\nBioklimatik Pergola Sistemi',
        content: 'Albert Genau Biokimatik Pergola Sistemi, tek motor ve uzaktan kumanda ile hareket eder. Pergola sisteminin lamellerin senkronize hareketi, özel tasarım makas sistemi ile sağlanır. Kendi kendine ayakta durabilen Albert Genau Bioklimatik Pergola Sistemi, her türlü iklim koşullarında sorunsuz ve konforlu kullanım için tasarlanmıştır.\n\nBahçenizde ve terasınızda, bioklimatik pergola sistemleri kurabilir, sistemlerin etrafını yine Albert Genau hareketli cambalkon sitemleri ile kapatarak, keyifli mekanlar oluşturabilirsiniz. Bioklimatik pergola sitemlerinin tavanını, istediğiniz kadar açıp, istediğiniz kadar kapatabilirsiniz.',
        image: '/images/products/pergola_final.jpg',
        reverse: true
      },
      {
        type: 'text_image',
        badge: '%100',
        title: 'Bioklimatik Pergola ve Diğer Sistemler %100 Entegre',
        content: 'Albert Genau Bioklimatik pergola sistemlerinin etrafını, isterseniz sürme cambalkon sistemleri ile isterseniz otomatik giyotin cam sistemleri veya cambalkon sistemleri ile kapatabilirsiniz. Pergola sistemi, bu sistemler ile %100 entegre tasarlandığı için, montaj sırasında herhangi bir sıkıntı yaşanmaz. Tüm sistemler %100 Albert Genau garantisinde olur.',
        image: '/images/bioklimatik/ag-bioklimatik-pergola.jpg',
        reverse: false
      },
      {
        type: 'text_gallery',
        title: 'Çift Yönlü Ambiyans Aydınlatma',
        content: 'Albert Genau Bioklimatik Pergola çift yönlü aydınlatma özelliğiyle donatılmıştır. Ambiyans aydınlatma seçeneği, mekânın genel aydınlatmasının yanı sıra çoklu modlara sahip, ayarlanabilir renk spektrumuyla her türlü atmosfere uyum sağlar. Pergolanın aydınlatma fonksiyonu, sonradan eklenme özelliğiyle ambiyans aydınlatma, ortam aydınlatma ve tamamen aydınlatmasız şekillerde uygulanabilir. Bu seçeneklerin her birinde, estetikten ödün verilmeden, kullanıcıya en uygun aydınlatma deneyimi sunulur.',
        images: [
          '/images/bioklimatik/ambiyans_01.webp',
          '/images/bioklimatik/ambiyans_02.webp',
          '/images/bioklimatik/ambiyans_03.webp'
        ]
      },
      {
        type: 'text_features',
        image: '/images/bioklimatik/estetik_alimunyum.webp',
        features: [
          {
            title: 'Gizli Bağlantı Elemanlarıyla Estetik Görünüm',
            desc: 'Bioklimatik Pergolanınbağlantı elemanları dışarıdan görünmez şekilde tasarlanmıştır. Bioklimatik pergola taşıyıcı dikmeler, kiriş ve oluk profillerinin bağlantısı, tasarımda kullanılan tercihlerve özenle seçilmiş aksamlar sayesinde estetik görünümünü korur. Ayrıca, sistemde gizli ayak opsiyonu da kullanıcılara sunulmaktadır, bu da Albert Genau Bioklimatik Pergolayı tercih edenlere estetik ve işlevsellik açısından daha fazla esneklik sunar.'
          },
          {
            title: 'T6 Termik Seviyeli Güçlendirilmiş Alüminyum Profiller',
            desc: 'Pergolada T6 termik seviyeli güçlendirilmiş profiller kullanılmaktadır. Bu profiller, güvenlik ve sağlamlığı ön planda tutarak yüksek taşıma kapasitesi ve dayanıklı bir yapı sunar. T6 termik seviyeli profiller, uzun ömürlü ve güvenilir bir performans sağlamak için özenle tasarlanmıştır.'
          }
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
    heroTitle: 'Tiara Twinmax\nIsıcam\'lı Cam Balkon',
    heroSub: '',
    heroImg: '/images/twinmax/Tiara-Twinmax-Isicamli-Cambalkon-Sistemi.webp',
    tagline: 'Cam balkon sistemlerinde ulaşılan en üst düzey ısı yalıtım teknolojisi Tiara Twinmax ile tanışın. Albert Genau kalitesi ve mühendisliğiyle tasarlanan bu yeni nesil Isıcam\'lı cambalkon, yaşam alanlarınıza minimalist bir şıklık katarken, kışın soğuktan, yazın ise aşırı sıcaktan koruyarak dört mevsim kesintisiz konfor sunar.',
    features: [],
    safetyImg: '',
    safetyDesc: '',
    cleaningImg: '',
    cleaningSteps: [],
    sections: [
      {
        type: 'text_list_with_image',
        title: 'Neden Tiara Twinmax\nIsıcam\'lı Cam Balkon',
        content: 'Klasik balkon kapatma yöntemlerini unutun. Tiara Twinmax, estetik tasarımı ve maksimum sızdırmazlık performansını bir araya getirerek balkonunuzu evinizin en konforlu odasına dönüştürür.',
        image: '/images/twinmax/Tiara-Twinmax-Isicamli-Cambalkon-Sistemi.webp',
        features: [
          {
            title: '5 Kata Varan Üstün Isı Yalıtımı',
            desc: 'Sistemde kullanılan Isıcam teknolojisi sayesinde, standart tek camlı balkonlara kıyasla 5,1 kata varan daha yüksek ısı yalıtımı ve enerji tasarrufu sağlanır.'
          },
          {
            title: 'Avrupa Test Sertifikalı Dayanıklılık',
            desc: 'Sınıfının ulaşabileceği en yüksek hava, su, rüzgar ve ses yalıtımı değerlerine sahip, uluslararası akredite testlerden başarıyla geçmiş tek sertifikalı sistemdir.'
          },
          {
            title: 'Köşesiz Kesintisiz Tasarım',
            desc: 'İster düz ister açılı/oval balkon mimarisine sahip olun; özel tasarım kanatlar direksiz olarak tamamen açılabilir ve manzaranız bölünmez.'
          }
        ]
      }
    ],
    extraSections: [
      {
        type: 'text_image_full',
        title: 'Gizli Su Tahliye Sistemi',
        content: 'Taşıyıcı kasa profili üzerinde yer alan gizli hava kanalları ve su tahliye sistemi, ani sağanak yağışlarda bile suyu hızla dışarı akıtır. Oluşabilecek kondens (terleme) suyunu tahliye ederken dışarıdan doğrudan hava girişini de engeller.',
        image: '/images/twinmax/Tiara-Twinmax-Gizli-Su-Tahliye-Sistemi.webp'
      },
      {
        type: 'text_image_dark',
        title: 'Mekanlara Özgürlük Veren\nEşik Çözümleri',
        content: 'Farklı ihtiyaçlara cevap verebilen eşikli ve eşiksiz ray profilleri sayesinde, Tiara Twinmax hem iç mekan bölmelerinde hem de dış mekan kapatmalarında maksimum esneklik sağlar. Geçiş alanlarında takılmaları önleyen özel eşiksiz alt kasa tasarımıyla konforunuzu artırır.',
        image: '/images/twinmax/Tiara-Twinmax-Mekanlara-Farkli-Esik-Cozumleri.webp'
      }
    ],
    bottomFeatures: [
      {
        img: '/images/twinmax/Tiara-Twinmax-Miknatisli-ve-EPDM-Contali-Maksimum-Izolasyon.webp',
        title: 'Mıknatıslı ve EPDM Contalı Maksimum İzolasyon',
        desc: 'Kanat birleşimlerinde kullanılan yalıtım fırçası, EPDM conta yapısı ve mıknatıslı conta yatakları sayesinde dışarıdaki rüzgar, yağmur ve ses içeri sızamaz. Kusursuz bir izolasyon deneyimi sunar.',
        wide: true
      },
      {
        img: '/images/twinmax/Tiara-Twinmax-Gelismis-Ispanyolet-Kilit-ile-Ekstra-Guvenlik.webp',
        title: 'Gelişmiş İspanyolet Kilit ile Ekstra Güvenlik',
        desc: 'Albert Genau tarafından özel olarak geliştirilen gizli gömme kollu ispanyolet kilit sistemi, standart zincirli kilitlere veda etmenizi sağlar. Hem estetik bir görünüm sunar hem de dışarıdan zorlamalara karşı üst düzey güvenlik vadeder.',
        wide: true
      },
      {
        img: '/images/twinmax/Tiara-Twinmax-Paslanmaz-Teker-ile-Omur-Boyu-Kullanim.webp',
        title: 'Paslanmaz Teker ile Ömür Boyu Kullanım',
        desc: 'Cambalkon sistemlerinin tüm yükünü taşıyan tekerlek mekanizmaları dış iklime tamamen dayanıklıdır. Tiara\'nın özel tekerlekleri 1440 saat tuz testine tabi tutulmuş olup, 10 yıl paslanmazlık garantisi altındadır. İlk günkü gibi sessiz ve akıcı çalışır.',
        wide: true
      }
    ],
    finalFeatures: [
      {
        img: '/images/twinmax/Tiara-Twinmax-Entegre-Jaluzi-Perde-ile-Pratik-Gunes-Kontrolu.webp',
        title: 'Entegre Jaluzi Perde ile Pratik Güneş Kontrolü',
        desc: 'Balkonunuzda ekstra perde temizleme ve montaj derdine son! Sistemimiz, iki cam arasına yerleştirilen Isıcam arası jaluzi perde uygulamalarıyla tam uyumludur. Güneş ışığını ve mahremiyetinizi balkon alanını daraltmadan estetikçe yönetin.\n\nNot: Isıcam arası jaluzi uygulaması opsiyoneldir ve jaluzi Albert Genau tarafından üretilmemektedir.'
      },
      {
        img: '/images/twinmax/Tiara-Twinmax-Ruzgar-Kilidi-ile-Ekstra-Guvenlik.webp',
        title: 'Rüzgar Kilidi ile Ekstra Güvenlik',
        desc: 'Yüksek katlı veya yoğun rüzgar alan binalarda, açık konumdaki cam kanatları güvenle bir arada tutan rüzgar kilidi mekanizması, zorlu hava koşullarında dahi tam denge sağlar.\n\nNot: Rüzgar kilidi donanımı opsiyonel bir Albert Genau çözümüdür, siparişiniz esnasında ayrıca talep ediniz.'
      },
      {
        img: '/images/twinmax/Tiara-Twinmax-Patentli-Cocuk-Emniyet-Kilidi-ile-Tam-Guvenlik.webp',
        title: 'Patentli Çocuk Emniyet Kilidi ile Tam Güvenlik',
        desc: 'Menteşeli panellere entegre edilebilen kilit sistemi sayesinde çocuklarınız balkonda oynarken aklınız onlarda kalmaz. Maksimum çocuk güvenliği için özel koruma.'
      }
    ],
    darkFeatures: [],
    testimonials: []
  },
  'tiara-08-10': {
    isCategory: false,
    featured: true,
    badge: 'Albert Genau — Tiara®',
    heroTitle: 'Tek Camlı Katlanır Cam Balkon',
    heroSub: '',
    heroImg: '/images/tiara-08-10/slider-foto-tek-camli.png',
    tagline: 'Yeni nesil cam sistemi Tiara ile birlikte balkonunuzu evinizin kullanışlı bir odası haline getirebilirsiniz. Bu sistem uzun yıllar teknik servise ihtiyaç duymadan kullanılmak üzere geliştirilmiştir. Alışveriş merkezlerinde, restaurantlarda, kafe ve ofislerde açıldığında ihtiyaç duyduğunuz alanlar için esnek çözümler sunduğu gibi kapandığında da güvenli ve görünür hale getirmektedir.',
    features: [],
    safetyImg: '',
    safetyDesc: '',
    cleaningImg: '',
    cleaningSteps: [],
    sections: [
      {
        type: 'text_list_with_image',
        title: 'HER BALKONA\nHER MEKANA UYGUN!',
        content: 'Tiara ile yeni yaşam alanınızın keyfine varın. Maksimum genişliğe kadar kanat yapısına izin veren bu sistem, eşsiz bir panoramik görüntü imkanı sunuyor. Sistemin menteşeli panelleri üzerine entegre edilen çocuk kilidi sayesinde, çocuğunuz emniyette.',
        image: '/images/tiara-08-10/kaliteli-tekcamli-01.png',
        features: [
          {
            title: 'Cam Balkonu Açıp Kapatmak Çok Kolay',
            desc: 'İple ve zincirle uğraşmadan cam balkonunuzu kolayca açıp kapatın. Konfor Kilit pencere kadar güvenli ve kapalıyken gizlenen kol tasarımı ile estetik bir görüntü sağlar. Standart kilit zincirli olup, konfor kilit opsiyoneldir.'
          },
          {
            title: 'Gizli Su Tahliye Sistemi',
            desc: 'Taşıyıcı kasa profili üzerindeki gizli buhar kanalı sayesinde sağlanan hem kozmetik hem de verimli su tahliye sistemi, yine bir Tiara özelliği. Kondens kanalı sayesinde hızlı tahliyenin yanında dış ortamdan doğrudan hava girişini de engeller.'
          },
          {
            title: 'Durdurulamaz Hareket',
            desc: '38 mm çapında, altta 4, üstte 4, toplam 8 adet özel mühendislik plastiği kaplanmış %100 paslanmaz teker kullanılmıştır. Tüm kanatlar, konforlu şekilde, en az sürtünme ve ses ile hareket eder, açılıp kapanır.'
          }
        ]
      },
      {
        type: 'text_image',
        title: 'Tiara08 — Incek Life Blue, Ankara',
        content: 'Sistem Sayısı: 226 Sistem | Balkon Tipi: 9 Tip | Toplam Cam: 2.076 m²\n\n9 farklı tipte 226 adet balkondan oluşan Sinpaş İncek Life Blue Projesi\'nde cambalkonlarda Albert Genau tercih edilmiştir. Projenin yüksek katlı olmasının teknik ve güvenlik taleplerine cevap veren en uygun cambalkon olarak Tiara 08 olduğuna karar verilmiştir.',
        image: '/images/tiara-08-10/Tiara08.png',
        reverse: false,
        imageFit: 'cover'
      },
      {
        type: 'text_image',
        title: 'Tiara10 — Folkart Time, İzmir',
        content: 'Sistem Sayısı: 72 Sistem | Balkon Tipi: 3 Tip | Toplam Cam: 752 m²\n\nAlbert Genau, İzmir\'de bulunan Folkart Time projesinin 3 farklı tip, 72 balkonu Tiara10 cambalkon sistemi ile tamamlamıştır. Tiara10 balkon camlama sisteminin özelliği sayesinde, lüks rezidans tipli dairelere yeni bir yaşam alanı eklenmiştir.',
        image: '/images/tiara-08-10/Tiara10.jpg',
        reverse: true,
        imageFit: 'cover'
      }
    ],
    extraSections: [
      {
        type: 'text_image_full',
        title: 'Gizli Su Tahliye Sistemi',
        content: 'Taşıyıcı kasa profili üzerindeki gizli buhar kanalı sayesinde sağlanan hem kozmetik hem de verimli su tahliye sistemi, yine bir Tiara özelliği. Kondens kanalı sayesinde hızlı tahliyenin yanında dış ortamdan doğrudan hava girişini de engeller.',
        image: '/images/tiara-08-10/yeni_gizli_su_tahliye_sistemi.png'
      },
      {
        type: 'text_image_dark',
        title: 'Düşmez, Sarkmaz\nCam Kanatlar',
        content: 'Tiara Cambalkon Sistemi için özel bir kilitleme mekanizması geliştirildi. "ABL Auto Brake Lock" adı verilen sistem ile kayar cam paneller park alanına geldiklerinde, otomatik kilitlenip, kanadın yerinden oynamadan açılması sağlanıyor.',
        image: '/images/tiara-08-10/yeni_cam_kanatlar.png'
      }
    ],
    darkFeatures: [
      { icon: 'fas fa-award', title: 'EU Patent — Avrupa Patenti', desc: 'Patent, 38 Avrupa ülkesinde geçerli Avrupa Patent Ofisi (European Patent Office) tarafından onaylandı.' },
      { icon: 'fas fa-certificate', title: 'Pfb Sertifikası', desc: 'Tiara Balkon Camlama Sistemi, Avrupa Birliği normlarına göre test edilmiştir ve yüksek sınıf kategorisinde yer almaktadır.' },
      { icon: 'fas fa-shield-halved', title: 'Paslanmazlık', desc: 'Albert Genau ürünleri, %100 paslanmaz malzeme ile üretilip, 10 yıl paslanmazlık garantisi altındadır.' },
      { icon: 'fas fa-handshake', title: 'Garanti', desc: 'Albert Genau, alüminyum profillere, sistemin çalışırlığına ve tüm aksesuarlara 2 yıl garanti sağlamaktadır.' }
    ],
    bottomFeatures: [
      {
        img: '/images/tiara-08-10/Tiara-Durdurulamaz-Hareket.png',
        title: 'Durdurulamaz Hareket',
        desc: '38 mm çapında, altta 4, üstte 4, toplam 8 adet özel mühendislik plastiği kaplanmış %100 paslanmaz teker kullanılmıştır. Tüm kanatlar, konforlu şekilde, en az sürtünme ve ses ile hareket eder.'
      },
      {
        img: '/images/tiara-08-10/Tiara-Ekstra-Guvenli-Cam-Pimi.png',
        title: 'Ekstra Güvenli — Cam Pimi',
        desc: 'Sistemde kanatların camlar ile birleşimi sadece kimyasallar ile değil, cama monte edilen pimler ile sağlanmaktadır. Bu sayede kanatlar, yüksek taşıma kapasitesine sahip olurlar.'
      },
      {
        img: '/images/tekcamlı-katlanir/estetik_topuz.png',
        title: 'Estetik Topuzlu Kilit',
        desc: 'Albert Genau isteğe bağlı olarak topuzlu kilit mekanizması tasarlamıştır. Bu mekanizma şık bir görüntü, minimal tasarım ve kullanım kolaylığı sağlamaktadır.'
      }
    ],
    finalFeatures: [
      {
        img: '/images/tekcamlı-katlanir/super_fitil.png',
        title: 'Alüminyum Fitiller',
        desc: 'Sistemde yalıtımı artırmak için, cam panellerin birleşiminde — ister düz, ister açılı — kendinden izolasyon fırçalı alüminyum fitiller, şıklığı ve uzun ömürlü kullanımı ile farkını gösteriyor.'
      },
      {
        img: '/images/tiara-08-10/Tiara-Kolay-Temizlik.jpg',
        title: '100% Kolay Temizlik',
        desc: 'Sistemin tüm camları, tek tek içeri açılabildiği için, hem dıştan hem içten çok rahatlıkla silinebilir.'
      },
      {
        img: '/images/tiara-08-10/Tiara-Cocuk-Emniyet-Kilidi.png',
        title: 'Çocuk Emniyet Kilidi',
        desc: 'Sistemin menteşeli panelleri üzerinde AG patentli çocuk emniyet kilidi entegre edilebilir. Bu kilit kapalı olduğu sürece, çocuğunuz emniyette.'
      },
      {
        img: '/images/tiara-08-10/Tiara-Kanat-Sabitleme-Aparati.png',
        title: 'Kanat Sabitleme Aparatı',
        desc: 'Kanat sabitleme aparatı kasa profiline bağlıdır. Kanatların güvenli bir şekilde toplanmasını sağlar ve kontrol dışı hareketleri önler.'
      },
      {
        img: '/images/tiara-08-10/Tiara-Yukseklik-Ayar-Profili.jpg',
        title: 'Yükseklik Ayar Profili',
        desc: 'Bütün Tiara Sistemleri ile uyumlu olan bu profil, terazi ayarı gereken durumlarda kolay, hızlı ve kesin çözümler sunar.'
      },
      {
        img: '/images/tiara-08-10/Tiara-Acili-Lamel.png',
        title: 'Açılı Lamel',
        desc: 'Yalın ve akıllı tasarım ile tasarlanan yeni kompakt açılı lamel, kavisli uygulama alanlarında eşsiz bir birleşme detayı sağlar.'
      }
    ],
    tests: [
      { icon: 'fas fa-droplet', title: 'SU TESTİ', desc: "Tiara Balkon Camlama Sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, su geçirgenliği testine tabi tutulup, Avrupa Birliği normlarına göre Class2A sınıfını elde etti." },
      { icon: 'fas fa-wind', title: 'RÜZGAR GEÇİRGENLİĞİ TESTİ', desc: "Tiara Balkon Camlama sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, rüzgar geçirgenliği testine tabi tutulup, Avrupa Birliği normlarına göre Class2 sınıfını elde etti." },
      { icon: 'fas fa-hand-fist', title: 'DARBE DAYANIKLILIK TESTİ', desc: "Tiara Balkon Camlama Sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, darbe dayanıklılık testine tabi tutulup, Avrupa Birliği normlarına göre ClassI2/E5 sınıfını elde etti." },
      { icon: 'fas fa-gauge-high', title: 'RÜZGAR YÜKÜ TESTİ', desc: "Tiara Balkon Camlama sistemlerimiz, Almanya PFB Teknik Enstitüsü'nde, rüzgar yükü testine tabi tutulup, Avrupa Birliği normlarına göre Class3 sınıfını elde etti." }
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
  'isicamli-surme-cam-balkon': {
    badge: 'Albert Genau — SlideMaster®',
    heroTitle: 'Isıcamlı Sürme Cam Balkon',
    heroSub: 'Sürme Cambalkon Sistemlerinin Standartlarını Yukarı Taşıyor.',
    heroImg: '/images/isicamli-surme-cam-balkon/buyuk-slider-cam-balkon.png',
    tagline: 'Isıcam\'lı sürme cambalkon SlideMaster, sürme cambalkon sistemlerinin standartlarını yukarı taşıyor. Sürme cambalkon sistemleri yalıtım, konfor ve estetik açıdan incelenerek yenilendi. Balkonlarınızı, kış bahçelerinizi ve restorantlarınızı eşsiz yaşam alanlarına dönüştürüyor.',
    features: [
      { img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__1_.jpg', title: 'Durdurulamaz Hareket', desc: '150 kg panel taşıma kapasitesine sahip, paslanmaz rulmanlı, süspansiyonlu Speed-HD teker ile en az sürtünme ve sessiz hareket.' },
      { img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__2_.jpg', title: 'Üç Boyutlu Tam İzolasyon', desc: 'Cam panellerin dikey birleşiminde, duvar bitimlerinde ve ray-panel arasındaki tüm boşluklarda izolasyon fırçaları ile maksimum yalıtım.' },
      { img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__3_.jpg', title: 'Her Köşe Tamamen Açık', desc: 'L ve U şeklindeki mekânlar için tasarlanan kanat profilleri sayesinde hiçbir sabit köşe birleşim profili olmadan tam açıklık.' }
    ],
    sections: [
      {
        type: 'text_list_with_image',
        title: '4 KAT YALITIM\nYAZLAR SERIN, KIŞLAR SICAK!',
        content: 'SlideMaster hem ısıcam\'lı hem tek camlı olarak kullanılabilme özelliğine sahiptir. Sürme sistemlerindeki yalıtım dezavantajını ortadan kaldırıyor ve köşeleri açık hale getiriyor. 1,5 metre panellere ve Albert Genau patentli taşıyıcı tekerleri sayesinde tek cama göre 4,3 kata varan ısı yalıtımı sağlanabilmektedir.',
        image: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__6_.jpg',
        features: [
          {
            title: 'Sonsuz Raylı Sistem',
            desc: 'Özel tasarımı sayesinde 1+1 raydan istenilen sayıya kadar ray yapabilmeye imkan verir. İstediğiniz kadar panel sayısına ulaşılıp, minimum ve maksimum açıklıklar istenilen esneklikte ayarlanabilir.'
          },
          {
            title: 'Rahat Açılıp Kapanan Geniş Kanatlar',
            desc: 'Panoramik görüntüyü engellemeyen 1,5 metre genişliğe kadar kanat yapısına izin vermektedir. Gelişmiş teker aksamı sayesinde bu geniş kanatlar rahatça açılıp kapanabilmektedir.'
          },
          {
            title: 'Eşikli – Eşiksiz Kullanım',
            desc: 'SlideMaster hem eşikli hem de eşiksiz olarak kullanılabilir. Restoranttan kafeye, kış bahçesinden balkona kadar tüm mekânlar için esnek çözümler sağlar.'
          }
        ]
      },
      {
        type: 'text_image',
        title: 'Özel Su Tahliye ve Damlalık Sistemi',
        content: 'Sisteme entegre edilen ray yataklı profil alt-içte su oluğu olarak görev yaparken, dış-üstte damlalık görevini üstlenir. Damlalık sayesinde en az su sisteme gelir, içeri girmesi muhtemel su da su tahliye profilinde toplanıp açılan tahliye delikleri aracılığıyla dışarı atılır.',
        image: '/images/isicamli-surme-cam-balkon/soft-touch.png',
        reverse: false
      },
      {
        type: 'text_image',
        title: 'Nasıl Çalışır?',
        content: 'SlideMaster, standart olarak 4 raylı olup her bir panel bir rayda hareket eder. En içteki paneli kapanma yönüne göre hareket ettirdiğinizde, her panel birbirine kenetlenip birbirini çekerek hareket eder. Çektiğiniz paneli son noktaya getirdiğinizde, kendiliğinden kilitlenerek kapalı hale gelir.',
        image: '/images/isicamli-surme-cam-balkon/Untitled-1.300px.png',
        reverse: true
      }
    ],
    bottomFeatures: [
      {
        img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__8_.jpg',
        title: 'Güvenlikli Kilit Seçenekleri',
        desc: 'Gagalı gömme kilitli, anahtarlı kancalı kilitli veya mantar başlı ispanyoletli — istediğiniz güvenlik opsiyonunu seçin.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__9_.jpg',
        title: '3 Farklı Cam Tipi',
        desc: '4+12+4 Isıcam, 8 mm ve 10 mm olmak üzere 3 farklı cam tipi ile istenen yalıtım düzeyine göre seçim yapılabilir.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/SM_325px.png',
        title: '1.5 m Geniş Kanatlar',
        desc: 'Panoramik görüntüyü engellemeyen 1,5 metre genişliğe kadar kanat yapısına izin veren gelişmiş teker aksamı.'
      }
    ],
    finalFeatures: [
      {
        img: '/images/isicamli-surme-cam-balkon/sss.300px.png',
        title: 'Paslanmaz Aksam',
        desc: 'Tüm rulman ve aksam takımları paslanmazlık garantisi altındadır.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__12_.jpg',
        title: 'Perde-Kepenk-Sineklik',
        desc: 'En dıştaki raya perde, sineklik veya kepenk bağlanabilir. Güneşi ve sinekleri kolayca kontrol edin.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__13_.jpg',
        title: 'Eşikli – Eşiksiz',
        desc: 'Restoranttan kafeye, kış bahçesinden balkona esnek çözümler sağlar.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi__14_.jpg',
        title: 'Soft-Touch Kir Tutmaz',
        desc: 'İsteğe bağlı ESPC boya ile toz ve leke tutmayan yüzey. Hem dekoratif hem kullanışlı.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/test-001.450px.png',
        title: 'Sonsuz Ray Sayısı',
        desc: '1+1 raydan istenilen sayıya kadar ray genişletme imkânı. Maksimum esneklik.'
      },
      {
        img: '/images/isicamli-surme-cam-balkon/SlideMaster_Surme_Cambalkon_Sistemi_11.jpg',
        title: '%100 İçten-Dıştan Temizlik',
        desc: 'Kanatlar birbirinden ayrılıp konumlandırılabilir. Hem içten hem dıştan tam erişim.'
      }
    ],
    darkFeatures: [
      { icon: 'fas fa-thermometer-half', title: '4 Kat Yalıtım', desc: 'Tek cama göre 4,3 kata varan ısı yalıtımı. Yazlar serin, kışlar sıcak.' },
      { icon: 'fas fa-expand-arrows-alt', title: 'Köşesiz Tam Açılım', desc: 'L ve U şeklindeki balkonda hiçbir köşe profili olmadan tamamen açık balkon.' },
      { icon: 'fas fa-shield-halved', title: 'Güvenlikli Kilit', desc: 'Gömme kilitli, anahtarlı veya ispanyoletli kilit seçenekleri mevcut.' },
      { icon: 'fas fa-award', title: 'AG Paslanmazlık Garantisi', desc: 'Tüm aksam paslanmazlık garantisi ile Albert Genau güvencesi altındadır.' }
    ],
    testimonials: [
      { text: 'Hem ısıcamlı hem de köşeleri açık yapısıyla harikaydı. Kesinlikle tavsiye ederim.', name: 'Canan V.', city: 'Kocaeli' },
      { text: 'SlideMaster ile balkonumuz gerçek bir yaşam alanına dönüştü.', name: 'Murat S.', city: 'Tekirdağ' },
      { text: 'Diğer sistemlerle kıyaslanmaz, kalite ve konfor bir arada.', name: 'Ferhat A.', city: 'Edirne' }
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
    safetyImg: '/images/products/airflex_safety.png',
    tagline: 'Rüzgar Kırıcı Sistem – Airflex, minimalist tasarımı ile panoramik manzaranızı korurken aynı zamanda ses, toz ve rüzgarı engeller. Konforunuzu artırır.\n\nAyarlanabilir köşe çözümleri, inovatif ve estetik yer sabitleme seçenekleri ile rüzgar kırıcı sistem, hotel, restaurant ve cafelerde, teraslarda ve ofis bölmelerinde rahatlıkla uygulanabilir. Sadece 47 mm profil genişliğine sahip airflex – rüzgar kırıcı ile tanışmanın tam zamanı.',
    features: [],
    sections: [
      {
        type: 'text_image',
        title: 'Farklı Yükseklik ve Cam Tiplerine Göre Farklı Uygulama Çeşitleri',
        content: 'Estetik görünümünün yanı sıra güvenliğe de önem veren AirFlex – Rüzgar Kırıcıyı, 5 farklı yükseklik ölçülerinde ve farklı cam tiplerine uygun olarak kullanabilirsiniz.',
        image: '/images/products/airflex_heights.png',
        reverse: false
      },
      {
        type: 'text_image',
        title: 'İster Sabit İster Taşınabilir Uygulama',
        content: 'Rüzgar Kırıcı - Airflex, mekânlarda yeni ve yaratıcı bölme çözümleri için size esneklik sağlar. İsterseniz farklı şekillerde zemine sabitleyerek uygulayacağınız sisteminizi, dilerseniz taşınabilir olarak da kullanabilirsiniz.',
        image: '/images/products/airflex_portable.png',
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
        image: '/images/products/airflex_profile.png',
        reverse: false
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
      { slug: 'isicamli-surme-cam-balkon', title: 'Isıcamlı Sürme Cam Balkon', desc: 'Albert Genau kalitesini uygun fiyatla balkonunuza taşıyın.', image: '/images/products/surme-isicamli-balkon.png', badge: 'ISI YALITIMLI' },
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
    safetyImg: '/images/products/kis_bahcesi_safety_hq.png',
    cleaningImg: '/images/products/kis_bahcesi_cleaning_hq.png',
    cleaningSteps: ['Dış cephe camları özel aparatlarla yıkanabilir.', 'İç yüzeyleri standart temizleyicilerle silebilirsiniz.', 'Çelik kısımları nemli bezle düzenli olarak koruyun.'],
    darkFeatures: [
      { icon: 'fas fa-shield-alt', title: 'Yüksek Statik Dayanım', desc: 'Her türlü iklim koşulluna dayanacak mühendislik hesaplamaları.' },
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
    heroImg: '/images/products/dusakabin_hero_premium.png',
    tagline: 'Dar alanlarda bile mekanı geniş gösteren, su sızıntısını engelleyen ve kireç tutmayan cam yüzey teknolojisine sahip duşakabin çözümleri.',
    features: [
      { img: '/images/products/dusakabin_clean.png', title: 'Su İtici Kaplama', desc: 'Cam yüzeyinde kireç ve leke tutunmasını engelleyen nano teknoloji kaplama.' },
      { img: '/images/products/dusakabin_safe.png', title: 'Sızdırmazlık Contaları', desc: 'Su kaçaklarını %100 engelleyen özel tasarlanmış manyetik ve şeffaf contalar.' },
      { img: '/images/products/dusakabin_wheels.png', title: 'Kusursuz Kayar Sistem', desc: 'Cam kapıların sessiz ve pürüzsüz şekilde kaymasını sağlayan paslanmaz tekerlek mekanizması.' }
    ],
    safetyImg: '/images/products/dusakabin_safety_premium.png',
    darkFeatures: [
      { icon: 'fas fa-shield-halved', title: 'Temperli Güvenlik Camı', desc: 'Olası kazalara karşı kırılmalarda dağılmayan özel 8mm cam.' },
      { icon: 'fas fa-tint-slash', title: 'Paslanmaz Aksesuar', desc: 'Su ve neme dayanıklı paslanmaz menteşe ve kulp sistemleri.' },
      { icon: 'fas fa-arrows-alt', title: 'Özel Ölçü Üretim', desc: 'Banyonuzun mimarisine ve genişliğine göre milimetrik hassasiyetle özel olarak üretilir.' }
    ],
    safetyTitle: 'Aileniz İçin Güvenli Duş Deneyimi',
    safetyDesc: '8mm kalınlığında özel temperli camlar sayesinde darbelere karşı ekstra dirençlidir. Kırılma anında küçük parçalara ayrılarak kesici özellik göstermez.',
    testimonials: []
  },
  'cam-kapi': {
    badge: 'Hareketli Cam Sistemleri',
    heroTitle: 'Cam Kapı Sistemleri',
    heroSub: 'Eşiksiz Zeminler, Kesintisiz Geçişler.',
    heroImg: '/images/products/cam_kapı_banner.png',
    tagline: 'Üstten askılı özel taşıyıcı profili sayesinde mekanlarınızı eşiksiz ve esnek bir şekilde bölerek panoramik manzaranın tadını çıkarın.',
    features: [
      { img: '/images/cam-kapi/cam-kapi-dikey-01.png', title: 'Tek Yönlü Kapılar', desc: 'Tek yöne açılabilen özel mekanizması sayesinde dar alanlarda bile pratik ve kullanışlı bir deneyim sunar.' },
      { img: '/images/cam-kapi/cift-cam-kapi.png', title: 'Çift Yönlü Kapılar', desc: 'Her iki yöne de açılabilen esnek yapısıyla insan trafiğinin yoğun olduğu geçiş noktalarında yüksek konfor sağlar.' },
      { img: '/images/cam-kapi/guvenlik-nasil-temizlenir.png', title: 'Güvenlik (Temperli Cam)', desc: 'Kırılmaya ve darbelere karşı ekstra dirençli özel temperli cam yapısıyla mekanlarınızda tam güvenlik sağlar.' }
    ],
    safetyImg: '/images/cam-kapi/cam-kapi-yatay-01.png',
    cleaningImg: '/images/cam-kapi/guvenlik-nasil-temizlenir.png',
    cleaningSteps: ['Eşiksiz zemin sayesinde alt ray temizliği gerektirmez.', 'Cam yüzeyler standart temizleyicilerle silinebilir.'],
    darkFeatures: [
      { icon: 'fas fa-lock', title: 'Pim Güvencesi', desc: 'Cam paneller yapıştırıcıya ek olarak, Eksantrik Cam Pimleri ile mekanik olarak kilitlenir.' },
      { icon: 'fas fa-wind', title: 'Dört Mevsim Koruma', desc: 'Yan EPDM contalar ve alt-üst fırçalarla rüzgar, toz ve gürültü geçişi minimize edilir.' },
      { icon: 'fas fa-eye-slash', title: 'Estetik Park Alanı', desc: 'Sistem açıkken cam paneller minimum yer kaplar ve mekanın bütünlüğünü bozmaz.' }
    ],
    safetyTitle: 'Geniş Kullanım Alanları',
    safetyDesc: 'Cam Kapı Sistemlerinin Avantajları arasında gösterildiği üzere ofisler, klinikler, mağazalar, duş alanları ve ev içi mekanlarda (mutfak/salon) yaygın olarak tercih edilir.',
    cleaningDesc: 'Pürüzsüz yapısı sayesinde kir tutmaz, lekelere karşı dirençlidir ve kolayca silinerek hijyenik tutulabilir',
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

export default function ProductClient({ slug }: { slug: string }) {
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
            {product.heroSub && <p className={styles.heroSub}>{product.heroSub}</p>}
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
          {product.tagline && (
            <section>
              <div className={styles.tagline}>
                <p className={styles.taglineText}>
                  {product.tagline.split('\n').map((line: string, i: number) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </div>
            </section>
          )}

          {product.textFeatures && (
            <section className={styles.textFeatures}>
              <div className={styles.textFeaturesGrid}>
                <div className={styles.textFeaturesLeft}>
                  <div className={styles.textFeaturesLeftContent}>
                    <h2 className={styles.textFeaturesMainTitle}>{product.textFeatures.title}</h2>
                    <p className={styles.textFeaturesMainDesc}>{product.textFeatures.desc}</p>
                  </div>
                  {product.textFeatures.img && (
                    <div className={styles.textFeaturesImgWrap}>
                      <img src={product.textFeatures.img} alt={product.textFeatures.title} />
                    </div>
                  )}
                </div>
                <div className={styles.textFeaturesRight}>
                  {product.textFeatures.items.map((item: any, i: number) => (
                    <div key={i} className={styles.textFeatureItem}>
                      <h3 className={styles.textFeatureTitle}>{item.title}</h3>
                      <p className={styles.textFeatureDesc}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {product.sections?.map((section: any, idx: number) => {
            if (section.type === 'text_list_with_image') {
              return (
                <section key={idx} className={styles.textFeatures}>
                  <div className={styles.textFeaturesGrid}>
                    <div className={styles.textListLeft}>
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
                      <p className={styles.sectionText}>{section.content}</p>
                      <div className={styles.textListImgWrap}>
                        <img src={section.image} alt={section.title} />
                      </div>
                    </div>
                    <div className={styles.textFeaturesRight}>
                      {section.features?.map((feat: any, i: number) => (
                        <div key={i} className={styles.textFeatureItem}>
                          <h3 className={styles.textFeatureTitle}>{feat.title}</h3>
                          <p className={styles.textFeatureDesc}>{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }
            if (section.type === 'text_image') {
              return (
                <section key={idx} className={`${styles.textImageSection} ${section.reverse ? styles.reverse : ''}`}>
                  <div className={styles.textImageGrid} style={{ backgroundColor: section.bg || '#fff' }}>
                    <div className={styles.textImageContent}>
                      {section.badge && <span className={styles.sectionBadge}>{section.badge}</span>}
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
                      <p className={styles.sectionText}>{section.content}</p>
                    </div>
                    <div className={styles.textImageImg}>
                      <img src={section.image} alt={section.title} style={{ objectFit: section.imageFit || 'contain' }} />
                    </div>
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
            if (section.type === 'text_gallery') {
              return (
                <section key={idx} className={styles.textGallerySection}>
                  <div className={styles.textGalleryContainer}>
                    <h2 className={styles.textGalleryTitle}>{section.title}</h2>
                    <p className={styles.textGalleryContent}>{section.content}</p>
                    <div className={styles.textGalleryImages}>
                      {section.images?.map((img: string, i: number) => (
                        <div key={i} className={styles.textGalleryImgWrap}>
                          <img src={img} alt={`${section.title} ${i}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }
            if (section.type === 'text_features') {
              return (
                <section key={idx} className={styles.textFeatures}>
                  <div className={styles.textFeaturesGrid}>
                    <div className={styles.textFeaturesLeft}>
                      {section.features?.map((feat: any, i: number) => (
                        <div key={i} className={styles.textFeatureItem}>
                          <h3 className={styles.textFeatureTitle}>{feat.title}</h3>
                          <p className={styles.textFeatureDesc}>{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.textFeaturesImgWrap}>
                      <img src={section.image} alt="Özellikler" />
                    </div>
                  </div>
                </section>
              );
            }
            return null;
          })}




          
          {product.features && product.features.length > 0 && (
            <section className={styles.features}>
              <div className={styles.featuresGrid}>
                {product.features.map((f: any, i: number) => (
                  <div key={i} className={f.isWide ? styles.featureCardWide : styles.featureCard}>
                    <div className={f.isWide ? styles.featureCardWideImg : styles.featureCardImg}>
                      <Image src={f.img} alt={f.title} fill />
                    </div>
                    <div className={f.isWide ? styles.featureCardWideBody : styles.featureCardBody}>
                      <h3 className={styles.featureCardTitle}>{f.title}</h3>
                      <p className={styles.featureCardDesc}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.safetyImg && (
            <div className={styles.fullBanner}>
              <Image src={product.safetyImg} alt="Güvenlik" fill className={styles.fullBannerImg} />
              <div className={styles.fullBannerOverlay}>
                <h2 className={styles.fullBannerTitle}>{product.safetyTitle || 'Güvenlik Önceliğimiz!'}</h2>
                <p className={styles.fullBannerDesc}>
                  {product.safetyDesc || 'Paneller istenilen yükseklikte konumlanarak hem çocuklar hem de evcil hayvanlar için güvenli bir ortam oluşturur.'}
                </p>
              </div>
            </div>
          )}

          {product.cleaningSteps && product.cleaningSteps.length > 0 && (
            <section className={styles.cleaning}>
              <div className={styles.cleaningGrid}>
                <div className={styles.cleaningImgWrap}>
                  {product.cleaningImg?.endsWith('.mp4') ? (
                    <video src={product.cleaningImg} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={product.cleaningImg} alt="Temizlik" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div className={styles.cleaningContent}>
                  <h2>{product.cleaningTitle || 'Nasıl Temizlenir?'}</h2>
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

          <section className={`${styles.darkFeatures} ${(!product.darkFeatures || product.darkFeatures.length === 0) ? styles.darkFeaturesEmpty : ''}`}>
            <h2 className={`${styles.darkFeaturesTitle} ${(!product.darkFeatures || product.darkFeatures.length === 0) ? styles.darkFeaturesTitleEmpty : ''}`}>Teknik Üstünlükler</h2>
            {product.darkFeatures && product.darkFeatures.length > 0 && (
              <div className={styles.darkFeaturesGrid}>
                {product.darkFeatures.map((f: any, i: number) => (
                  <div key={i} className={styles.darkCard}>
                    <div className={styles.darkIcon}><i className={f.icon} /></div>
                    <h3 className={styles.darkCardTitle}>{f.title}</h3>
                    <p className={styles.darkCardDesc}>{f.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {product.bottomFeatures && product.bottomFeatures.length > 0 && (
            <section className={`${styles.features} ${product.finalFeatures && product.finalFeatures.length > 0 ? styles.featuresWithNext : ''}`}>
              <div className={styles.featuresGrid}>
                {product.bottomFeatures.map((f: any, i: number) => (
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

          {/* Extra Sections (text_image_full, text_image_dark) */}
          {product.extraSections?.map((es: any, idx: number) => {
            if (es.type === 'text_image_full') {
              return (
                <section key={`extra-${idx}`} className={styles.extraFullSection}>
                  <div className={styles.extraFullGrid}>
                    <div className={styles.extraFullImg}>
                      <img src={es.image} alt={es.title} />
                    </div>
                    <div className={styles.extraFullContent}>
                      <h2 className={styles.extraFullTitle}>{es.title}</h2>
                      <p className={styles.extraFullText}>{es.content}</p>
                    </div>
                  </div>
                </section>
              );
            }
            if (es.type === 'text_image_dark') {
              return (
                <div key={`extra-${idx}`}>
                  {es.topImage && (
                    <div className={styles.extraTopImageWrap}>
                      <img src={es.topImage} alt={es.title} />
                    </div>
                  )}
                  <section className={styles.extraDarkSection}>
                    <div className={styles.extraDarkGrid}>
                      <div className={styles.extraDarkContent}>
                        <h2 className={styles.extraDarkTitle}>{es.title}</h2>
                        <p className={styles.extraDarkText}>{es.content}</p>
                      </div>
                      <div className={styles.extraDarkImg}>
                        <img src={es.image} alt={es.title} />
                      </div>
                    </div>
                  </section>
                </div>
              );
            }
            return null;
          })}

          {/* Final Features Grid */}
          {product.finalFeatures && product.finalFeatures.length > 0 && (
            <section className={styles.finalFeaturesSection}>
              <div className={styles.finalFeaturesGrid}>
                {product.finalFeatures.map((f: any, i: number) => (
                  <div key={i} className={styles.finalFeatureCard}>
                    <div className={styles.finalFeatureImg}>
                      <Image src={f.img} alt={f.title} fill />
                    </div>
                    <div className={styles.finalFeatureBody}>
                      <h3 className={styles.finalFeatureTitle}>{f.title}</h3>
                      <p className={styles.finalFeatureDesc}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

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
