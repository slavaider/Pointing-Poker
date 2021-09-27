import React, { FC } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { v4 } from 'uuid';
import styles from './Card-collection.module.scss';
import Card from './Card';
import stylesPage from '../Settings.module.scss';
import {
  selectCards,
  selectOptions,
  addCard,
} from '../../../../store/usersSlice';

export type Props = {
  isSettingsPage: boolean;
};

const CardCollection: FC<Props> = ({ isSettingsPage }: Props) => {
  const cards = useAppSelector(selectCards);
  const options = useAppSelector(selectOptions);

  const dispatch = useAppDispatch();

  const addNewCard = () => {
    const newCardData = {
      cardValue: 0,
      cardTitle: options.scoreTypeShort,
      id: v4(),
    };
    dispatch(addCard(newCardData));
  };

  console.log(isSettingsPage);

  return (
    <>
      <h4 className={stylesPage.title}>Add card values:</h4>
      <div id="cardsContainer" className={styles.cards__container}>
        {cards.map((card) => (
          <Card card={card} key={card.id} />
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
    </>
  );
};

export default CardCollection;
