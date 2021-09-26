import React, { FC, useState } from 'react';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useAppDispatch } from 'src/hooks';
import { deleteCard, editCard } from 'src/store/counterSlice';
import styles from './Card-collection.module.scss';

interface CardProps {
  cardData: {
    cardTitle: string;
    id: number;
    cardValue: string | number;
  };
  width?: string;
  isSettingsPage: boolean;
}

const Card: FC<CardProps> = ({ width = '100px', isSettingsPage, cardData }) => {
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { cardTitle, id } = cardData;
  let { cardValue } = cardData;
  const color = isModeEdit ? 'darkblue' : '#000';

  const editMode = () => {
    setIsModeEdit(true);
  };

  const removeCard = () => {
    dispatch(deleteCard(id));
  };

  const onClick = () => {
    // Input value
    cardValue = (document.getElementById(`${id}`) as HTMLInputElement).value;
    dispatch(editCard({ ...cardData, cardValue }));
    setIsModeEdit(false);
  };

  //
  // todo для чего фрагмент
  //

  return (
    <>
      <div className={styles.card__wrapper} style={{ width }}>
        <div className={styles.cardVal__top}>
          {isModeEdit ? (
            <Input
              id={`${id}`}
              className={styles.input__edit_card}
              defaultValue={cardValue}
              maxLength={5}
              autoFocus
              bordered={false}
              style={{ color }}
            />
          ) : (
            <span style={{ color }}>{cardValue}</span>
          )}
          {console.log('isSettingsPage', isSettingsPage)}
          <div style={{ display: 'flex' }}>
            {isSettingsPage && !isModeEdit && (
              <EditOutlined
                className={styles.button__edit}
                key={`edit - ${id}`}
                onClick={editMode}
              />
            )}

            {isSettingsPage && isModeEdit && (
              <CheckOutlined
                className={styles.button__edit}
                key={`check - ${id}`}
                onClick={onClick}
              />
            )}
            <DeleteOutlined
              key={`delete - ${id}`}
              className={styles.button__delete}
              onClick={removeCard}
            />
          </div>
        </div>
        <div className={styles.card__title}>{cardTitle}</div>
        <span className={styles.cardVal__bottom}>{cardValue}</span>
      </div>
    </>
  );
};

export default Card;
