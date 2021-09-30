import React, { FC, useContext, useEffect, useMemo } from 'react';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import styles from './Settings.module.scss';
import TitleServer from './Title-Spring';
import LinkToLobby from './Link-to-lobby';
import GameControl from './Game-control';
import Issues from './Issues';
import GameSettings from './Game-settings';
import CardCollection from './Card-collection';
import { useAppSelector } from '../../../hooks';
import { selectUser, selectUsers } from '../../../store/usersSlice';
import PlayerCards from '../../PlayerCards';
import useFetchSettingsSockets from '../../../hooks/useFetchDataSockets';
import SocketContext from '../../../shared/SocketContext';

const Settings: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  useFetchSettingsSockets();

  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const socket = useContext(SocketContext);

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  const others = useMemo(() => {
    return users.filter((item) => !item.isMaster);
  }, [users]);

  useEffect(() => {
    if (user === undefined || master === undefined) {
      router?.push('/');
    }

    if (master?.status === 'game') {
      // update
      router?.push('/game');
    }
  }, [master, router, user]);

  useEffect(() => {
    if (users.length !== 1 && user?.kickVotes === users.length - 1) {
      socket?.emit('leave', user);
      router.push('/');
    }
  }, [user, router, users, socket]);

  const { roomId } = router.query;

  return (
    <div className={styles.SettingsContainer}>
      <TitleServer isSettingsPage />
      {
        <PlayerCards
          items={master ? [master] : []}
          user={user}
          title={'Scram master:'}
        />
      }
      <LinkToLobby linkToLobby={roomId as string} />
      <GameControl isMaster={master?.userId === user?.userId} />
      <PlayerCards items={others} user={user} title={'Members:'} />
      {master?.userId === user?.userId && (
        <>
          <Issues />
          <GameSettings />
          <CardCollection />
        </>
      )}
    </div>
  );
};

export default withRouter(Settings);
