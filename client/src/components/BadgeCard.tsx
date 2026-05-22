import type { ReactElement } from 'react';

export interface BadgeCardProps {
  badgeName: string;
  description: string;
}

const BadgeCard = ({ badgeName, description }: BadgeCardProps): ReactElement => {
  return (
    <article className="badge-card">
      <span className="badge-pill">{badgeName}</span>
      <p>{description}</p>
    </article>
  );
};

export default BadgeCard;
