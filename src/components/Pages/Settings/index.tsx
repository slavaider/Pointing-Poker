import React, { FC, useEffect, useMemo } from 'react';
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

// todo удалить , заменить на данные из сервера socket      или нет)
const title = 'Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)';

const Settings: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  useFetchSettingsSockets();

  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  const others = useMemo(() => {
    return users.filter((item) => !item.isMaster);
  }, [users]);

  useEffect(() => {
    if (user === null || master === undefined) {
      router?.push('/');
    }

    if (user?.status === 'idle') {
      router?.push('/game');
    }
  }, [master, router, user]);

  const { roomId } = router.query;

  return (
    <div className={styles.SettingsContainer}>
      <TitleServer title={title} />
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
          <CardCollection isSettingsPage={false} />
        </>
      )}
    </div>
  );
};

export default withRouter(Settings);
