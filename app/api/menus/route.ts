import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Menu } from '@/models/Menu';
import { verifyToken } from '@/lib/auth';

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET() {
  await connectDB();
  const menus = await Menu.find({ isVisible: true }).sort({ order: 1 });
  return NextResponse.json(menus);
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const menu = await Menu.create(data);
  return NextResponse.json(menu);
}

export async function PUT(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const data = await req.json(); // Array of menu items with order
  await Promise.all(
    data.map((item: any) => Menu.findByIdAndUpdate(item._id, item))
  );
  const menus = await Menu.find().sort({ order: 1 });
  return NextResponse.json(menus);
}

export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  await connectDB();
  const { id } = await req.json();
  await Menu.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
