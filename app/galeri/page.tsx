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
    
    // Temizlik: Yanlışlıkla galeri slug'ına atanmış product_detail kayıtlarını temizle
    await Section.deleteMany({ pageSlug: 'galeri', type: 'product_detail' });

    // Mevcut galeri gruplarını çek
    let galleryGroups = await Section.find({ pageSlug: 'galeri', type: 'gallery_group' })
      .sort({ order: 1 })
      .lean();

    // Veritabanı boşsa (ilk kurulum), varsayılan grupları ürün datasından tohumla
    if (!galleryGroups || galleryGroups.length === 0) {
      const newGroups = [];
      for (let i = 0; i < MENU_CATEGORIES.length; i++) {
        const category = MENU_CATEGORIES[i];
        
        // Ürün datasından başlangıç resimlerini topla
        const product = PRODUCT_DATA[category.id];
        const imageSet = new Set<string>();
        if (product) {
          if (product.heroImg) imageSet.add(product.heroImg);
          if (product.safetyImg) imageSet.add(product.safetyImg);
          if (product.cleaningImg) imageSet.add(product.cleaningImg);
          if (product.features) {
            product.features.forEach((f: any) => { if (f.img) imageSet.add(f.img); });
          }
          if (product.sections) {
            product.sections.forEach((s: any) => {
              if (s.image) imageSet.add(s.image);
              if (s.images) s.images.forEach((img: string) => { if (img) imageSet.add(img); });
            });
          }
        }
        
        const groupImages = Array.from(imageSet).filter(Boolean);
        
        const newGroup = await Section.create({
          pageSlug: 'galeri',
          type: 'gallery_group',
          title: category.title,
          order: i,
          isVisible: true,
          content: {
            title: category.title,
            images: groupImages.length > 0 ? groupImages : ['/placeholder.jpg']
          }
        });
        
        // Mongoose document'ı düz objeye çeviriyoruz (.lean() muadili)
        newGroups.push(JSON.parse(JSON.stringify(newGroup)));
      }
      galleryGroups = newGroups;
    }

    // İstemciye uygun formata çevir
    const formattedData = galleryGroups.map(group => {
      const content = group.content || {};
      const imagesList = content.images || [];
      return {
        sectionId: group._id.toString(),
        title: content.title || group.title,
        images: imagesList.filter(Boolean).map((src: string) => ({
          src,
          alt: `${content.title || group.title} Görseli`
        }))
      };
    }).filter(g => g.images.length > 0);

    return formattedData;
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
