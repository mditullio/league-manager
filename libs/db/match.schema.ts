import mongoose, { Schema, Document, Types } from 'mongoose';

export enum MatchStatus {
    Scheduled = 'scheduled',
    Completed = 'completed',
    Postponed = 'postponed',
    Cancelled = 'cancelled',
}

export interface Match extends Document {
    leagueId: Types.ObjectId;
    seasonId: Types.ObjectId;
    stageId: Types.ObjectId;
    roundNumber: number;
    homeTeamId: Types.ObjectId;
    awayTeamId: Types.ObjectId;
    date: Date;
    homeScore?: number;
    awayScore?: number;
    status: MatchStatus;
    venue?: string;
    notes?: string;
}

const MatchSchema = new Schema<Match>({
    leagueId: { type: Schema.Types.ObjectId, ref: 'League', required: true },
    seasonId: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    stageId: { type: Schema.Types.ObjectId, ref: 'Stage', required: true },
    roundNumber: { type: Number, required: false },
    homeTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    awayTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    date: { type: Date, required: true },
    homeScore: { type: Number, required: false },
    awayScore: { type: Number, required: false },
    status: { type: String, enum: Object.values(MatchStatus), default: MatchStatus.Scheduled },
    venue: { type: String, required: false },
    notes: { type: String, required: false },
});

export default mongoose.model<Match>('Match', MatchSchema);
