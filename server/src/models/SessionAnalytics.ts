import { Schema, model, Document, Types } from 'mongoose';

// Interface describing a session analytics document for a student
export interface ISessionAnalytics extends Document {
  studentId: Types.ObjectId;
  sessionName: string;
  pointsEarned: number;
  accuracy: number;
  questionsAttempted: number;
  correctAnswers: number;
  sessionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionAnalyticsSchema = new Schema<ISessionAnalytics>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    sessionName: {
      type: String,
      required: [true, 'Session name is required'],
      trim: true,
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    questionsAttempted: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    sessionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SessionAnalytics = model<ISessionAnalytics>('SessionAnalytics', sessionAnalyticsSchema);

export default SessionAnalytics;
