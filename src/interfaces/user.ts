export default interface User {
  room: string;
  isMaster: boolean;
  firstName: string;
  image: string;
  job: string;
  lastName: string;
  isObserver?: boolean;
  userId: string;
  status: string;
  kickVotes: number;
  allVotes: number;
  currentIssueIndex: number;
}
