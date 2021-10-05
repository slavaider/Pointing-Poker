import React, { FC, KeyboardEvent, useContext, useState } from 'react';
import { Drawer, Input } from 'antd';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import SocketContext from 'src/shared/SocketContext';
import styles from './Header.module.scss';
import Message from '../Message';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addMessage, selectMessages, selectUser } from '../../store/usersSlice';

import IMessage from '../../interfaces/message';

export interface InputProps extends KeyboardEvent<HTMLInputElement> {
  code: string;
}

const ENTER = 'Enter';

const Header: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const { id } = router.query;
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);

  const writeMessage = (event: InputProps) => {
    if (event.code === ENTER) {
      const message = {
        ...user,
        text,
        date: Date.now().toString(),
      };
      socket?.emit('send message', message, (response: IMessage) => {
        dispatch(addMessage(response));
        setText('');
      });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLine}>
        <div style={{ display: 'inline-block' }}>Logo</div>

        {user && id && (
          <>
            <button
              className={styles.button}
              type="button"
              onClick={() => setVisible(true)}
            >
              <Image
                width="13"
                height="10"
                src="/svg_message.svg"
                alt="messages"
              />
            </button>
            <Drawer
              title="Messages:"
              placement="right"
              onClose={() => setVisible(false)}
              visible={visible}
              width={'400px'}
              bodyStyle={{ backgroundColor: '#66999B' }}
            >
              {messages.map((message) => (
                <Message
                  key={message.date}
                  message={message.text}
                  user={{
                    ...message,
                    size: 'mini',
                    isItYou: message?.userId === user?.userId,
                  }}
                />
              ))}
              <Input
                placeholder="message..."
                className={styles.messageText}
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyPress={writeMessage}
              />
            </Drawer>
          </>
        )}
      </div>

      <div className={styles.greenLine} />
    </header>
  );
};

export default withRouter(Header);
