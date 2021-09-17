import React, { FC } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './Card-collection.module.scss';
import Card from './Card';
import stylesPage from '../Settings.module.scss';

const CardCollection: FC = () => {
  // todo использоовать для изменения значения
  // const [valueCard, setValueCard] = useState<string>('1');

  const addNewCard = () => {
    console.log('a');
  };

  return (
    <div>
      <h4 className={stylesPage.title}>Add card values:</h4>

      <div id={'cardsContainer'} className={styles.cardsContainer}>
        <Card />

        <div
          onClick={addNewCard}
          style={{ cursor: 'pointer' }}
          className={styles.cardWrapper}
        >
          <div style={{ margin: 'auto' }} className={styles.cardTitle}>
            <PlusCircleOutlined style={{ transform: 'scale(2)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCollection;
