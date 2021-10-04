import React, { FormEvent, useCallback, useContext, useState } from 'react';
import Link from 'next/link';
import { Button, Input, Space } from 'antd';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import SocketContext from 'src/shared/SocketContext';
import { useAppDispatch } from '../../hooks';
import {
  addCards,
  addIssues,
  addMessages,
  addOptions,
  addUsers,
  editTitleSpring,
  setUser,
} from '../../store/usersSlice';
import UserCreate from '../UserCreate';
import User from '../../interfaces/user';
import Message from '../../interfaces/message';
import { Options } from '../../interfaces/options';
import Issue from '../../interfaces/issue';
import Card from '../../interfaces/card';

const HomePage: React.FC = () => {
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
      <ul>
        <li>
          <Link href="/" replace>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about" replace>
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: '/settings/[roomId]',
              query: { roomId: 1 },
            }}
            replace
          >
            <a>Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/test" replace>
            <a>Test</a>
          </Link>
        </li>
      </ul>
      <hr />
      <Space size={10}>
        <Button onClick={connect} className="mb-1" type="primary">
          connect by admin
        </Button>

        <form onSubmit={connectByUrl}>
          <Space size={10}>
            <Input name="url" placeholder="connect by url" />
            <Button htmlType="submit">connect</Button>
          </Space>
        </form>
      </Space>
    </>
  );
};

export default HomePage;
