import mongoose, { Schema, Document, Types } from 'mongoose';

export enum StageType {
    Group = 'group',
    Knockout = 'knockout',
}

export interface Stage extends Document {
    seasonId: Types.ObjectId;
    order: number;
    name: string;
    type: StageType;
    startDate?: Date;
    endDate?: Date;
    rounds?: Record<number, string>;
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

export interface GroupStage extends Stage {
    teamGroups: Record<string, Types.ObjectId[]>;
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
    initialTeams: Types.ObjectId[];
    rules: KnockoutStageRules;
}

// --- Mongoose Schemas ---

const baseStageSchema = new Schema<Stage>({
    seasonId: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    order: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(StageType), required: true },
    rounds: { type: Schema.Types.Mixed },
    startDate: { type: Date },
    endDate: { type: Date },
}, { discriminatorKey: 'type', collection: 'stages' });

export const StageModel = mongoose.model<Stage>('Stage', baseStageSchema);

const groupStageSchema = new Schema<GroupStage>({
    teamGroups: { type: Schema.Types.Mixed, required: true },
    rules: {
        pointsForWin: { type: Number, default: 3 },
        pointsForDraw: { type: Number, default: 1 },
        pointsForLoss: { type: Number, default: 0 },
        tieBreakerOrder: [{ type: String, enum: Object.values(GroupStageTieBreaker) }],
        maxTeams: { type: Number },
        otherRules: { type: Schema.Types.Mixed },
    },
});

export const GroupStageModel = StageModel.discriminator<GroupStage>('group', groupStageSchema);

const knockoutStageSchema = new Schema<KnockoutStage>({
    initialTeams: [{ type: Schema.Types.ObjectId, ref: 'Team', required: true }],
    rules: {
        twoLeggedTies: { type: Boolean, default: false },
        awayGoalsRule: { type: Boolean, default: false },
        extraTime: { type: Boolean, default: false },
        penalties: { type: Boolean, default: false },
        otherRules: { type: Schema.Types.Mixed },
    },
});

export const KnockoutStageModel = StageModel.discriminator<KnockoutStage>('knockout', knockoutStageSchema);

console.log(new KnockoutStageModel().type); // Ensure the model is registered


