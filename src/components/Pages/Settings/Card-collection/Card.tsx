import React, { FC, useState } from 'react';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useAppDispatch } from 'src/hooks';
import { deleteCard, editCard } from 'src/store/usersSlice';
import styles from './Card-collection.module.scss';
import ICard from '../../../../interfaces/card';

interface CardProps {
  card: ICard;
  width?: string;
  isSettingsPage: boolean;
}

const Card: FC<CardProps> = ({
  card,
  width = '100px',
  isSettingsPage,
}: CardProps) => {
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { cardTitle, cardValue, id } = card;

  const color = isModeEdit ? 'darkblue' : '#000';

  const editMode = () => {
    setIsModeEdit(true);
  };

  const removeCard = () => {
    dispatch(deleteCard(id));
  };

  const onClick = () => {
    const inputValue = +(document.getElementById(id) as HTMLInputElement).value;
    if (!Number.isNaN(inputValue)) {
      dispatch(
        editCard({
          ...card,
          cardValue: inputValue,
        }),
      );
    }
    setIsModeEdit(false);
  };

  return (
    <>
      <div className={styles.card__wrapper} style={{ width }}>
        <div className={styles.cardVal__top}>
          {isModeEdit ? (
            <Input
              id={id}
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
          <div style={{ display: 'flex' }}>
            {isSettingsPage && !isModeEdit && (
              <EditOutlined
                className={styles.button__edit}
                onClick={editMode}
              />
            )}

            {isSettingsPage && isModeEdit && (
              <CheckOutlined
                className={styles.button__edit}
                onClick={onClick}
              />
            )}
            <DeleteOutlined
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
