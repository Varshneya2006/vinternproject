import type { ReactElement } from 'react';

export interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatsCard = ({ title, value, description }: StatsCardProps): ReactElement => {
  return (
    <article className="stats-card">
      <div className="stats-card-top">
        <p className="stats-card-title">{title}</p>
        <p className="stats-card-value">{value}</p>
      </div>
      <p className="stats-card-description">{description}</p>
    </article>
  );
};

export default StatsCard;
