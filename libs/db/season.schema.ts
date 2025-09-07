import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Season extends Document {
  league: Types.ObjectId;
  name: string;
  startDate?: Date;
  endDate?: Date;
}

const SeasonSchema = new Schema<Season>({
  league: { type: Schema.Types.ObjectId, ref: 'League' },
  name: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
});

export default mongoose.model<Season>('Season', SeasonSchema);
