import React, { FC } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Issues.module.scss';

interface SettingsIssuesCardProps {
  cardTitle: string;
  priority: string;
  linkToIssue: string;
}

const SettingsIssuesCard: FC<SettingsIssuesCardProps> = ({
  cardTitle,
  priority,
  linkToIssue,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <div className="text-wrapper">
        <a href={linkToIssue} className={styles.cardTitle}>
          {cardTitle}
        </a>
        <span className="priority">{priority} priority</span>
      </div>
      <div>
        <span className="button">
          <EditOutlined />
        </span>
        <span className="button">
          <DeleteOutlined style={{ color: 'red' }} />
        </span>
      </div>
      <style jsx>{`
        .text-wrapper {
          display: flex;
          flex-direction: column;
        }
        .button {
          cursor: pointer;
          margin-left: 10px;
        }
        .priority {
          font-size: 10px;
          line-height: 12px;
        }
      `}</style>
    </div>
  );
};

export default SettingsIssuesCard;
