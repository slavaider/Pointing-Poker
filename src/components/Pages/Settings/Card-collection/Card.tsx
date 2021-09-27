import React, { FC, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { useAppDispatch } from 'src/hooks';
import { deleteCard, editCard } from 'src/store/usersSlice';
import styles from './Card-collection.module.scss';
import ICard from '../../../../interfaces/card';

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({ card }: CardProps) => {
  const { cardTitle, cardValue, id } = card;
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const editMode = () => {
    setIsModeEdit(true);
  };

  const removeCard = () => {
    dispatch(deleteCard(id));
  };

  const onClick = () => {
    const inputValue = +(document.getElementById(`${id}`) as HTMLInputElement)
      .value;
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
      <div className={styles.card__wrapper}>
        <div className={styles.cardVal__top}>
          {isModeEdit ? (
            <>
              <Input
                id={`${id}`}
                className={styles.input__edit_card}
                defaultValue={cardValue}
                maxLength={3}
                autoFocus
                bordered={false}
              />
              <Button
                type="primary"
                className={styles.input__edit_button}
                onClick={onClick}
              >
                Ok
              </Button>
            </>
          ) : (
            <>
              <span>{cardValue}</span>
              <div>
                <EditOutlined
                  key={`edit - ${id}`}
                  className={styles.button__edit}
                  onClick={editMode}
                />
                <DeleteOutlined
                  key={`delete - ${id}`}
                  className={styles.button__delete}
                  onClick={removeCard}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.card__title}>{cardTitle}</div>
        <span className={styles.cardVal__bottom}>{cardValue}</span>
      </div>
    </>
  );
};

export default Card;
