import React, { FC } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { addCard } from 'src/store/counterSlice';
import styles from './Card-collection.module.scss';
import Card from './Card';
import stylesPage from '../Settings.module.scss';

interface cards {
  cardValue: number;
  cardTitle: string;
  id: number;
}

const CardCollection: FC<cards> = () => {
  const cards: Array<cards> = useAppSelector((state) => state.settings.cards);
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
    <div>
      <h4 className={stylesPage.title}>Add card values:</h4>
      <div id="cardsContainer" className={styles.cards__container}>
        {cards.map((item, index) => (
          <Card
            cardData={{
              cardValue: item.cardValue,
              cardTitle: item.cardTitle,
              id: item.id,
            }}
            key={`${item.cardValue}-${index}`}
          />
        ))}
        <div style={{ cursor: 'pointer' }} className={styles.card__wrapper}>
          <div style={{ margin: 'auto' }} className={styles.card__title}>
            <PlusCircleOutlined
              style={{ transform: 'scale(2)' }}
              onClick={addNewCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCollection;
