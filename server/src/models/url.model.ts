import { Schema, model, type Document,  type Model } from 'mongoose';

export interface IUrl extends Document { 
    originalUrl: string;
    shortCode: string;
    clickCount: number;
    expiresAt?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const urlSchema = new Schema<IUrl>(
    {
        originalUrl: { type: String, required: true, trim: true },
        shortCode: { type: String, required: true, unique: true, index: true, trim: true },
        clickCount: { type: Number, default: 0, min: 0 },
        expiresAt: { type: Date, default: null },
        isActive: { type: Boolean, default: true, index: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const UrlModel: Model<IUrl> = model<IUrl>('Url', urlSchema);