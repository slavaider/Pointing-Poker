import React, { FC, useContext, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { removeIssue, selectUser } from 'src/store/usersSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import styles from './SettingsIssuesCard.module.scss';
import ModalIssues from './Issues-modal';
import Issue from '../../../../interfaces/issue';
import SocketContext from '../../../../shared/SocketContext';

const SettingsIssuesCard: FC<Issue> = ({
  cardTitle,
  priority,
  linkToIssue,
  id,
}: Issue) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const socket = useContext(SocketContext);

  const issueRemove = (issueId: string) => {
    socket?.emit('issue remove', issueId, user?.room, (idResponse: string) => {
      dispatch(removeIssue(idResponse));
    });
  };

  return (
    <>
      <div className={styles.card__wrapper}>
        <div className={styles.card__text_wrapper}>
          <a href={linkToIssue} className={styles.card__title}>
            {cardTitle}
          </a>
          <span className={styles.card__text_priority}>
            {priority} priority
          </span>
        </div>
        <div>
          <span className={styles.button__edit}>
            <EditOutlined
              onClick={() => {
                setIsModalVisible(true);
              }}
            />
          </span>
          <span className={styles.button__delete}>
            <DeleteOutlined
              onClick={() => {
                issueRemove(id);
              }}
            />
          </span>
        </div>
      </div>
      {isModalVisible ? (
        <ModalIssues
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          issue={{
            cardTitle,
            priority,
            linkToIssue,
            id,
          }}
          issueMode="edit"
          modalTitle="Edit Issue"
        />
      ) : (
        ''
      )}
    </>
  );
};

export default SettingsIssuesCard;
