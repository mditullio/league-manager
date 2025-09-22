import e from 'express';
import mongoose, { Schema, Document, Types } from 'mongoose';
import { Season } from './season.schema';
import { Team } from './team.schema';

export enum StageType {
    Group = 'group',
    Knockout = 'knockout',
}

export interface StageRound extends Document<Types.ObjectId> {
    roundNumber: number;
    name?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface Stage extends Document<Types.ObjectId> {
    season: Types.ObjectId | Season;
    order: number;
    name: string;
    type: StageType;
    startDate?: Date;
    endDate?: Date;
    rounds?: StageRound[];
}

export enum GroupStageTieBreaker {
    GoalDifference = 'goalDifference',
    GoalsFor = 'goalsFor',
    HeadToHead = 'headToHead',
    Wins = 'wins',
    FairPlay = 'fairPlay',
    RandomDraw = 'randomDraw',
}

export interface GroupStageRules {
    pointsForWin: number;
    pointsForDraw: number;
    pointsForLoss: number;
    tieBreakerOrder: GroupStageTieBreaker[];
    maxTeams?: number;
    otherRules?: Record<string, any>;
}

export interface TeamGroup extends Document<Types.ObjectId> {
    name: string;
    teams: (Types.ObjectId | Team)[];
}

export interface GroupStage extends Stage {
    type: StageType.Group;
    groups: TeamGroup[];
    rules: GroupStageRules;
}

export interface KnockoutStageRules {
    twoLeggedTies: boolean;
    awayGoalsRule: boolean;
    extraTime: boolean;
    penalties: boolean;
    otherRules?: Record<string, any>;
}

export interface KnockoutStage extends Stage {
    type: StageType.Knockout;
    teams: (Types.ObjectId | Team)[];
    rules: KnockoutStageRules;
}

// --- Mongoose Schemas ---

const baseStageSchema = new Schema<Stage>({
    season: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    order: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(StageType), required: true },
    rounds: [{
        roundNumber: { type: Number, required: true },
        name: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
    }],
    startDate: { type: Date },
    endDate: { type: Date },
}, { discriminatorKey: 'type', collection: 'stages' });

const groupStageSchema = new Schema<GroupStage>({
    groups: [{
        name: { type: String, required: true },
        teams: [{ type: Schema.Types.ObjectId, ref: 'Team', required: true }],
    }],
    rules: {
        pointsForWin: { type: Number, default: 3 },
        pointsForDraw: { type: Number, default: 1 },
        pointsForLoss: { type: Number, default: 0 },
        tieBreakerOrder: [{ type: String, enum: Object.values(GroupStageTieBreaker) }],
        maxTeams: { type: Number },
        otherRules: { type: Schema.Types.Mixed },
    },
});

const knockoutStageSchema = new Schema<KnockoutStage>({
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team', required: true }],
    rules: {
        twoLeggedTies: { type: Boolean, default: false },
        awayGoalsRule: { type: Boolean, default: false },
        extraTime: { type: Boolean, default: false },
        penalties: { type: Boolean, default: false },
        otherRules: { type: Schema.Types.Mixed },
    },
});

export const StageModel = mongoose.model<Stage>('Stage', baseStageSchema);
export const GroupStageModel = StageModel.discriminator<GroupStage>('group', groupStageSchema);
export const KnockoutStageModel = StageModel.discriminator<KnockoutStage>('knockout', knockoutStageSchema);

