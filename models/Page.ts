import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  title: string;
  slug: string;
  isVisible: boolean;
  showInMenu: boolean;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  order: number;
}

const PageSchema = new Schema<IPage>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  isVisible: { type: Boolean, default: true },
  showInMenu: { type: Boolean, default: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Page = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);
