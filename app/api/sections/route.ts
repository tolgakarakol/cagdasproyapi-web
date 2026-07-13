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
    const headerQuery: any = { pageSlug: 'galeri' };
    if (!isAdmin) headerQuery.isVisible = true;
    const headerSections = await Section.find(headerQuery);

    const productQuery: any = { type: 'product_detail' };
    if (!isAdmin) productQuery.isVisible = true;
    const productSections = await Section.find(productQuery).sort({ order: 1 });

    return NextResponse.json([...headerSections, ...productSections]);
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
    if (obj.trim() === originalText) {
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

  const section = await Section.findById(sectionId);
  if (!section) return NextResponse.json({ error: 'Bölüm bulunamadı' }, { status: 404 });

  let updatedContent = section.content;
  if (originalSrc && newSrc) {
    updatedContent = updateNestedStringValue(section.content, originalSrc, newSrc);
  } else if (originalText && newText) {
    updatedContent = updateNestedStringValue(section.content, originalText, newText);
  }

  section.content = updatedContent;
  // Mongoose mixed tipini güncellemek için markModified kullanıyoruz
  section.markModified('content');
  await section.save();

  return NextResponse.json(section);
}

export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const { id } = await req.json();
  await Section.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
