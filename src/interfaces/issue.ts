import Vote from './vote';

export default interface Issue {
  id: string;
  cardTitle: string;
  priority: string;
  linkToIssue: string;
  votes: Vote[];
}
