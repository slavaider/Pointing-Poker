import User from './user';

export default interface Message extends User {
  text: string;
  date: string;
}
