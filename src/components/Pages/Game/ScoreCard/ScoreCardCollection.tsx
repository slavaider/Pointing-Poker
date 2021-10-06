import React, { FC } from 'react';
import { v4 } from 'uuid';
import ScoreCard from './ScoreCard';
import PlayerCard from '../../../PlayerCard';
import { useAppSelector } from '../../../../hooks';
import { selectUser, selectUsers } from '../../../../store/usersSlice';
import stiles from './ScoreCard.module.scss';

const ScoreCardCollection: FC = () => {
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);

  return (
    <>
      {users.map((currentUser) => {
        return (
          <div key={currentUser.userId + v4()} className={stiles.wrapper}>
            <ScoreCard value={currentUser.status} />
            <PlayerCard
              {...currentUser}
              key={currentUser.userId}
              isItYou={currentUser.userId === user?.userId}
              isMaster={currentUser.isMaster}
              size="score"
            />
          </div>
        );
      })}
    </>
  );
};

export default ScoreCardCollection;
