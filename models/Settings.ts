import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  email: string;
  workingHours: string;
  mapLat: number;
  mapLng: number;
  metaTitle: string;
  metaDescription: string;
  googleVerification: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>({
  siteName: { type: String, default: 'Çağdaş Pro Yapı' },
  siteDescription: { type: String, default: 'Albert Genau Yetkili Bayisi' },
  phone: { type: String, default: '0507 916 57 07' },
  whatsapp: { type: String, default: '905079165707' },
  instagram: { type: String, default: 'albertgenau_cagdaspro' },
  address: { type: String, default: 'Piri Mehmet Paşa Mahallesi, Burhan Soyaslan Caddesi 20/A, Silivri/İstanbul' },
  email: { type: String, default: '' },
  workingHours: { type: String, default: 'Pzt-Cmt 09:00–19:00' },
  mapLat: { type: Number, default: 41.0770615 },
  mapLng: { type: Number, default: 28.2438394 },
  metaTitle: { type: String, default: 'Çağdaş Pro Yapı – Albert Genau Yetkili Bayisi | Silivri İstanbul' },
  metaDescription: { type: String, default: 'Cam balkon, bioklimatik pergola, kış bahçesi ve cam sistemlerinde Albert Genau yetkili bayisi. 15 yıllık deneyim, Silivri/İstanbul merkezli tüm Türkiye hizmet.' },
  googleVerification: { type: String, default: '' },
}, { timestamps: true });

export const Settings = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
