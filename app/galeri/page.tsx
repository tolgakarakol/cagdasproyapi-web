import GalleryClient from './GalleryClient';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import { PRODUCT_DATA } from '@/lib/productData';

const MENU_CATEGORIES = [
  { id: 'giyotin-tam-balkon', title: 'Giyotin Tam Balkon' },
  { id: 'tiara-08-10', title: 'Katlanır - Sürme Cam Balkon' },
  { id: 'bioklimatik-pergola', title: 'Bioklimatik Pergola' },
  { id: 'ruzgar-kirici-sistem', title: 'Rüzgar Kırıcı Sistem' },
  { id: 'kis-bahcesi', title: 'Çelik Konstrüksiyon & Kış Bahçesi' },
  { id: 'dusakabin', title: 'Duşakabin Sistemleri' },
  { id: 'cam-kapi', title: 'Cam Kapı Sistemleri' },
  { id: 'kompozit-cephe-sistemleri', title: 'Kompozit Cephe Sistemleri' },
  { id: 'pvc-cam-sistemleri', title: 'PVC Cam Sistemleri' },
  { id: 'kupeste-modelleri', title: 'Küpeşte Modelleri' },
];

async function getGalleryData() {
  try {
    await connectDB();
    // Veritabanındaki tüm ürün detay bölümlerini çek
    const dbSections = await Section.find({ type: 'product_detail' }).lean();
    
    const dbProductMap: Record<string, any> = {};
    dbSections.forEach((s: any) => {
      dbProductMap[s.pageSlug] = s.content;
    });

    // Varsayılan statik PRODUCT_DATA ile veritabanından gelenleri birleştir
    const mergedProductData = { ...PRODUCT_DATA };
    Object.keys(dbProductMap).forEach((slug) => {
      mergedProductData[slug] = dbProductMap[slug];
    });

    // Galeri görsellerini dinamik olarak derle
    const galleryData = MENU_CATEGORIES.map((category) => {
      const product = mergedProductData[category.id];
      const imageSet = new Set<string>();

      if (product) {
        if (product.heroImg) imageSet.add(product.heroImg);
        if (product.safetyImg) imageSet.add(product.safetyImg);
        if (product.cleaningImg) imageSet.add(product.cleaningImg);
        if (product.features) {
          product.features.forEach((f: any) => {
            if (f.img) imageSet.add(f.img);
          });
        }
        if (product.sections) {
          product.sections.forEach((s: any) => {
            if (s.image) imageSet.add(s.image);
            if (s.images) {
              s.images.forEach((img: string) => {
                if (img) imageSet.add(img);
              });
            }
          });
        }
      }

      // Tiara Twinmax görsellerini de katlanır balkona ekleyelim
      if (category.id === 'tiara-08-10') {
        const twinmax = mergedProductData['tiara-twinmax'];
        if (twinmax) {
          if (twinmax.heroImg) imageSet.add(twinmax.heroImg);
          if (twinmax.safetyImg) imageSet.add(twinmax.safetyImg);
          if (twinmax.cleaningImg) imageSet.add(twinmax.cleaningImg);
          if (twinmax.features) {
            twinmax.features.forEach((f: any) => {
              if (f.img) imageSet.add(f.img);
            });
          }
        }
      }

      return {
        title: category.title,
        images: Array.from(imageSet)
          .filter(Boolean)
          .map((src) => ({
            src: src as string,
            alt: `${category.title} Uygulaması`,
          })),
      };
    }).filter((section) => section.images.length > 0);

    return galleryData;
  } catch (err) {
    console.error('Error fetching gallery data:', err);
    return [];
  }
}

async function getPageHeader() {
  try {
    await connectDB();
    let header = await Section.findOne({ pageSlug: 'galeri', type: 'page_header' }).lean();
    if (!header) {
      header = await Section.create({
        pageSlug: 'galeri',
        type: 'page_header',
        order: 0,
        isVisible: true,
        title: 'Galeri Sayfa Başlığı',
        content: { title: 'Galeri', subtitle: 'Çağdaş Pro Yapı kalitesiyle hayata geçirilen premium projelerimiz' }
      });
    }
    return JSON.parse(JSON.stringify(header));
  } catch (err) {
    console.error('Error fetching gallery header:', err);
    return null;
  }
}

export default async function GalleryPage() {
  const galleryData = await getGalleryData();
  const headerSection = await getPageHeader();

  return (
    <GalleryClient galleryData={galleryData} headerSection={headerSection} />
  );
}
