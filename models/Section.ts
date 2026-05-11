import mongoose, { Schema, Document } from 'mongoose';

// Section content types vary by section type
export interface ISection extends Document {
  pageSlug: string;       // 'home' | custom page slug
  type: string;           // 'hero_slider' | 'products_grid' | 'text_block' | etc.
  title: string;          // Admin display name
  order: number;
  isVisible: boolean;
  content: Record<string, any>;  // Flexible JSON content
}

const SectionSchema = new Schema<ISection>({
  pageSlug: { type: String, required: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  content: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const Section = mongoose.models.Section || mongoose.model<ISection>('Section', SectionSchema);
