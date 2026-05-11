import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Settings } from '@/models/Settings';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  await connectDB();
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  await connectDB();
  const data = await req.json();
  const settings = await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
  return NextResponse.json(settings);
}
