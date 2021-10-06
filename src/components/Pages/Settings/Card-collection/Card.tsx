import React, { FC, useContext, useMemo, useState } from 'react';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  deleteCard,
  editCard,
  editIssue,
  selectUser,
  updateUser,
} from 'src/store/usersSlice';
import styles from './Card-collection.module.scss';
import ICard from '../../../../interfaces/card';
import SocketContext from '../../../../shared/SocketContext';
import Issue from '../../../../interfaces/issue';
import User from '../../../../interfaces/user';

interface CardProps {
  card: ICard;
  width?: string;
  isSettingsPage: boolean;
  currentIssue?: Issue;
  isUpdate?: boolean;
  setIsUpdate?: (item: any) => void;
  isGameStarted?: boolean;
}

const Card: FC<CardProps> = ({
  card,
  width = '100px',
  isSettingsPage,
  isUpdate,
  setIsUpdate,
  currentIssue,
  isGameStarted,
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
    if (!isSettingsPage && !user?.isObserver && isGameStarted) {
      const newIssue = { ...currentIssue };
      const vote = {
        ...card,
        userId: user?.userId,
      };

      if (newIssue?.votes) {
        const arr = [...newIssue?.votes];

        if (isUpdate) {
          const voteIndex = newIssue.votes.findIndex(
            (item) => item?.userId === user?.userId,
          );
          if (voteIndex !== -1) {
            arr[voteIndex] = vote;
          }
        } else {
          arr?.push(vote);
        }

        Object.assign(newIssue, { votes: arr });

        socket?.emit(
          'update user',
          { ...user, status: card.cardValue },
          user?.room,
          (newUser: User) => {
            dispatch(updateUser(newUser));
          },
        );

        socket?.emit(
          'issue update',
          newIssue,
          user?.room,
          (newIssueData: Issue) => {
            setIsUpdate?.(true);
            dispatch(editIssue(newIssueData));
          },
        );
      }
    }
  };

  const vote = useMemo(() => {
    return currentIssue?.votes.find((item) => item.userId === user?.userId);
  }, [currentIssue?.votes, user?.userId]);

  return (
    <div
      onClick={clickCard}
      className={`${styles.card__wrapper} ${
        vote?.id === card.id && !isSettingsPage
          ? styles.card__wrapperActive
          : ''
      }`}
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
