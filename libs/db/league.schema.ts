import mongoose, { Schema, Document, Types } from 'mongoose';

export interface League extends Document {
  name: string;
  nation?: Types.ObjectId;
  logoUrl?: string;
  description?: string;
}

const LeagueSchema = new Schema<League>({
  name: { type: String, required: true },
  nation: { type: Schema.Types.ObjectId, ref: 'Nation' },
  logoUrl: { type: String },
  description: { type: String },
});

export default mongoose.model<League>('League', LeagueSchema);
