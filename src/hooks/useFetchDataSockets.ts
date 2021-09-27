import { useContext, useEffect } from 'react';
import { Options } from '../interfaces/options';
import {
  addIssue,
  addMessage,
  addOptions,
  addUser,
  editTitleSpring,
  addCard,
} from '../store/usersSlice';
import SocketContext from '../shared/SocketContext';
import { useAppDispatch } from './index';
import User from '../interfaces/user';
import Message from '../interfaces/message';
import Issue from '../interfaces/issue';
import Card from '../interfaces/card';

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

  useEffect(() => {
    socket?.on('add title', (data: string) => {
      dispatch(editTitleSpring(data));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    socket?.on('add issue', (data: Issue) => {
      dispatch(addIssue(data));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    socket?.on('add card', (data: Card) => {
      dispatch(addCard(data));
    });
  }, [dispatch, socket]);
};
export default useFetchSettingsSockets;
