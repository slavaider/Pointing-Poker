import React, { FC } from 'react';
import PlayerCard from '../PlayerCard';
import styles from './PlayerCards.module.scss';
import User from '../../interfaces/user';
import stylesPage from '../Pages/Settings/Settings.module.scss';

type PlayerCardsProps = {
  items: User[];
  user: User | null;
  title: string;
};

const PlayerCards: FC<PlayerCardsProps> = ({
  items,
  user,
  title,
}: PlayerCardsProps) => {
  return (
    <section>
      <h4 className={stylesPage.title}>{title}</h4>

      <div className={styles.cardWrapper}>
        {items.map((item) => {
          return (
            <PlayerCard
              {...item}
              key={item.userId}
              isItYou={item.userId === user?.userId}
              isMaster={item.isMaster}
              size="max"
            />
          );
        })}
      </div>
    </section>
  );
};
export default PlayerCards;
