import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Season extends Document {
  league?: Types.ObjectId;
  name: string;
  startDate?: Date;
  endDate?: Date;
  rules?: Types.ObjectId;
  teams?: Types.ObjectId[];
}

const SeasonSchema = new Schema<Season>({
  league: { type: Schema.Types.ObjectId, ref: 'League' },
  name: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  rules: { type: Schema.Types.ObjectId, ref: 'Rules' },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

export default mongoose.model<Season>('Season', SeasonSchema);
