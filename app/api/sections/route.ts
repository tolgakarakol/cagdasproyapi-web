import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import { verifyToken } from '@/lib/auth';
import { PRODUCT_DATA } from '@/lib/productData';

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const pageSlug = searchParams.get('pageSlug') || 'home';
  const isAdmin = !!requireAdmin(req);

  if (pageSlug === 'galeri') {
    // Temizlik: Galeri slug'ına hatalı atanmış product_detail kayıtlarını sil
    await Section.deleteMany({ pageSlug: 'galeri', type: 'product_detail' });

    const galeriQuery: any = { pageSlug: 'galeri' };
    if (!isAdmin) galeriQuery.isVisible = true;
    let galeriSections = await Section.find(galeriQuery).sort({ order: 1 });

    // Galeri grupları hiç yoksa ürün datasından oluştur (ilk kurulum)
    const hasGalleryGroups = galeriSections.some((s: any) => s.type === 'gallery_group');
    if (!hasGalleryGroups) {
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

      for (let i = 0; i < MENU_CATEGORIES.length; i++) {
        const category = MENU_CATEGORIES[i];
        const product = PRODUCT_DATA[category.id];
        const imageSet = new Set<string>();
        if (product) {
          if (product.heroImg) imageSet.add(product.heroImg);
          if (product.safetyImg) imageSet.add(product.safetyImg);
          if (product.cleaningImg) imageSet.add(product.cleaningImg);
          if (product.features) product.features.forEach((f: any) => { if (f.img) imageSet.add(f.img); });
          if (product.sections) {
            product.sections.forEach((s: any) => {
              if (s.image) imageSet.add(s.image);
              if (s.images) s.images.forEach((img: string) => { if (img) imageSet.add(img); });
            });
          }
        }
        const groupImages = Array.from(imageSet).filter((img): img is string => typeof img === 'string' && img.length > 0);
        await Section.create({
          pageSlug: 'galeri',
          type: 'gallery_group',
          title: category.title,
          order: i + 1,
          isVisible: true,
          content: { title: category.title, images: groupImages.length > 0 ? groupImages : [] }
        });
      }

      // Tazelenen listeyi çek
      galeriSections = await Section.find(galeriQuery).sort({ order: 1 });
    }

    return NextResponse.json(galeriSections);
  }


  const query: any = { pageSlug };
  if (!isAdmin) query.isVisible = true;

  const sections = await Section.find(query).sort({ order: 1 });

  // Eğer bu bilinen bir ürün slugı ise ve veritabanında bölümü yoksa, varsayılan verilerle oluştur.
  if (sections.length === 0 && pageSlug in PRODUCT_DATA) {
    const defaultSection = await Section.create({
      pageSlug,
      type: 'product_detail',
      title: `${pageSlug} Detay`,
      order: 0,
      isVisible: true,
      content: PRODUCT_DATA[pageSlug]
    });
    return NextResponse.json([defaultSection]);
  }

  return NextResponse.json(sections);
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const section = await Section.create(data);
  return NextResponse.json(section);
}

export async function PUT(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const data = await req.json();

  if (Array.isArray(data)) {
    // Bulk update (reorder)
    await Promise.all(data.map((item: any) => Section.findByIdAndUpdate(item._id, { order: item.order })));
    return NextResponse.json({ success: true });
  }

  const section = await Section.findByIdAndUpdate(data._id, data, { new: true });
  return NextResponse.json(section);
}

const updateNestedStringValue = (obj: any, originalText: string, newText: string): any => {
  if (typeof obj === 'string') {
    const isMatch = obj.trim() === originalText.trim();
    console.log(`[COMPARE] DB value: "${obj.trim()}" | Clicked value: "${originalText.trim()}" | Match: ${isMatch}`);
    if (isMatch) {
      return newText;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => updateNestedStringValue(item, originalText, newText));
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = updateNestedStringValue(obj[key], originalText, newText);
    }
    return newObj;
  }
  return obj;
};

export async function PATCH(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const { sectionId, originalSrc, newSrc, originalText, newText } = await req.json();

  console.log(`[PATCH API] Request received for sectionId: ${sectionId}`);
  if (originalSrc) {
    console.log(`[PATCH API] Attempting image update. originalSrc: "${originalSrc}"`);
  }

  const section = await Section.findById(sectionId);
  if (!section) {
    console.log(`[PATCH API] Section not found in DB: ${sectionId}`);
    return NextResponse.json({ error: 'Bölüm bulunamadı' }, { status: 404 });
  }

  let updatedContent = section.content;
  if (originalSrc && newSrc) {
    updatedContent = updateNestedStringValue(section.content, originalSrc, newSrc);
  } else if (originalText && newText) {
    updatedContent = updateNestedStringValue(section.content, originalText, newText);
  }

  section.content = updatedContent;
  section.markModified('content');
  await section.save();

  console.log(`[PATCH API] Save complete for section: ${sectionId}`);
  return NextResponse.json(section);
}

export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const { id } = await req.json();
  await Section.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
