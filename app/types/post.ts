export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  image_public_id?: string | null;
  postUserId?: string | null;
  postUser?: any | null;
  postReactions?: IReaction[];
}

export interface IReaction {
  id: number;
  emojiString: string;
  createdAt: Date;
  updatedAt: Date;
  reactionPostId?: number | null;
  reactionCommentId?: number | null;
  reactionUserId?: string | null;
}
