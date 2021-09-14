import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import styles from './Card-collection.module.scss';

const Card: FC = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardVal__top}>
        <span>13</span>
        <EditOutlined style={{ marginLeft: '5px' }} key="edit" />
      </div>
      <div className={styles.cardTitle}>SP</div>
      <div className={styles.cardVal__bottom}>13</div>
    </div>
  );
};

export default Card;
