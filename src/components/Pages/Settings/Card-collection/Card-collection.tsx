import React, { FC } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { addCard } from 'src/store/counterSlice';
import styles from './Card-collection.module.scss';
import Card from './Card';
import stylesPage from '../Settings.module.scss';

export interface Cards {
  cardValue: number | string;
  cardTitle: string;
  cardStatisticValue: string | number;
  id: number;
}
export type Props = {
  isSettingsPage?: boolean;
  cardWidth?: string;
};

const CardCollection: FC<Props> = ({
  isSettingsPage = true,
  cardWidth,
}: Props) => {
  const cards: Array<Cards> = useAppSelector((state) => state.settings.cards);
  const dispatch = useAppDispatch();
  const idLastCard = cards.length > 0 ? cards[cards.length - 1].id : 0;

  const addNewCard = () => {
    const newCardData = {
      cardValue: 0,
      cardTitle: 'SP',
      id: idLastCard + 1,
    };
    console.log(newCardData);
    dispatch(addCard(newCardData));
  };

  return (
    <>
      {isSettingsPage ? (
        <h4 className={stylesPage.title}>Add card values:</h4>
      ) : (
        <h4 className={stylesPage.title}> Statistics:</h4>
      )}

      <div id="cardsContainer" className={styles.cards__container}>
        {cards.map((item, index) => (
          <>
            <Card
              isSettingsPage={isSettingsPage}
              cardData={{
                cardValue: item.cardValue,
                cardTitle: item.cardTitle,
                id: item.id,
              }}
              width={cardWidth}
              key={`${item.cardValue}-${index}`}
            />
            {!isSettingsPage && (
              <div className={styles.cardStatisticValue}>
                {item.cardStatisticValue}
              </div>
            )}
          </>
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
