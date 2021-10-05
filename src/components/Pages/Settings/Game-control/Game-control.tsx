import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './Game-control.module.scss';
import { useAppSelector } from '../../../../hooks';
import { selectOptions } from '../../../../store/usersSlice';

const GameControl: FC = () => {
  const options = useAppSelector(selectOptions);
  return (
    <div className={styles.game__control_container}>
      <Button
        type="primary"
        htmlType="submit"
        className="button"
        onClick={() => {
          console.log(options);
        }}
      >
        Start Game
      </Button>
      <Button type="default" htmlType="submit" className="button">
        Cancel Game
      </Button>
    </div>
  );
};

export default GameControl;
