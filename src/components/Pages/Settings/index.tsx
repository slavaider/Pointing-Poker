import React, { FC, useEffect, useMemo } from 'react';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import styles from './Settings.module.scss';
import TitleServer from './Title-Spring';
import ScramMaster from './Scram-master';
import LinkToLobby from './Link-to-lobby';
import GameControl from './Game-control';
import TeamMembers from './Team-members';
import Issues from './Issues';
import GameSettings from './Game-settings';
import CardCollection from './Card-collection';
import { useAppSelector } from '../../../hooks';
import { selectUser, selectUsers } from '../../../store/usersSlice';

// todo удалить , заменить на данные из сервера socket      или нет)
const title = 'Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)';

const Settings: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  const users = useAppSelector(selectUsers);
  const userId = useAppSelector(selectUser);

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);
  const others = useMemo(() => {
    return users.filter((item) => !item.isMaster);
  }, [users]);

  useEffect(() => {
    if (userId === null) {
      router?.push('/');
    }
  }, [router, userId]);

  const { roomId } = router.query;
  return (
    <div className={styles.SettingsContainer}>
      <TitleServer title={title} />
      {<ScramMaster item={master} userId={userId} />}
      <LinkToLobby linkToLobby={roomId as string} />
      <GameControl />
      <TeamMembers items={others} userId={userId} />
      {master?.userId === userId && (
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
