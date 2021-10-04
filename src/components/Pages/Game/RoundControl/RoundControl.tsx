import React, { FC, useState } from 'react';
import Button from '../../../Button';

const RUN_ROUND = 'Run Round';
const RESTART_ROUND = 'Restart Round';

const RoundControl: FC = () => {
  const [newRound, setNewRound] = useState(true);

  return (
    <div style={{ maxWidth: '470px', width: '100%', padding: '15px 0' }}>
      <span style={{ margin: '40px 10px' }}>Timer: 13 : 12</span>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          margin: '10px',
        }}
      >
        <span
          style={{
            margin: '5px',
          }}
          onClick={() => setNewRound(() => false)}
        >
          <Button>{newRound ? RUN_ROUND : RESTART_ROUND}</Button>
        </span>
        {!newRound && (
          <span
            style={{
              margin: '5px',
            }}
            onClick={() => setNewRound(() => true)}
          >
            <Button>Next Issue</Button>
          </span>
        )}
      </div>
    </div>
  );
};

export default RoundControl;
