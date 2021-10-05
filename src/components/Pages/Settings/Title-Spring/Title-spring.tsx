import React, { FC, useState } from 'react';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './TitleSpring.module.scss';

interface TitleSpringInterface {
  title: string;
  isSettingsPage?: boolean;
}

const TitleSpring: FC<TitleSpringInterface> = ({
  title,
  isSettingsPage = false,
}: TitleSpringInterface) => {
  const [contentEditable, setContentEditable] = useState(false);

  const color = contentEditable ? 'darkblue' : '#000';

  return (
    <div className={styles.titleSpring}>
      <div
        contentEditable={contentEditable}
        ref={(div) => div?.focus()}
        style={{ color }}
      >
        {title}
      </div>{' '}
      {isSettingsPage && !contentEditable && (
        <EditOutlined
          style={{ marginLeft: '15px' }}
          key="edit"
          onClick={() => {
            setContentEditable(true);
          }}
        />
      )}
      {isSettingsPage && contentEditable && (
        <CheckOutlined
          style={{ marginLeft: '15px' }}
          key="check"
          onClick={() => setContentEditable(false)}
        />
      )}
    </div>
  );
};

export default TitleSpring;
