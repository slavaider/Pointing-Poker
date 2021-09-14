import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import styles from './TitleSpring.module.scss';

interface TitleSpringInterface {
  title: string;
}

const TitleSpring: FC<TitleSpringInterface> = ({
  title,
}: TitleSpringInterface) => {
  return (
    <div className={styles.titleSpring}>
      <span>{title}</span>{' '}
      <EditOutlined style={{ marginLeft: '15px' }} key="edit" />
    </div>
  );
};

export default TitleSpring;
