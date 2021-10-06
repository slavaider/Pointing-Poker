import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';
import Button from '../../../Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  changeStatus,
  selectOptions,
  selectUser,
  selectUsers,
  updateUser,
} from '../../../../store/usersSlice';
import Issue from '../../../../interfaces/issue';
import User from '../../../../interfaces/user';
import SocketContext from '../../../../shared/SocketContext';

const RUN_ROUND = 'Run Round';
const RESTART_ROUND = 'Restart Round';

export type RoundControlProps = {
  currentIssue?: Issue;
  nextIssue?: Issue;
  setIndex: (prevValue: any) => void;
  setIsGameStarted: (prevValue: any) => void;
  setIsUpdate: (prevValue: any) => void;
};

const RoundControl: FC<RoundControlProps> = ({
  currentIssue,
  nextIssue,
  setIndex,
  setIsUpdate,
  setIsGameStarted,
}: RoundControlProps) => {
  const [newRound, setNewRound] = useState(true);
  const user = useAppSelector(selectUser);
  const users = useAppSelector(selectUsers);
  const options = useAppSelector(selectOptions);
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

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

  const { seconds, minutes, resume, isRunning, pause, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });

  const startRound = () => {
    if (newRound) {
      resume();
    } else {
      restart(getTime());
    }

    if (user?.isMaster)
      socket?.emit(
        'change status',
        users,
        user?.room,
        'progress',
        (usersData: User[]) => {
          dispatch(changeStatus({ users: usersData, status: 'progress' }));
        },
      );

    setNewRound(false);
  };

  useEffect(() => {
    if (!isRunning && user?.isMaster) {
      socket?.emit(
        'change status',
        users,
        user?.room,
        'idle',
        (usersData: User[]) => {
          dispatch(changeStatus({ users: usersData, status: 'idle' }));
        },
      );
    }
  }, [dispatch, isRunning, socket]);

  useEffect(() => {
    if (user?.status === 'progress') {
      startRound();
      setIsUpdate(false);
    }
  }, [user?.status]);

  const startNewRound = () => {
    restart(getTime());
    pause();
    setIndex((prevIndex: number) => {
      socket?.emit(
        'update user',
        { ...user, currentIssueIndex: prevIndex + 1, status: 'idle' },
        user?.room,
        (newUser: User) => {
          dispatch(updateUser(newUser));
        },
      );

      return prevIndex + 1;
    });
    setNewRound(() => true);
  };

  useEffect(() => {
    setIsGameStarted(isRunning);
  }, [isRunning, setIsGameStarted]);

  return (
    <>
      {currentIssue ? (
        <div style={{ maxWidth: '470px', width: '100%', padding: '15px 0' }}>
          {options.timer && (
            <h1>
              {minutes}m : {seconds}s
            </h1>
          )}

          {user?.isMaster && (
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
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default RoundControl;
