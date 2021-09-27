import React, {FC} from 'react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from 'src/hooks';
import {v4} from 'uuid';
import styles from './Card-collection.module.scss';
import Card from './Card';
import stylesPage from '../Settings.module.scss';
import {addCard, selectCards, selectOptions,} from '../../../../store/usersSlice';


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

  const addNewCard = () => {
    const newCardData = {
      cardValue: 0,
      cardTitle: options.scoreTypeShort,
      id: v4(),
    };
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
        {cards.map((card) => (
          <> <Card
            isSettingsPage={isSettingsPage}
            card={card}
            key={card.id}
            width={cardWidth}
          />
            {!isSettingsPage && (
              <div className={styles.cardStatisticValue}>
                {card.cardStatisticValue}
              </div>
            )}
          </>
        ))}
        {isSettingsPage && (
          <div
            onClick={addNewCard}
            style={{cursor: 'pointer', width: '98px'}}
            className={styles.card__wrapper}
          >
            <div style={{margin: 'auto'}} className={styles.card__title}>
              <PlusCircleOutlined style={{transform: 'scale(2)'}}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardCollection;
