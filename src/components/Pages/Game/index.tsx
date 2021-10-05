import React, { FC, useContext, useMemo } from 'react';
import PlayerCards from 'src/components/PlayerCards';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import TitleServer from '../Settings/Title-Spring/Title-spring';

import Issues from '../Settings/Issues';
import styles from './GamePage.module.scss';
import Button from '../../Button';
import RoundControl from './RoundControl';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeUser, selectUser, selectUsers } from '../../../store/usersSlice';
import CardCollection from '../Settings/Card-collection';
import ScoreCardCollection from './ScoreCard/ScoreCardCollection';
import User from '../../../interfaces/user';
import SocketContext from '../../../shared/SocketContext';

const Game: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  const exit = () => {
    socket?.emit('remove user', user, user?.room, (userData: User) => {
      dispatch(removeUser(userData));
      router.push('/');
    });
  };
  const stopGame = () => {
    // todo заменить на  удалить всех?
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////

    socket?.emit('remove user', user, user?.room, (userData: User) => {
      dispatch(removeUser(userData));
      router.push('/');
    });

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className={styles.GameContainer}>
        <TitleServer />

        <div className={styles.flexRow}>
          <PlayerCards
            items={master ? [master] : []}
            user={user}
            title={'Scram master:'}
          />

          {master?.userId !== user?.userId ? (
            //
            // todo обавить таймер
            //

            <Button backgroundColor={'#aaa'} color={'#2B3A67'} onClick={exit}>
              Exit
            </Button>
          ) : (
            <Button
              backgroundColor={'#aaa'}
              color={'#2B3A67'}
              onClick={stopGame}
            >
              Stop Game
            </Button>
          )}
        </div>

        <div className={styles.flexRow} style={{ alignItems: 'center' }}>
          <Issues isMaster width={'305px'} />

          {master?.userId === user?.userId ? (
            <RoundControl />
          ) : (
            <CardCollection isSettingsPage={false} />
          )}
        </div>
        {master?.userId === user?.userId && (
          <CardCollection isSettingsPage={false} />
        )}

        <aside className={styles.aside_mobile}>
          <div>Score:</div>
          <div>Players:</div>
          <ScoreCardCollection />
        </aside>
      </div>

      <aside className={styles.aside}>
        <div>Score:</div>
        <div>Players:</div>
        <ScoreCardCollection />
      </aside>
    </div>
  );
};

export default withRouter(Game);
