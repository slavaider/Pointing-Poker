import React, { FC, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { removeIssue } from 'src/store/usersSlice';
import { useAppDispatch } from 'src/hooks';
import styles from './SettingsIssuesCard.module.scss';
import ModalIssues from './Issues-modal';
import Issue from '../../../../interfaces/issue';

const SettingsIssuesCard: FC<Issue> = ({
  cardTitle,
  priority,
  linkToIssue,
  id,
}: Issue) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const issueRemove = (value: string) => {
    dispatch(removeIssue(value));
  };

  return (
    <div>
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
    </div>
  );
};

export default SettingsIssuesCard;
