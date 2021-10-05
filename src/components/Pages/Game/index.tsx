import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import PlayerCards from 'src/components/PlayerCards';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import TitleServer from '../Settings/Title-Spring/Title-spring';

import Issues from '../Settings/Issues';
import styles from './GamePage.module.scss';
import Button from '../../Button';
import RoundControl from './RoundControl';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  removeUser,
  selectCards,
  selectIssues,
  selectUser,
  selectUsers,
} from '../../../store/usersSlice';
import CardCollection from '../Settings/Card-collection';
import ScoreCardCollection from './ScoreCard/ScoreCardCollection';
import User from '../../../interfaces/user';
import SocketContext from '../../../shared/SocketContext';

const Game: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const cards = useAppSelector(selectCards);

  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const issues = useAppSelector(selectIssues);

  const [index, setIndex] = useState<number>(0);

  const currentIssue = useMemo(() => {
    return issues[index];
  }, [index, issues]);

  const nextIssue = useMemo(() => {
    return issues[index + 1];
  }, [index, issues]);

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  const stopGame = () => {
    socket?.emit('remove user', user, user?.room, (userData: User) => {
      dispatch(removeUser(userData));
      router.push('/');
    });
  };

  useEffect(() => {
    if (user === undefined) {
      router.push('/');
    }

    if (user && master === undefined) {
      socket?.emit('remove user', user, user?.room, (userData: User) => {
        dispatch(removeUser(userData));
        router.push('/');
      });
    }
  }, [dispatch, master, router, socket, user]);

  return (
    <div style={{ display: 'flex' /* , flexWrap: 'wrap' */ }}>
      <div className={styles.GameContainer}>
        <TitleServer />

        <div className={styles.flexRow}>
          <PlayerCards
            items={master ? [master] : []}
            user={user}
            title={'Scram master:'}
          />
          <Button backgroundColor={'#fff'} color={'#2B3A67'} onClick={stopGame}>
            Stop Game
          </Button>
        </div>

        <div className={styles.flexRow} style={{ alignItems: 'center' }}>
          <Issues isMaster={user?.isMaster} width={'305px'} />
          {user?.isMaster && (
            <RoundControl
              setIndex={setIndex}
              currentIssue={currentIssue}
              nextIssue={nextIssue}
            />
          )}
        </div>

        {/* Game */}

        {cards.length > 0 ? (
          <CardCollection items={cards} isSettingsPage={false} />
        ) : (
          <p style={{ marginTop: '30px', textAlign: 'center' }}>
            Карточек нет, игра невозможна...
          </p>
        )}

        {/* Statistic */}
        {currentIssue?.votes.length > 0 ? (
          <CardCollection
            isVotes={true}
            items={currentIssue?.votes}
            isSettingsPage={false}
          />
        ) : (
          ''
        )}

        <aside className={styles.aside2}>
          <div>Score:</div>
          <div>Players:</div>
          <ScoreCardCollection currentIssue={currentIssue} />
        </aside>
      </div>

      <aside className={styles.aside}>
        <div>Score:</div>
        <div>Players:</div>
        <ScoreCardCollection currentIssue={currentIssue} />
      </aside>
    </div>
  );
};

export default withRouter(Game);
