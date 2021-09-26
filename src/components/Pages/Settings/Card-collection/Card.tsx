import React, { FC, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { useAppDispatch } from 'src/hooks';
import { deleteCard, editCard } from 'src/store/counterSlice';
import styles from './Card-collection.module.scss';

interface CardProps {
  cardData: {
    cardValue: number;
    cardTitle: string;
    id: number;
  };
}
const Card: FC<CardProps> = (props) => {
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { cardValue, cardTitle, id } = props.cardData;
  const editMode = () => {
    setIsModeEdit(true);
  };

  const removeCard = () => {
    dispatch(deleteCard(id));
  };

  const onClick = () => {
    const inputValue = +(document.getElementById(`${id}`) as HTMLInputElement)
      .value;
    props.cardData.cardValue = inputValue;
    dispatch(editCard(props.cardData));
    setIsModeEdit(false);
  };

  return (
    <>
      <div className={styles.card__wrapper}>
        <div className={styles.cardVal__top}>
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
        </div>
        <div className={styles.card__title}>{cardTitle}</div>
        <span className={styles.cardVal__bottom}>{cardValue}</span>
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
          ''
        )}
      </div>
    </>
  );
};

export default Card;
