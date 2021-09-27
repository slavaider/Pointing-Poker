import React, { FC, useContext } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { v4 } from 'uuid';
import styles from './Card-collection.module.scss';
import Card from './Card';
import ICard from '../../../../interfaces/card';
import stylesPage from '../Settings.module.scss';
import {
  addCard,
  selectCards,
  selectOptions,
  selectUser,
} from '../../../../store/usersSlice';
import SocketContext from '../../../../shared/SocketContext';

export type Props = {
  isSettingsPage?: boolean;
  cardWidth?: string;
};

const CardCollection: FC<Props> = ({
  isSettingsPage = true,
  cardWidth,
}: Props) => {
  const cards = useAppSelector(selectCards);
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

  return (
    <>
      {isSettingsPage ? (
        <h4 className={stylesPage.title}>Add card values:</h4>
      ) : (
        <h4 className={stylesPage.title}> Statistics:</h4>
      )}

      <div id="cardsContainer" className={styles.cards__container}>
        {cards.map((card) => (
          <React.Fragment key={card.id}>
            <Card
              isSettingsPage={isSettingsPage}
              card={card}
              width={cardWidth}
            />
            {!isSettingsPage && (
              <div className={styles.cardStatisticValue}>
                {card.cardStatisticValue}
              </div>
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

export default CardCollection;
