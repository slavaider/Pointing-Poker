import React, { FC, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './SettingsIssuesCard.module.scss';
import ModalIssues from './Issues-modal';
import { removeIssue } from 'src/store/counterSlice';
import { useAppDispatch } from 'src/hooks';

interface SettingsIssuesCardProps {
  cardTitle: string;
  priority: string;
  linkToIssue: string;
  id: number;
}

const SettingsIssuesCard: FC<SettingsIssuesCardProps> = ({
  cardTitle,
  priority,
  linkToIssue,
  id
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isModalSet = () => { setIsModalVisible(false); };
  const dispatch = useAppDispatch();
  const issueEdit = () => {
    setIsModalVisible(true);
  };
  const issueRemove = (value: number) => {
    dispatch(removeIssue(value));
  };

  return (
    <div>
      < div className={styles.card__wrapper} >
        <div className={styles.card__text_wrapper}>
          <a href={linkToIssue} className={styles.card__title}>
            {cardTitle}
          </a>
          <span className={styles.card__text_priority}>{priority} priority</span>
        </div>
        <div>
          <span className={styles.button__edit}>
            <EditOutlined onClick={() => { issueEdit(); }}
            />
          </span>
          <span className={styles.button__delete}>
            <DeleteOutlined onClick={() => { issueRemove(id); }} style={{ color: 'red' }} />
          </span>
        </div>
      </div >
      {
        isModalVisible
          ? <ModalIssues
            isModal={isModalVisible}
            isModalSet={isModalSet}
            props={{
              cardTitle: cardTitle,
              priority: priority,
              linkToIssue: linkToIssue,
              id: id,
            }}
            issueMode='edit'
            modalTitle='Edit Issue'
          />
          : ''
      }
    </div>
  );
};

export default SettingsIssuesCard;
