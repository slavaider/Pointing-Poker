import React, { FC } from 'react';
import Button from '../../../Button';
import { useAppSelector } from '../../../../hooks';
import { selectOptions } from '../../../../store/usersSlice';

const GameControl: FC = () => {
  const options = useAppSelector(selectOptions);
  return (
    <div>
      <Button
        onClick={() => {
          console.log(options);
        }}
      >
        Start Game
      </Button>
      <Button backgroundColor={'#fff'} color={'2B3A67'}>
        Cancel game
      </Button>
      <style jsx>{`
        div {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default GameControl;
