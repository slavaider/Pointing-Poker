import React, { FC } from 'react';
import PlayerCard from '../PlayerCard';
import { PlayerCardProps } from '../PlayerCard/PlayerCard';
import styles from './Message.module.scss';

export type MessageProps = {
  user: PlayerCardProps;
  message: string;
};

const Message: FC<MessageProps> = ({ message, user }: MessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.messageText}>{message}</div>
      <div>
        <PlayerCard {...user} />
      </div>
    </div>
  );
};

export default Message;
