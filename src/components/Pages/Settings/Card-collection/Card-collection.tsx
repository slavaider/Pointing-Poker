import React, { FC, memo, useContext } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { v4 } from 'uuid';
import styles from './Card-collection.module.scss';
import Card from './Card';
import ICard from '../../../../interfaces/card';
import stylesPage from '../Settings.module.scss';
import {
  addCard,
  selectOptions,
  selectUser,
} from '../../../../store/usersSlice';
import SocketContext from '../../../../shared/SocketContext';
import Vote from '../../../../interfaces/vote';

export type Props = {
  isSettingsPage?: boolean;
  isVotes?: boolean;
  cardWidth?: string;
  items: Vote[] | ICard[];
};

const CardCollection: FC<Props> = ({
  isSettingsPage = true,
  cardWidth,
  isVotes = false,
  items,
}: Props) => {
  const options = useAppSelector(selectOptions);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const user = useAppSelector(selectUser);

  const addNewCard = () => {
    const CardData = {
      cardValue: 0,
      cardTitle: options.scoreTypeShort,
      id: v4(),
    };
    socket?.emit('send card', CardData, user?.room, (card: ICard[]) => {
      dispatch(addCard(card));
    });
  };

  let title = 'Game';
  if (isSettingsPage && isVotes) {
    title = 'Statistics:';
  }
  if (isSettingsPage) {
    title = 'Add card values:';
  }

  return (
    <>
      <h4 className={stylesPage.title}>{title}</h4>

      <div id="cardsContainer" className={styles.cards__container}>
        {items.map((card) => (
          <React.Fragment key={card.id}>
            <Card
              isSettingsPage={isSettingsPage}
              card={card}
              width={cardWidth}
            />
            {!isSettingsPage && isVotes && (
              <div className={styles.cardStatisticValue}>{card.cardValue}</div>
            )}
          </React.Fragment>
        ))}
        {isSettingsPage && (
          <div
            onClick={addNewCard}
            style={{ cursor: 'pointer', width: '98px' }}
            className={styles.card__wrapper}
          >
            <div style={{ margin: 'auto' }} className={styles.card__title}>
              <PlusCircleOutlined style={{ transform: 'scale(2)' }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CardCollection);
