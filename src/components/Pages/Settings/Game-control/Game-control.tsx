import React, { FC } from 'react';
import Button from '../../../Button';

const GameControl: FC = () => {
  return (
    <div>
      <Button>Start Game</Button>
      <Button backgroundColor={'#fff'} color={'#2B3A67'}>
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
