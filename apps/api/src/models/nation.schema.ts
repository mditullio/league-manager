import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Nation extends Document<Types.ObjectId> {
    name: string;
    code?: string;
    flagUrl?: string;
    flagEmoji?: string;
}

const NationSchema = new Schema<Nation>({
    name: { type: String, required: true },
    code: { type: String },
    flagUrl: { type: String },
    flagEmoji: { type: String },
});

export default mongoose.model<Nation>('Nation', NationSchema);
