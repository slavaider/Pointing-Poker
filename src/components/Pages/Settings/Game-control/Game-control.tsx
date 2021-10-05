import React, { FC, memo, useContext } from 'react';
import { Button } from 'antd';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import User from 'src/interfaces/user';
import styles from './Game-control.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectUser,
  selectUsers,
  removeUser,
  startGameUsers,
} from '../../../../store/usersSlice';
import SocketContext from '../../../../shared/SocketContext';

export interface GameControlProps extends WithRouterProps {
  isMaster?: boolean;
}

const GameControl: FC<GameControlProps> = ({
  router,
  isMaster,
}: GameControlProps) => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);

  const startGame = () => {
    socket?.emit('start game', users, user?.room, (usersData: User[]) => {
      dispatch(startGameUsers(usersData));
      router.push(`/game/${user?.room}`);
    });
  };

  const exitGame = () => {
    socket?.emit('remove user', user, user?.room, (userData: User) => {
      dispatch(removeUser(userData));
      router.push('/');
    });
  };

  return (
    <div className={styles.game__control_container}>
      {isMaster ? (
        <>
          <Button type="primary" className="button" onClick={startGame}>
            START GAME
          </Button>
          <Button type="default" className="button" onClick={exitGame}>
            CANCEL GAME
          </Button>
        </>
      ) : (
        <Button type="default" className="button" onClick={exitGame}>
          EXIT GAME
        </Button>
      )}
    </div>
  );
};

export default withRouter(memo(GameControl));
