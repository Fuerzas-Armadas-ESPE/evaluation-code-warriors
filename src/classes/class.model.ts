import { Schema, Document } from 'mongoose';

export interface Class extends Document {
    idCourse: String
    title: String
    isComplete: Boolean
}

export const ClassSchema = new Schema<Class>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        idCourse: { type: String, required: true },
        title: { type: String, required: true },
        isComplete: { type: Boolean, required: true, default: false },
    },
    { timestamps: true },
);
