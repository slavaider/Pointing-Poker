import React, { FC } from 'react';
import ScoreCard from './ScoreCard';
import PlayerCard from '../../../PlayerCard';
import { useAppSelector } from '../../../../hooks';
import { selectUser, selectUsers } from '../../../../store/usersSlice';
import stiles from './ScoreCard.module.scss';

const ScoreCardCollection: FC = () => {
  // todo получить данные (карточки игроков)
  //  и установить соответствующие значения карт(оценок)
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
            <ScoreCard value={'12'} />
            <PlayerCard
              {...currentUser}
              key={currentUser.userId}
              ItIsYou={currentUser.userId === user?.userId}
              isMaster={currentUser.isMaster}
              size="mini"
            />
          </div>
        );
      })}
    </>
  );
};

export default ScoreCardCollection;
