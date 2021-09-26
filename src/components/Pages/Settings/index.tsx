import React, { FC } from 'react';
import styles from './Settings.module.scss';
import TitleServer from './Title-Spring';
import ScramMaster from './Scram-master';
import LinkToLobby from './Link-to-lobby';
import GameControl from './Game-control';
import TeamMembers from './Team-members';
import { MembersProps } from './Team-members/Team-members';
import Issues from './Issues';
import GameSettings from './Game-settings';
import CardCollection from './Card-collection';
import { CardData } from './Card-collection/Card-collection';

// todo удалить , заменить на данные из сервера socket      или нет)
export const title =
  'Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)';
//
// todo получаем массив с командой
export const membersArr: MembersProps[] = [
  {
    id: 1,
    FirstName: 'David',
    LastName: 'Blane',
    position: 'senior',
  },
  {
    id: 2,
    FirstName: 'Dayana',
    LastName: 'Ross',
    position: 'junior',
    ItIsYou: true,
  },
  {
    id: 3,
    FirstName: 'Daniel',
    LastName: 'dsw',
    position: 'led',
  },
  {
    id: 4,
    FirstName: 'Fill',
    position: 'QA',
  },
];

const cardData: CardData[] = [
  { cardValue: 'undefined', cardStatisticValue: '', issueId: 123 },
  { cardValue: 13, cardStatisticValue: '', issueId: 123 },
];

const Settings: FC = () => {
  return (
    <div className={styles.SettingsContainer}>
      <TitleServer title={title} isSettingsPage />
      <ScramMaster />
      <LinkToLobby linkToLobby={'http://pockerplanning.c...'} />
      <GameControl />
      <TeamMembers membersArr={membersArr} />
      <Issues isMaster />
      <GameSettings />
      <CardCollection isSettingsPage cardData={cardData} />
    </div>
  );
};

export default Settings;
