import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import { verifyToken } from '@/lib/auth';

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const pageSlug = searchParams.get('pageSlug') || 'home';
  const isAdmin = !!requireAdmin(req);

  const query: any = { pageSlug };
  if (!isAdmin) query.isVisible = true;

  const sections = await Section.find(query).sort({ order: 1 });
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

export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const { id } = await req.json();
  await Section.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
