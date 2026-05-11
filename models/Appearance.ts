import mongoose, { Schema, Document } from 'mongoose';

export interface IAppearance extends Document {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  logoUrl: string;
  faviconUrl: string;
  updatedAt: Date;
}

const AppearanceSchema = new Schema<IAppearance>({
  primaryColor: { type: String, default: '#1a1a2e' },
  accentColor: { type: String, default: '#c8960c' },
  bgColor: { type: String, default: '#0f0f1a' },
  textColor: { type: String, default: '#f0f0f0' },
  headingFont: { type: String, default: 'Playfair Display' },
  bodyFont: { type: String, default: 'Inter' },
  logoUrl: { type: String, default: '/images/cagdas_pro_yapi_logo.png' },
  faviconUrl: { type: String, default: '/favicon.ico' },
}, { timestamps: true });

export const Appearance = mongoose.models.Appearance || mongoose.model<IAppearance>('Appearance', AppearanceSchema);
