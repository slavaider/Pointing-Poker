import React, { FC } from 'react';
import TitleServer from '../Settings/Title-Spring/Title-spring';
import ScramMaster from '../Settings/Scram-master';
import { title } from '../Settings';
import Issues from '../Settings/Issues';
import styles from './GamePage.module.scss';
import Button from '../../Button';
import RoundControl from './RoundControl';
import CardCollection from '../Settings/Card-collection';
import { CardData } from '../Settings/Card-collection/Card-collection';

const cardData: CardData[] = [
  { cardValue: 'unknown', cardStatisticValue: '12%', issueId: 123 },
  // { cardValue: 13, cardStatisticValue: '12%', issueId: 123 },
  // { cardValue: 5, cardStatisticValue: '12%', issueId: 123 },
  // { cardValue: 8, cardStatisticValue: '12%', issueId: 123 },
  // { cardValue: 3, cardStatisticValue: '12%', issueId: 123 },
  // { cardValue: 9, cardStatisticValue: '12%', issueId: 123 },
];

const Game: FC = () => {
  return (
    <div style={{ display: 'flex' /* , flexWrap: 'wrap' */ }}>
      <div className={styles.GameContainer}>
        <TitleServer title={title} />

        <div className={styles.flexRow}>
          <ScramMaster />
          <Button backgroundColor={'#fff'} color={'#2B3A67'}>
            Stop Game
          </Button>
        </div>

        <div className={styles.flexRow} style={{ alignItems: 'center' }}>
          <Issues isMaster width={'305px'} />
          <RoundControl />
        </div>

        <CardCollection isSettingsPage={false} cardData={cardData} />
      </div>

      <aside className={styles.aside}>
        <div>Score:</div>
        <div>Players:</div>
      </aside>
    </div>
  );
};

export default Game;
