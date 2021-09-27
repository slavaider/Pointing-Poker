import React, { FC } from 'react';
import { Button } from 'antd';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import styles from './Game-control.module.scss';

export interface GameControlProps extends WithRouterProps {
  isMaster: boolean;
}

const GameControl: FC<GameControlProps> = ({
  router,
  isMaster,
}: GameControlProps) => {
  const startGame = () => {
    router.push('/game');
  };
  const cancelGame = () => {
    router.push('/');
  };
  const exitGame = () => {
    router.push('/');
  };

  return (
    <div className={styles.game__control_container}>
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
