import { Schema, model, Document } from 'mongoose';

// Interface describing the Student document shape in MongoDB
export interface IStudent extends Document {
  name: string;
  email: string;
  totalPoints: number;
  level: number;
  streak: number;
  badges: string[];
  achievements: string[];
  createdAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    streak: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [String],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Do not automatically add updatedAt; explicit createdAt is defined above
    timestamps: false,
  }
);

const Student = model<IStudent>('Student', studentSchema);

export default Student;
