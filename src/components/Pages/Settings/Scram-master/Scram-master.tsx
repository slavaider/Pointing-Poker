import React, { FC } from 'react';
import PlayerCard from '../../../PlayerCard';
import styles from './Scram-master.module.scss';

const ScramMaster: FC = () => {
  return (
    <div>
      <h4 className={styles.ScramMaster_Title}>Scram master: </h4>
      <PlayerCard
        FirstName={'Jo'}
        LastName={'Lee'}
        position={'Lead'}
        ItIsYou={true}
        isMaster={true}
      />
    </div>
  );
};

export default ScramMaster;
