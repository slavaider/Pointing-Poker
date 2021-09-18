import React, { FC } from 'react';
import PlayerCard from '../../../PlayerCard';
import { PlayerCardProps } from '../../../PlayerCard/PlayerCard';
import styles from './Team-members.module.scss';
import stylesPage from '../Settings.module.scss';
import IUser from '../../../../interfaces/user';

export interface MembersProps extends PlayerCardProps {
  id: string | number;
}
type TeamMembersProps = {
  items: IUser[];
  userId: string | null;
};

const TeamMembers: FC<TeamMembersProps> = ({
  items,
  userId,
}: TeamMembersProps) => {
  return (
    <section>
      <h4 className={stylesPage.title}>Members:</h4>

      <div className={styles.cardWrapper}>
        {items.map((item) => {
          return (
            <PlayerCard
              key={item.userId}
              FirstName={item.firstName}
              position={item.job}
              ItIsYou={item.userId === userId}
              isMaster={item.isMaster}
              LastName={item.lastName}
              avatarSrc={item.image}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TeamMembers;
