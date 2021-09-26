import React, { FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Space } from 'antd';
import { v4 } from 'uuid';
import useSocket from '../../hooks/useSocket';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addUser, addUsers, selectUsers } from '../../store/usersSlice';

const HomePage: React.FC = () => {
  const socket = useSocket('http://localhost:3000');
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const connectByUrl = (event: FormEvent) => {
    event.preventDefault();
    const url = (event.target as HTMLFormElement).url.value;
    if (socket)
      socket.emit(
        'join server',
        {
          room: url,
          name: 'random member',
          avatar: 'random string',
        },
        (data: any) => {
          dispatch(addUsers(data));
        },
      );
  };

  const connect = () => {
    if (socket)
      socket.emit(
        'join server',
        {
          room: v4(),
          name: 'random member',
          avatar: 'random string',
        },
        (data: any) => {
          dispatch(addUsers(data));
        },
      );
  };

  useEffect(() => {
    if (socket) {
      socket.on('add user', (data: any) => {
        dispatch(addUser(data));
      });
    }
  }, [socket]);

  return (
    <>
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
          <Link href="/settings" replace>
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
      <ul>
        <>
          {users.map((user: any) => {
            return (
              <li key={user.userId}>
                {user.name} <br />
                id: {user.userId} <br />
                room: {user.room}
              </li>
            );
          })}
        </>
      </ul>
    </>
  );
};

export default HomePage;
