import type { ReactElement } from "react";

export interface Session {
  sessionName: string;
  pointsEarned: number;
  accuracy: number;
  date: string;
}

interface SessionTableProps {
  sessions: Session[];
}

const SessionTable = ({ sessions }: SessionTableProps): ReactElement => {
  return (
    <div className="table-card">
      <table className="session-table">
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Points</th>
            <th>Accuracy</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={`${session.sessionName}-${session.date}`}>
              <td>{session.sessionName}</td>
              <td>{session.pointsEarned}</td>
              <td>{session.accuracy}%</td>
              <td>{session.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTable;
