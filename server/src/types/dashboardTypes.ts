export interface StudentProfileDTO {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
  badges: string[];
  level: number;
  streak: number;
  createdAt: Date;
}

export interface SessionAnalyticsDTO {
  _id: string;
  studentId: string;
  sessionName: string;
  pointsEarned: number;
  accuracy: number;
  questionsAttempted: number;
  correctAnswers: number;
  sessionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardAnalyticsDTO {
  totalSessions: number;
  totalPointsEarned: number;
  averageAccuracy: number;
  latestSession: SessionAnalyticsDTO | null;
}

export interface StudentDashboardResponse {
  studentProfile: StudentProfileDTO;
  analytics: DashboardAnalyticsDTO;
}

export interface SessionHistoryResponse {
  studentId: string;
  sessions: SessionAnalyticsDTO[];
}
