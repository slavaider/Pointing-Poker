import React, { FC } from 'react';
import styles from './Link-to-lobby.module.scss';
// import CopyToClipboard from "react-copy-to-clipboard";

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
        <button
          onClick={() => navigator.clipboard.writeText(linkToLobby)}
          className={styles.button}
          type={'button'}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default LinkToLobby;
