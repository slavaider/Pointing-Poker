import React, { FC } from 'react';
import PlayerCard from '../../../PlayerCard';
import { PlayerCardProps } from '../../../PlayerCard/PlayerCard';
import styles from './Team-members.module.scss';
import stylesPage from '../Settings.module.scss';

export interface MembersProps extends PlayerCardProps {
  id: string | number;
}
type TeamMembersProps = {
  membersArr: MembersProps[];
};

const TeamMembers: FC<TeamMembersProps> = ({
  membersArr,
}: TeamMembersProps) => {
  return (
    <section>
      <h4 className={stylesPage.title}>Members:</h4>

      <div className={styles.cardWrapper}>
        {membersArr.map(
          ({
            FirstName,
            LastName,
            avatarSrc,
            position,
            isMaster,
            ItIsYou,
            id,
          }) => {
            return (
              <PlayerCard
                key={id}
                FirstName={FirstName}
                position={position}
                ItIsYou={ItIsYou}
                isMaster={isMaster}
                LastName={LastName}
                avatarSrc={avatarSrc}
              />
            );
          },
        )}
      </div>
    </section>
  );
};

export default TeamMembers;
