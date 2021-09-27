import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './Link-to-lobby.module.scss';

interface LinkToLobbyProps {
  linkToLobby: string;
}

const LinkToLobby: FC<LinkToLobbyProps> = ({
  linkToLobby,
}: LinkToLobbyProps) => {
  return (
    <div>
      <h4 className={styles.title}>Link to lobby:</h4>
      <div className={styles.Container}>
        <div className={styles.text}>{linkToLobby}</div>
        <Button
          type="primary"
          onClick={() => navigator.clipboard.writeText(linkToLobby)}
          className="button"
          htmlType="button"
        >
          Copy
        </Button>
      </div>
    </div>
  );
};

export default LinkToLobby;
