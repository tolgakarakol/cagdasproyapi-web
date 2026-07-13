import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Page } from '@/models/Page';
import { verifyToken } from '@/lib/auth';

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  await connectDB();
  // 'super' slug'lı test/gereksiz kayıtları otomatik temizle
  await Page.deleteMany({ slug: 'super' });
  const isAdmin = !!requireAdmin(req);
  const query = isAdmin ? {} : { isVisible: true };
  const pages = await Page.find(query).sort({ order: 1 });
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const page = await Page.create(data);
  return NextResponse.json(page);
}

export async function PUT(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const page = await Page.findByIdAndUpdate(data._id, data, { new: true });
  return NextResponse.json(page);
}

export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const { id } = await req.json();
  await Page.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
