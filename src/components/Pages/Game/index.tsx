import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import PlayerCards from 'src/components/PlayerCards';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Button } from 'antd';
import TitleServer from '../Settings/Title-Spring/Title-spring';

import Issues from '../Settings/Issues';
import styles from './GamePage.module.scss';
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
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const issues = useAppSelector(selectIssues);

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  const [index, setIndex] = useState<number>(
    master?.currentIssueIndex as number,
  );

  const currentIssue = useMemo(() => {
    return issues[index];
  }, [index, issues]);

  const nextIssue = useMemo(() => {
    return issues[index + 1];
  }, [index, issues]);

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
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className={styles.GameContainer}>
        <TitleServer />

        <div className={styles.flexRow}>
          <PlayerCards
            items={master ? [master] : []}
            user={user}
            title={'Scram master:'}
          />
          <Button type="default" className="button" onClick={stopGame}>
            {user?.isMaster ? 'Stop Game' : 'Exit'}
          </Button>
        </div>

        <div className={styles.flexRow} style={{ alignItems: 'center' }}>
          <Issues isMaster={user?.isMaster} width={'305px'} />
          <RoundControl
            setIsUpdate={setIsUpdate}
            setIsGameStarted={setIsGameStarted}
            setIndex={setIndex}
            currentIssue={currentIssue}
            nextIssue={nextIssue}
          />
        </div>

        {issues.length > 0 && cards.length > 0 ? (
          <CardCollection
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            isGameStarted={isGameStarted}
            currentIssue={currentIssue}
            items={cards}
            isSettingsPage={false}
          />
        ) : (
          <p style={{ marginTop: '30px', textAlign: 'center' }}>
            Карточек или issues нет, игра невозможна...
          </p>
        )}

        {!isGameStarted && currentIssue?.votes.length > 0 ? (
          <CardCollection
            isGameStarted={isGameStarted}
            isVotes={true}
            currentIssue={currentIssue}
            items={currentIssue?.votes}
            isSettingsPage={false}
          />
        ) : (
          ''
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
