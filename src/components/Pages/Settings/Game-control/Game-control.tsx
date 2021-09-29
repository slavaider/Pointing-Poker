import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import User from 'src/interfaces/user';
import styles from './Game-control.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectUser,
  selectUsers,
  startGameUsers,
} from '../../../../store/usersSlice';
import SocketContext from '../../../../shared/SocketContext';

export interface GameControlProps extends WithRouterProps {
  isMaster: boolean;
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
      router.push('/game');
    });
  };
  const cancelGame = () => {
    router.push('/');
  };
  const exitGame = () => {
    router.push('/');
  };

  return (
    <div className={styles.game__control_container}>
      <Button
        type="primary"
        className="button"
        onClick={() => {
          console.log(users);
        }}
      >
        TEST
      </Button>
      {isMaster ? (
        <>
          <Button type="primary" className="button" onClick={startGame}>
            START GAME
          </Button>
          <Button type="default" className="button" onClick={cancelGame}>
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

export default withRouter(GameControl);
