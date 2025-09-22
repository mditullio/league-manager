import mongoose, { Schema, Document, Types } from 'mongoose';
import { League } from './league.schema';
import { Stage } from './stage.schema';
import { Season } from './season.schema';
import { Team } from './team.schema';

export enum MatchStatus {
    Scheduled = 'scheduled',
    Completed = 'completed',
    Postponed = 'postponed',
    Cancelled = 'cancelled',
}

export interface Match extends Document<Types.ObjectId> {
    league: Types.ObjectId | League;
    season: Types.ObjectId | Season;
    stage: Types.ObjectId | Stage;
    groupName?: string;
    roundNumber: number;
    homeTeam: Types.ObjectId | Team;
    awayTeam: Types.ObjectId | Team;
    date?: Date;
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
    groupName: { type: String, required: false },
    roundNumber: { type: Number, required: true },
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    date: { type: Date, required: false },
    homeScore: { type: Number, required: false },
    awayScore: { type: Number, required: false },
    status: { type: String, enum: Object.values(MatchStatus), default: MatchStatus.Scheduled },
    venue: { type: String, required: false },
    notes: { type: String, required: false },
});

export const MatchModel = mongoose.model<Match>('Match', MatchSchema);
