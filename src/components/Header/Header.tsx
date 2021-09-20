import React, {
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Drawer, Input } from 'antd';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import SocketContext from 'src/shared/SocketContext';
import styles from './Header.module.scss';
import Message from '../Message';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addMessage,
  addMessages,
  selectMessages,
  selectUser,
} from '../../store/usersSlice';
import IMessage from '../../interfaces/message';

const Header: FC<WithRouterProps> = ({ router }: WithRouterProps) => {
  // TODO: переделать Logo и доверстать

  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const { roomId } = router.query;
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);

  const writeMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event as any).code === 'Enter') {
      const target = event.target as HTMLInputElement;
      const message = {
        ...user,
        text: target.value,
        date: Date.now().toString(),
      };
      socket?.emit('send message', message, (response: IMessage[]) => {
        dispatch(addMessages(response));
        target.value = '';
      });
    }
  };

  useEffect(() => {
    socket?.on('add message', (data: IMessage) => {
      dispatch(addMessage(data));
    });
  }, [dispatch, socket]);

  return (
    <header className={styles.header}>
      <div className={styles.headerLine}>
        <div style={{ display: 'inline-block' }}>Logo</div>

        {user && roomId && (
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
                    ItIsYou: message?.userId === user?.userId,
                  }}
                />
              ))}
              <Input
                placeholder="message..."
                className={styles.messageText}
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
