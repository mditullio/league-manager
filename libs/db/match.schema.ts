import mongoose, { Schema, Document, Types } from 'mongoose';

export enum MatchStatus {
    Scheduled = 'scheduled',
    Completed = 'completed',
    Postponed = 'postponed',
    Cancelled = 'cancelled',
}

export interface Match extends Document {
    league: Types.ObjectId;
    season: Types.ObjectId;
    stage: Types.ObjectId;
    roundNumber: number;
    homeTeam: Types.ObjectId;
    awayTeam: Types.ObjectId;
    date: Date;
    homeScore?: number;
    awayScore?: number;
    status: MatchStatus;
    venue?: string;
    notes?: string;
}

const MatchSchema = new Schema<Match>({
    league: { type: Schema.Types.ObjectId, ref: 'League', required: true },
    season: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    stage: { type: Schema.Types.ObjectId, ref: 'Stage', required: true },
    roundNumber: { type: Number, required: false },
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    date: { type: Date, required: true },
    homeScore: { type: Number, required: false },
    awayScore: { type: Number, required: false },
    status: { type: String, enum: Object.values(MatchStatus), default: MatchStatus.Scheduled },
    venue: { type: String, required: false },
    notes: { type: String, required: false },
});

export default mongoose.model<Match>('Match', MatchSchema);
