import React, { FC } from 'react';
import PlayerCard from '../../../PlayerCard';
import styles from './Scram-master.module.scss';
import IUser from '../../../../interfaces/user';

type ScamMasterProps = {
  userId: string | null;
  item: IUser | undefined;
};
const ScramMaster: FC<ScamMasterProps> = ({
  item,
  userId,
}: ScamMasterProps) => {
  return (
    <div>
      <h4 className={styles.ScramMaster_Title}>Scram master: </h4>
      <PlayerCard
        FirstName={item?.firstName as string}
        LastName={item?.lastName}
        position={item?.job}
        ItIsYou={item?.userId === userId}
        isMaster={item?.isMaster}
        avatarSrc={item?.image}
      />
    </div>
  );
};

export default ScramMaster;
