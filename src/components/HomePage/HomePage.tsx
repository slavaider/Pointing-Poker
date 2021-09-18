import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import { Button, Input, Space } from 'antd';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../hooks';
import { addUser, addUsers, setUser } from '../../store/usersSlice';
import UserCreate from '../UserCreate';
import IUser from '../../interfaces/user';
import SocketContext from '../../shared/SocketContext';

const HomePage: React.FC = () => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

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
    (user: IUser) => {
      if (socket) {
        const room = isMaster ? v4() : url;
        socket.emit(
          'join server',
          {
            ...user,
            isMaster,
            room,
          },
          (response: IUser, userId: string) => {
            dispatch(addUsers(response));
            dispatch(setUser(userId));
            router.push(`/lobby/${room}`);
          },
        );
      }
    },
    [dispatch, isMaster, router, socket, url],
  );

  useEffect(() => {
    if (socket) {
      socket.on('add user', (data: IUser) => {
        dispatch(addUser(data));
      });
    }
  }, [dispatch, socket]);

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
