export interface IEvent {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  author: string;
  banned?: boolean;
  banDescription?: string;
}
