import React, {
  FC,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Input, Button, Space } from 'antd';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import SocketContext from 'src/shared/SocketContext';
import { useAppDispatch } from '../../../hooks';
import {
  addMessages,
  addUser,
  addUsers,
  addOptions,
  setUser,
} from '../../../store/usersSlice';
import UserCreate from '../../UserCreate';
import IUser from '../../../interfaces/user';
import IMessage from '../../../interfaces/message';
import { IOptions } from '../../../interfaces/options';
import styles from './main.module.scss';

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isMaster, setIsMaster] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();

  const showModel = () => {
    setIsModalVisible(true);
  };

  const connectByUrl = (event: FormEvent) => {
    event.preventDefault();
    const urlData = (event.target as HTMLFormElement).url.value;
    setUrl(urlData);
    setIsMaster(false);
    showModel();
  };

  const connect = () => {
    setIsMaster(true);
    showModel();
  };

  const handleUser = useCallback(
    (userData: IUser) => {
      const room = isMaster ? v4() : url;
      socket?.emit(
        'join server',
        {
          ...userData,
          isMaster,
          room,
        },
        (
          usersData: IUser[],
          messagesData: IMessage[],
          options: IOptions,
          userResponse: IUser,
        ) => {
          dispatch(addUsers(usersData));
          dispatch(addMessages(messagesData));
          dispatch(addOptions(options));
          dispatch(setUser(userResponse));
          router.push(`/lobby/${room}`);
        },
      );
    },
    [dispatch, isMaster, router, socket, url],
  );

  useEffect(() => {
    socket?.on('add user', (data: IUser) => {
      dispatch(addUser(data));
    });
  }, [dispatch, socket]);

  return (
    <>
      <UserCreate
        isShow={isModalVisible}
        hideModel={() => setIsModalVisible(false)}
        handleUser={handleUser}
      />
      <div className={styles.main__content}>
        <div className={styles.logo__content}>
          <div className={styles.logo__image}></div>
          <div className={styles.logo__title}>Poker Planning</div>
        </div>
        <div className={styles.game__change_container}>
          <div className={styles.game__start_container}>
            <h2 className={styles.game__start_title}>Start your planning:</h2>
            <div className={styles.game__start_sub}>
              <p className={styles.game__start_text}>Create session:</p>
              <Button
                onClick={connect}
                type="primary"
                className={styles.game__start_button}
              >
                Start new game
              </Button>
            </div>
          </div>
          <div className={styles.game__connect_container}>
            <h2 className={styles.game__connect_title}>OR:</h2>
            <div className={styles.game__connect_sub}>
              <form onSubmit={connectByUrl}>
                <Space direction="vertical">
                  <label
                    htmlFor="connect_url"
                    className={styles.game__connect_text}
                  >
                    Connect to lobby by URL:
                  </label>
                  <Space direction="horizontal" align="center">
                    <Input
                      name="url"
                      type="text"
                      className={styles.game__connect_url}
                      placeholder="connect by url"
                    />
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.game__connect_button}
                    >
                      Connect
                    </Button>
                  </Space>
                </Space>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
