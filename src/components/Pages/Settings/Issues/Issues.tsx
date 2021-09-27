import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from 'src/hooks';
import { v4 } from 'uuid';
import SettingsIssuesCard from './SettingsIssuesCard';
import ModalIssues from './Issues-modal';
import styles from './Issues.module.scss';
import stylesPage from '../Settings.module.scss';
import { selectIssues } from '../../../../store/usersSlice';

interface IssuesProps {
  isMaster?: boolean;
  width?: string;
}

const Issues: FC<IssuesProps> = ({ isMaster = false, width }) => {
  const issues = useAppSelector(selectIssues);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onClick = () => {
    setIsModalVisible(true);
  };

  return (
    <div style={{ width }}>
      {isMaster && <h4 className={stylesPage.title}>Issues:</h4>}
      <div className={styles.container}>
        {issues.map((item) => (
          <SettingsIssuesCard {...item} key={item.id} />
        ))}
        <button className={styles.card__wrapper_new__issue} onClick={onClick}>
          Create new Issue
          <PlusOutlined />
        </button>
      </div>
      {isModalVisible ? (
        <ModalIssues
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          issue={{
            cardTitle: '',
            priority: 'Low',
            linkToIssue: '',
            id: v4(),
          }}
          issueMode="create"
          modalTitle="Create Issue"
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Issues;
