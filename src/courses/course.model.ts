import { Schema, Document } from 'mongoose';

export interface Course extends Document {
    title: String
    isComplete: Boolean
}

export const CourseSchema = new Schema<Course>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        title: { type: String, required: true },
        isComplete: { type: Boolean, required: true, default: false }
    },
    { timestamps: true },
);
