import { Schema, Document } from 'mongoose';

export interface Subject extends Document {
    idClass: String
    title: String
    isComplete: Boolean
}

export const SubjectSchema = new Schema<Subject>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        idClass: { type: String, required: true },
        title: { type: String, required: true },
        isComplete: { type: Boolean, required: true, default: false },
    },
    { timestamps: true },
);
