import React, { FC, useContext, useState } from 'react';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  deleteCard,
  editCard,
  editIssue,
  selectUser,
} from 'src/store/usersSlice';
import styles from './Card-collection.module.scss';
import ICard from '../../../../interfaces/card';
import SocketContext from '../../../../shared/SocketContext';
import Issue from '../../../../interfaces/issue';

interface CardProps {
  card: ICard;
  width?: string;
  isSettingsPage: boolean;
  currentIssue?: Issue;
}

const Card: FC<CardProps> = ({
  card,
  width = '100px',
  isSettingsPage,
  currentIssue,
}: CardProps) => {
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { cardTitle, cardValue, id } = card;
  const user = useAppSelector(selectUser);
  const socket = useContext(SocketContext);

  const color = isModeEdit ? 'darkblue' : '#000';

  const editMode = () => {
    setIsModeEdit(true);
  };

  const removeCard = () => {
    socket?.emit('card remove', id, user?.room, (idResponse: string) => {
      dispatch(deleteCard(idResponse));
    });
  };

  const onClick = () => {
    const inputValue = +(document.getElementById(id) as HTMLInputElement).value;
    if (!Number.isNaN(inputValue)) {
      const newCard = {
        ...card,
        cardValue: inputValue,
      };
      socket?.emit(
        'card update',
        newCard,
        user?.room,
        (cardResponse: string) => {
          dispatch(editCard(cardResponse));
        },
      );
    }
    setIsModeEdit(false);
  };
  const clickCard = () => {
    if (!isSettingsPage && !user?.isObserver) {
      currentIssue?.votes.push({
        ...card,
        userId: user?.userId,
        issueId: currentIssue?.id,
      });
      socket?.emit(
        'issue update',
        currentIssue,
        user?.room,
        (issueData: Issue) => {
          dispatch(editIssue(issueData));
        },
      );
    }
  };

  return (
    <div
      onClick={clickCard}
      className={styles.card__wrapper}
      style={{ width, cursor: isSettingsPage ? 'default' : 'pointer' }}
    >
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
            <EditOutlined className={styles.button__edit} onClick={editMode} />
          )}

          {isSettingsPage && isModeEdit && (
            <CheckOutlined className={styles.button__edit} onClick={onClick} />
          )}
          {isSettingsPage && (
            <DeleteOutlined
              className={styles.button__delete}
              onClick={removeCard}
            />
          )}
        </div>
      </div>
      <div className={styles.card__title}>{cardTitle}</div>
      <span className={styles.cardVal__bottom}>{cardValue}</span>
    </div>
  );
};

export default Card;
