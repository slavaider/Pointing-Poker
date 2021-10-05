import IUser from './user';

export default interface IMessage extends IUser {
  room: string;
  text: string;
  date: string;
}
