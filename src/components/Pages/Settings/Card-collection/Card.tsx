import React, { FC, useState } from 'react';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './Card-collection.module.scss';

interface CardProps {
  width?: string;
  cardValue?: string | number;
  isSettingsPage: boolean;
}

const Card: FC<CardProps> = ({
  width = '98px',
  cardValue = 13,
  isSettingsPage,
}) => {
  const [contentEditable, setContentEditable] = useState(false);

  const color = contentEditable ? 'darkblue' : '#000';

  return (
    <div className={styles.cardWrapper} style={{ width }}>
      <div className={styles.cardVal__top}>
        <span
          contentEditable={contentEditable}
          ref={(div) => div?.focus()}
          style={{ color }}
        >
          {cardValue}
        </span>

        {isSettingsPage && !contentEditable && (
          <EditOutlined
            style={{ marginLeft: '5px' }}
            key="edit"
            onClick={() => {
              setContentEditable(true);
            }}
          />
        )}

        {isSettingsPage && contentEditable && (
          <CheckOutlined
            style={{ marginLeft: '5px' }}
            key="check"
            onClick={() => setContentEditable(false)}
          />
        )}
      </div>
      <div className={styles.cardTitle}>SP</div>
      <div className={styles.cardVal__bottom}>{cardValue}</div>
    </div>
  );
};

export default Card;
