export default interface IUser {
  room: string;
  isMaster: boolean;
  firstName: string;
  image: string;
  job: string;
  lastName: string;
  isObserver?: boolean;
  userId: string;
}
