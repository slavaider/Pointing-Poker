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
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addOptions, selectUser, selectUsers } from '../../../store/usersSlice';
import PlayerCards from '../../PlayerCards';
import { IOptions } from '../../../interfaces/options';
import SocketContext from '../../../shared/SocketContext';

// todo удалить , заменить на данные из сервера socket      или нет)
const title = 'Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)';

const Settings: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const master = useMemo(() => {
    return users.find((item) => item.isMaster);
  }, [users]);

  const others = useMemo(() => {
    return users.filter((item) => !item.isMaster);
  }, [users]);

  useEffect(() => {
    if (user === null) {
      router?.push('/');
    }
  }, [router, user]);

  useEffect(() => {
    socket?.on('add option', (response: IOptions) => {
      dispatch(addOptions(response));
    });
  }, [socket, dispatch]);

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
      <GameControl />
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
