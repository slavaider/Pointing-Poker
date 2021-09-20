import IUser from './user';

export default interface IMessage extends IUser {
  text: string;
  date: string;
}
