import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Rules extends Document {
  pointsForWin?: number;
  pointsForDraw?: number;
  pointsForLoss?: number;
  tieBreakerOrder?: string[];
  maxTeams?: number;
  otherRules?: Record<string, any>;
}

const RulesSchema = new Schema<Rules>({
  pointsForWin: { type: Number, default: 3 },
  pointsForDraw: { type: Number, default: 1 },
  pointsForLoss: { type: Number, default: 0 },
  tieBreakerOrder: [{ type: String }],
  maxTeams: { type: Number },
  otherRules: { type: Schema.Types.Mixed },
});

export default mongoose.model<Rules>('Rules', RulesSchema);
