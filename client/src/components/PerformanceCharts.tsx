import type { ReactElement } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

export interface SessionData {
  sessionName: string;
  pointsEarned: number;
  accuracy: number;
  questionsAttempted: number;
  correctAnswers: number;
  date: string;
}

export interface PerformanceChartsProps {
  sessions: SessionData[];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Title);

const PerformanceCharts = ({ sessions }: PerformanceChartsProps): ReactElement => {
  if (sessions.length === 0) {
    return <div className="empty-state">No performance data available</div>;
  }

  const labels = sessions.map((session) => {
    const date = new Date(session.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const accuracyData = {
    labels,
    datasets: [
      {
        label: 'Accuracy %',
        data: sessions.map((session) => session.accuracy),
        borderColor: 'rgba(96, 165, 250, 0.95)',
        backgroundColor: 'rgba(96, 165, 250, 0.3)',
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const pointsData = {
    labels,
    datasets: [
      {
        label: 'Points Earned',
        data: sessions.map((session) => session.pointsEarned),
        backgroundColor: 'rgba(124, 58, 237, 0.85)',
        borderRadius: 12,
      },
    ],
  };

  const totalCorrect = sessions.reduce((sum, session) => sum + session.correctAnswers, 0);
  const totalAttempted = sessions.reduce((sum, session) => sum + session.questionsAttempted, 0);
  const incorrectAnswers = Math.max(totalAttempted - totalCorrect, 0);

  const doughnutData = {
    labels: ['Correct Answers', 'Incorrect Answers'],
    datasets: [
      {
        data: [totalCorrect, incorrectAnswers],
        backgroundColor: ['rgba(52, 211, 153, 0.92)', 'rgba(236, 72, 153, 0.78)'],
        hoverOffset: 10,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <section className="charts-grid">
      <article className="chart-card">
        <div className="chart-card-header">
          <h3>Accuracy Trend</h3>
        </div>
        <div className="chart-wrapper">
          <Line data={accuracyData} options={{
            ...commonOptions,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value: string | number) => `${value}%`,
                },
              },
            },
          }} />
        </div>
      </article>

      <article className="chart-card">
        <div className="chart-card-header">
          <h3>Points Per Session</h3>
        </div>
        <div className="chart-wrapper">
          <Bar data={pointsData} options={{
            ...commonOptions,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                },
              },
            },
          }} />
        </div>
      </article>

      <article className="chart-card small-card">
        <div className="chart-card-header">
          <h3>Correct vs Incorrect Answers</h3>
        </div>
        <div className="chart-wrapper doughnut-wrapper">
          <Doughnut data={doughnutData} options={{
            ...commonOptions,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: '#cbd5e1',
                },
              },
            },
          }} />
        </div>
      </article>
    </section>
  );
};

export default PerformanceCharts;
