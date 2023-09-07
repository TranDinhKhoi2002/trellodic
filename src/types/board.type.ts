import { Column } from './column.type';

export interface Board {
  readonly _id: string;
  title: string;
  description: string;
  type: string;
  ownerIds: string[];
  memberIds: string[];
  columnOrderIds: string[];
  columns: Column[];
}