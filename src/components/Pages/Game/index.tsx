import React, { FC, useMemo } from 'react';
import PlayerCards from 'src/components/PlayerCards';
import TitleServer from '../Settings/Title-Spring/Title-spring';

import Issues from '../Settings/Issues';
import styles from './GamePage.module.scss';
import Button from '../../Button';
import RoundControl from './RoundControl';
import { useAppSelector } from '../../../hooks';
import { selectUser, selectUsers } from '../../../store/usersSlice';
import CardCollection from '../Settings/Card-collection';

const Game: FC = () => {
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  // const others = useMemo(() => {
  //   return users.filter((item) => !item.isMaster);
  // }, [users]);

  return (
    <div style={{ display: 'flex' /* , flexWrap: 'wrap' */ }}>
      <div className={styles.GameContainer}>
        <TitleServer title={'123'} />

        <div className={styles.flexRow}>
          <PlayerCards
            items={master ? [master] : []}
            user={user}
            title={'Scram master:'}
          />
          <Button backgroundColor={'#fff'} color={'#2B3A67'}>
            Stop Game
          </Button>
        </div>

        <div className={styles.flexRow} style={{ alignItems: 'center' }}>
          <Issues isMaster width={'305px'} />
          <RoundControl />
        </div>

        <CardCollection isSettingsPage={false} />
      </div>

      <aside className={styles.aside}>
        <div>Score:</div>
        <div>Players:</div>
      </aside>
    </div>
  );
};

export default Game;
