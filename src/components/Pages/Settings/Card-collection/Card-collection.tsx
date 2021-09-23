import React, { FC } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './Card-collection.module.scss';
import Card from './Card';
import stylesPage from '../Settings.module.scss';

export interface CardData {
  issueId: string | number;
  cardValue: string | number;
  cardStatisticValue: string | number;
}
interface CardCollectionProps {
  cardWidth?: string;
  isSettingsPage: boolean;
  cardData: CardData[];
}

const CardCollection: FC<CardCollectionProps> = ({
  cardWidth,
  isSettingsPage,
  cardData,
}) => {
  // todo использоовать для изменения значения
  // const [valueCard, setValueCard] = useState<string>('1');

  const addNewCard = () => {
    console.log('a');
  };

  return (
    <div style={{ width: 'fit-content' }}>
      {isSettingsPage ? (
        <h4 className={stylesPage.title}>Add card values:</h4>
      ) : (
        <h4 className={stylesPage.title}> Statistics:</h4>
      )}

      <div id={'cardsContainer'} className={styles.cardsContainer}>
        {cardData.map(({ issueId, cardStatisticValue, cardValue }) => {
          return (
            <div key={`${issueId} ${cardValue}`}>
              <Card
                width={cardWidth}
                cardValue={cardValue}
                isSettingsPage={isSettingsPage}
              />
              {!isSettingsPage && (
                <div className={styles.cardStatisticValue}>
                  {cardStatisticValue}
                </div>
              )}
            </div>
          );
        })}

        {isSettingsPage && (
          <div
            onClick={addNewCard}
            className={styles.cardWrapper}
            style={{ cursor: 'pointer', width: '98px' }}
          >
            <div style={{ margin: 'auto' }} className={styles.cardTitle}>
              <PlusCircleOutlined style={{ transform: 'scale(2)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCollection;
