import { IUser } from './user';

export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  image_public_id?: string | null;
  commentPostId: number;
  commentUserId?: string | null;
  commentUser?: any;
}
