import React, { FC, useMemo, useState } from 'react';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';
import Button from '../../../Button';
import { useAppSelector } from '../../../../hooks';
import { selectOptions } from '../../../../store/usersSlice';
import Issue from '../../../../interfaces/issue';

const RUN_ROUND = 'Run Round';
const RESTART_ROUND = 'Restart Round';

export type RoundControlProps = {
  currentIssue?: Issue;
  nextIssue?: Issue;
  setIndex: (prevIndex: any) => void;
};

const RoundControl: FC<RoundControlProps> = ({
  currentIssue,
  nextIssue,
  setIndex,
}: RoundControlProps) => {
  const [newRound, setNewRound] = useState(true);

  const options = useAppSelector(selectOptions);

  const getTime = () => {
    const parse = moment(options.timerValue, 'mm:ss');
    const minutes = parse.minutes();
    const seconds = parse.seconds();
    const date = new Date();
    date.setSeconds(date.getSeconds() + minutes * 60 + seconds);
    return date;
  };
  const time = useMemo(() => {
    return getTime();
  }, [getTime]);

  const { seconds, minutes, resume, pause, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });

  const startRound = () => {
    if (newRound) {
      resume();
    } else {
      restart(getTime());
    }

    setNewRound(false);
  };

  const startNewRound = () => {
    restart(getTime());
    pause();
    setIndex((prevIndex: number) => prevIndex + 1);
    setNewRound(() => true);
  };

  return (
    <>
      {currentIssue ? (
        <div style={{ maxWidth: '470px', width: '100%', padding: '15px 0' }}>
          {options.timer && (
            <h1>
              {minutes}m : {seconds}s
            </h1>
          )}

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
              onClick={startRound}
            >
              <Button>{newRound ? RUN_ROUND : RESTART_ROUND}</Button>
            </span>
            {!newRound && nextIssue && (
              <span
                style={{
                  margin: '5px',
                }}
                onClick={startNewRound}
              >
                <Button>Next Issue</Button>
              </span>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default RoundControl;
