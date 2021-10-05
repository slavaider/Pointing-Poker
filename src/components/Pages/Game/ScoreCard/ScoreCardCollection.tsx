import React, { FC, useMemo } from 'react';
import ScoreCard from './ScoreCard';
import PlayerCard from '../../../PlayerCard';
import { useAppSelector } from '../../../../hooks';
import { selectUser, selectUsers } from '../../../../store/usersSlice';
import stiles from './ScoreCard.module.scss';
import Issue from '../../../../interfaces/issue';

export type ScoreProps = {
  currentIssue?: Issue;
};

const ScoreCardCollection: FC<ScoreProps> = ({ currentIssue }: ScoreProps) => {
  const user = useAppSelector(selectUser);
  const users = useAppSelector(selectUsers);

  const vote = useMemo(() => {
    return currentIssue?.votes.find((item) => item?.userId === user?.userId);
  }, [currentIssue?.votes, user?.userId]);

  return (
    <>
      {users.map((currentUser) => {
        return (
          <div
            key={currentUser.userId + vote?.issueId}
            className={stiles.wrapper}
          >
            <ScoreCard value={vote ? vote.value : currentUser.status} />
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
