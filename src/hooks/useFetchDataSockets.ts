import { useContext, useEffect } from 'react';
import { Options } from '../interfaces/options';
import { addMessage, addOptions, addUser } from '../store/usersSlice';
import SocketContext from '../shared/SocketContext';
import { useAppDispatch } from './index';
import User from '../interfaces/user';
import Message from '../interfaces/message';

const useFetchSettingsSockets = (): void => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket?.on('add option', (response: Options) => {
      dispatch(addOptions(response));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('add user', (data: User) => {
      dispatch(addUser(data));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    socket?.on('add message', (data: Message) => {
      dispatch(addMessage(data));
    });
  }, [dispatch, socket]);
};
export default useFetchSettingsSockets;
