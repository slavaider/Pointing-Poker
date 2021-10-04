import React, { FC } from 'react';
import ScoreCard from './ScoreCard';
import PlayerCard from '../../../PlayerCard';
import { useAppSelector } from '../../../../hooks';
import { selectUser, selectUsers } from '../../../../store/usersSlice';
import stiles from './ScoreCard.module.scss';

const ScoreCardCollection: FC = () => {
  const user = useAppSelector(selectUser);
  const users = useAppSelector(selectUsers);

  // todo delete
  const issueId = 'fddfeeesfdfef';

  return (
    <>
      {users.map((currentUser) => {
        return (
          // todo
          //  get issueId + value in ScoreCard
          //
          <div key={currentUser.userId + issueId} className={stiles.wrapper}>
            <ScoreCard value={currentUser.status} />
            <PlayerCard
              {...currentUser}
              key={currentUser.userId}
              isItYou={currentUser.userId === user?.userId}
              isMaster={currentUser.isMaster}
              size="max"
            />
          </div>
        );
      })}
    </>
  );
};

export default ScoreCardCollection;
