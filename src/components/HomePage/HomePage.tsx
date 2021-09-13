import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Button, Input, Space } from 'antd';
import { v4 } from 'uuid';
import useSocket from '../../hooks/useSocket';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addUsers, selectUsers } from '../../store/usersSlice';

const HomePage: React.FC = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [room, setRoom] = useState(null);

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
          setRoom(data.room);
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
          setRoom(data.room);
          dispatch(addUsers(data));
        },
      );
  };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('add user', (data: any) => {
  //       dispatch(addUser(data));
  //     });
  //   }
  // }, [dispatch, socket]);

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
        {room && (
          <>
            <h1>Room {room}</h1>
            {users.map((user: any) => {
              return (
                <li key={user.userId}>
                  {user.name} {user.userId}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </>
  );
};

export default HomePage;
