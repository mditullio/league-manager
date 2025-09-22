import mongoose, { Schema, Document, Types } from 'mongoose';
import { Nation } from './nation.schema';

export interface League extends Document<Types.ObjectId> {
    name: string;
    nation?: Types.ObjectId | Nation;
    logoUrl?: string;
    description?: string;
}

const LeagueSchema = new Schema<League>({
    name: { type: String, required: true },
    nation: { type: Schema.Types.ObjectId, ref: 'Nation' },
    logoUrl: { type: String },
    description: { type: String },
});

export const LeagueModel = mongoose.model<League>('League', LeagueSchema);
