import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuChild {
  label: string;
  href: string;
  order: number;
  isExternal: boolean;
}

export interface IMenu extends Document {
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
  isExternal: boolean;
  children: IMenuChild[];
}

const MenuChildSchema = new Schema<IMenuChild>({
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  isExternal: { type: Boolean, default: false },
});

const MenuSchema = new Schema<IMenu>({
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  isExternal: { type: Boolean, default: false },
  children: [MenuChildSchema],
}, { timestamps: true });

export const Menu = mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema);
