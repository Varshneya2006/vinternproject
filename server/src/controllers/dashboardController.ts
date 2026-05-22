import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Student, { IStudent } from '../models/Student';
import SessionAnalytics, { ISessionAnalytics } from '../models/SessionAnalytics';

interface StudentDashboardResponse {
  studentName: string;
  totalPoints: number;
  level: number;
  streak: number;
  badges: string[];
  achievements: string[];
}

interface SessionHistoryItem {
  sessionName: string;
  pointsEarned: number;
  accuracy: number;
  questionsAttempted: number;
  correctAnswers: number;
  sessionDate: Date;
}

interface DashboardStatsResponse {
  totalSessions: number;
  averageAccuracy: number;
  totalCorrectAnswers: number;
  totalQuestionsAttempted: number;
}

export const getStudentDashboard = async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: 'Invalid student ID' });
    return;
  }

  try {
    const student = (await Student.findById(studentId).lean()) as IStudent | null;

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const payload: StudentDashboardResponse = {
      studentName: student.name,
      totalPoints: student.totalPoints,
      level: student.level,
      streak: student.streak,
      badges: student.badges,
      achievements: student.achievements,
    };

    res.status(200).json(payload);
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).json({ message: 'Failed to load student dashboard' });
  }
};

export const getSessionHistory = async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: 'Invalid student ID' });
    return;
  }

  try {
    const student = (await Student.findById(studentId).lean()) as IStudent | null;

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const sessions = (await SessionAnalytics.find({ studentId: new Types.ObjectId(studentId) })
      .sort({ sessionDate: -1 })
      .lean()) as ISessionAnalytics[];

    const history: SessionHistoryItem[] = sessions.map((session) => ({
      sessionName: session.sessionName,
      pointsEarned: session.pointsEarned,
      accuracy: session.accuracy,
      questionsAttempted: session.questionsAttempted,
      correctAnswers: session.correctAnswers,
      sessionDate: session.sessionDate,
    }));

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching session history:', error);
    res.status(500).json({ message: 'Failed to load session history' });
  }
};

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: 'Invalid student ID' });
    return;
  }

  try {
    const student = (await Student.findById(studentId).lean()) as IStudent | null;

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const sessions = (await SessionAnalytics.find({ studentId: new Types.ObjectId(studentId) })
      .lean()) as ISessionAnalytics[];

    const totalSessions = sessions.length;
    const totalCorrectAnswers = sessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    const totalQuestionsAttempted = sessions.reduce((sum, session) => sum + session.questionsAttempted, 0);
    const totalAccuracy = sessions.reduce((sum, session) => sum + session.accuracy, 0);
    const averageAccuracy = totalSessions > 0 ? Number((totalAccuracy / totalSessions).toFixed(2)) : 0;

    const response: DashboardStatsResponse = {
      totalSessions,
      averageAccuracy,
      totalCorrectAnswers,
      totalQuestionsAttempted,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Failed to load dashboard stats' });
  }
};
