import { useContext, useEffect } from 'react';
import { Options } from '../interfaces/options';
import {
  addIssue,
  addMessage,
  addOptions,
  addUser,
  editTitleSpring,
  addCard,
  removeIssue,
  editIssue,
  editCard,
  deleteCard,
  startGameUsers,
  removeUser,
  updateUser,
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
    if (socket) {
      socket.on('send option server', (response: Options) => {
        dispatch(addOptions(response));
      });

      socket.on('send user server', (data: User) => {
        dispatch(addUser(data));
      });

      socket.on('send message server', (data: Message) => {
        dispatch(addMessage(data));
      });

      socket.on('send title server', (data: string) => {
        dispatch(editTitleSpring(data));
      });

      socket.on('send issue server', (data: Issue) => {
        dispatch(addIssue(data));
      });

      socket.on('issue remove server', (idResponse: string) => {
        dispatch(removeIssue(idResponse));
      });

      socket.on('issue update server', (issue: Issue) => {
        dispatch(editIssue(issue));
      });

      socket.on('send card server', (data: Card) => {
        dispatch(addCard(data));
      });

      socket.on('card remove server', (idResponse: string) => {
        dispatch(deleteCard(idResponse));
      });

      socket.on('card update server', (card: Card) => {
        dispatch(editCard(card));
      });

      socket.on('start game server', (users: User[]) => {
        dispatch(startGameUsers(users));
      });

      socket.on('update user server', (newUser: User) => {
        dispatch(updateUser(newUser));
      });

      socket.on('remove user server', (newUser: User) => {
        dispatch(removeUser(newUser));
      });
    }
  }, [socket, dispatch]);
};
export default useFetchSettingsSockets;
