import type { ReactElement } from 'react';
import StatsCard from '../components/StatsCard';
import BadgeCard from '../components/BadgeCard';
import SessionTable from '../components/SessionTable';
import PerformanceCharts from '../components/PerformanceCharts';
import type { SessionData } from '../components/PerformanceCharts';
import type { BadgeCardProps } from '../components/BadgeCard';
import type { StatsCardProps } from '../components/StatsCard';
import '../styles/dashboard.css';

const studentName = 'Amina Patel';
const level = 4;

const stats: StatsCardProps[] = [
  { title: 'Total Points', value: 940, description: 'Points earned across all sessions' },
  { title: 'Accuracy', value: '92%', description: 'Average accuracy across quizzes' },
  { title: 'Current Streak', value: 14, description: 'Days of continuous learning' },
  { title: 'Sessions Completed', value: 38, description: 'Total quiz sessions completed' },
];

const badges: BadgeCardProps[] = [
  { badgeName: 'Quiz Master', description: 'High performance in quiz rounds' },
  { badgeName: 'Fast Responder', description: 'Quick and accurate answer delivery' },
  { badgeName: 'Consistency Pro', description: 'Stable learning pace over time' },
  { badgeName: 'Accuracy Ace', description: 'Outstanding accuracy on recent sessions' },
];

const sessionHistory: SessionData[] = [
  { sessionName: 'React Quiz', pointsEarned: 88, accuracy: 94, questionsAttempted: 12, correctAnswers: 11, date: '2026-05-01' },
  { sessionName: 'JavaScript Basics', pointsEarned: 76, accuracy: 87, questionsAttempted: 11, correctAnswers: 10, date: '2026-04-29' },
  { sessionName: 'Algorithms Practice', pointsEarned: 92, accuracy: 96, questionsAttempted: 13, correctAnswers: 12, date: '2026-04-26' },
  { sessionName: 'DBMS Revision', pointsEarned: 82, accuracy: 90, questionsAttempted: 10, correctAnswers: 9, date: '2026-04-23' },
  { sessionName: 'Networking Test', pointsEarned: 80, accuracy: 91, questionsAttempted: 11, correctAnswers: 10, date: '2026-04-20' },
];

const Dashboard = (): ReactElement => {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Student Dashboard</p>
          <h1>{studentName}</h1>
          <p className="subtitle">Track your progress, achievements, and analytics</p>
        </div>
        <div className="level-pill">Level {level}</div>
      </section>

      <section className="stats-grid">
        {stats.map((card) => (
          <StatsCard key={card.title} title={card.title} value={card.value} description={card.description} />
        ))}
      </section>

      <section className="badge-section">
        <div className="section-title-row">
          <div>
            <h2>Badges & Achievements</h2>
            <p>Recognize the milestones you have unlocked so far.</p>
          </div>
        </div>
        <div className="badge-grid">
          {badges.map((badge) => (
            <BadgeCard key={badge.badgeName} badgeName={badge.badgeName} description={badge.description} />
          ))}
        </div>
      </section>

      <PerformanceCharts sessions={sessionHistory} />

      <section className="history-section">
        <div className="history-header">
          <div>
            <h2>Session History</h2>
            <p>Recent sessions and essential performance metrics.</p>
          </div>
          <div className="achievement-pill">
            Unlock next achievement: Complete 2 more sessions for Master Learner
          </div>
        </div>
        <SessionTable sessions={sessionHistory} />
      </section>
    </main>
  );
};

export default Dashboard;
