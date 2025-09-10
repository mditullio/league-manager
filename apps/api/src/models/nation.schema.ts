import mongoose, { Schema, Document } from 'mongoose';

export interface Nation extends Document {
  name: string;
  code?: string;
  flagUrl?: string;
  flagEmoji?: string;
}

const NationSchema = new Schema<Nation>({
  name: { type: String, required: true },
  code: { type: String },
  flagUrl: { type: String },
  flagEmoji: { type: String },
});

export default mongoose.model<Nation>('Nation', NationSchema);
