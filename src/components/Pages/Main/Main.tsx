import React, { FC, FormEvent, useCallback, useContext, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import SocketContext from 'src/shared/SocketContext';
import { useAppDispatch } from '../../../hooks';
import {
  addCards,
  addIssues,
  addMessages,
  addOptions,
  addUsers,
  editTitleSpring,
  setUser,
} from '../../../store/usersSlice';
import UserCreate from '../../UserCreate';
import User from '../../../interfaces/user';
import Message from '../../../interfaces/message';
import { Options } from '../../../interfaces/options';
import styles from './main.module.scss';
import Issue from '../../../interfaces/issue';
import Card from '../../../interfaces/card';

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
    (userData: User) => {
      const room = isMaster ? v4() : url;
      socket?.emit(
        'join server',
        {
          ...userData,
          isMaster,
          room,
          status: 'settings',
          kickVotes: 0,
          allVotes: 0,
        },
        (
          usersData: User[],
          messagesData: Message[],
          options: Options,
          issuesData: Issue[],
          cardsData: Card[],
          title: string,
          userResponse: User,
        ) => {
          dispatch(addUsers(usersData));
          dispatch(addMessages(messagesData));
          dispatch(addOptions(options));
          dispatch(setUser(userResponse));
          dispatch(editTitleSpring(title));
          dispatch(addIssues(issuesData));
          dispatch(addCards(cardsData));
          router.push(`/lobby/${room}`);
        },
      );
    },
    [dispatch, isMaster, router, socket, url],
  );

  return (
    <>
      <UserCreate
        isShow={isModalVisible}
        hideModel={() => setIsModalVisible(false)}
        handleUser={handleUser}
      />
      <div className={styles.main__content}>
        <div className={styles.logo__content}>
          <div className={styles.logo__image} />
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
