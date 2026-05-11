import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Appearance } from '@/models/Appearance';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  await connectDB();
  let appearance = await Appearance.findOne();
  if (!appearance) {
    appearance = await Appearance.create({});
  }
  return NextResponse.json(appearance);
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  await connectDB();
  const data = await req.json();
  const appearance = await Appearance.findOneAndUpdate({}, data, { new: true, upsert: true });
  return NextResponse.json(appearance);
}
