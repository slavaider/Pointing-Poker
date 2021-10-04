import React, { FC } from 'react';
import stiles from './ScoreCard.module.scss';

interface ScoreCardProps {
  value?: string | number;
}

const ScoreCard: FC<ScoreCardProps> = ({ value }) => {
  return <div className={stiles.card}>{value || 'In progress'}</div>;
};

export default ScoreCard;
