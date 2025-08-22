import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Team extends Document {
  name: string;
  shortName?: string;
  logoUrl?: string;
  nation?: Types.ObjectId;
  founded?: number;
  city?: string;
  stadium?: string;
  colors?: string[];
}

const TeamSchema = new Schema<Team>({
  name: { type: String, required: true },
  shortName: { type: String },
  logoUrl: { type: String },
  nation: { type: Schema.Types.ObjectId, ref: 'Nation' },
  founded: { type: Number },
  city: { type: String },
  stadium: { type: String },
  colors: [{ type: String }],
});

export default mongoose.model<Team>('Team', TeamSchema);
