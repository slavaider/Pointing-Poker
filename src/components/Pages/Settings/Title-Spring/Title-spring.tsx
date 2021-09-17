import React, { FC, useState } from 'react';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './TitleSpring.module.scss';

interface TitleSpringInterface {
  title: string;
}

const TitleSpring: FC<TitleSpringInterface> = ({
  title,
}: TitleSpringInterface) => {
  const [contentEditable, setContentEditable] = useState(false);

  return (
    <div className={styles.titleSpring}>
      <div contentEditable={contentEditable} ref={(div) => div?.focus()}>
        {title}
      </div>{' '}
      {!contentEditable && (
        <EditOutlined
          style={{ marginLeft: '15px' }}
          key="edit"
          onClick={() => {
            setContentEditable(true);
          }}
        />
      )}
      {contentEditable && (
        <CheckOutlined
          style={{ marginLeft: '15px' }}
          key="edit"
          onClick={() => setContentEditable(false)}
        />
      )}
    </div>
  );
};

export default TitleSpring;
