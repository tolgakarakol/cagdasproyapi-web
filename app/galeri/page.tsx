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
    
    // Her kategori için veritabanında ürün detay kaydını sorgula, yoksa otomatik tohumla.
    const galleryData = await Promise.all(
      MENU_CATEGORIES.map(async (category) => {
        let productSection = await Section.findOne({ pageSlug: category.id, type: 'product_detail' });
        if (!productSection) {
          productSection = await Section.create({
            pageSlug: category.id,
            type: 'product_detail',
            title: `${category.id} Detay`,
            order: 0,
            isVisible: true,
            content: PRODUCT_DATA[category.id] || {},
          });
        }

        const product = productSection.content;
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
          let twinmaxSection = await Section.findOne({ pageSlug: 'tiara-twinmax', type: 'product_detail' });
          if (!twinmaxSection) {
            twinmaxSection = await Section.create({
              pageSlug: 'tiara-twinmax',
              type: 'product_detail',
              title: 'tiara-twinmax Detay',
              order: 0,
              isVisible: true,
              content: PRODUCT_DATA['tiara-twinmax'] || {},
            });
          }
          const twinmax = twinmaxSection.content;
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
          sectionId: productSection._id.toString(),
          title: category.title,
          images: Array.from(imageSet)
            .filter(Boolean)
            .map((src) => ({
              src: src as string,
              alt: `${category.title} Uygulaması`,
            })),
        };
      })
    );

    return galleryData.filter((section) => section.images.length > 0);
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
