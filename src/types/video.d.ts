export interface IUser {
  userName: string;
  _id: string;
}

export interface IVideo {
  _id: string;
  videoId: number;
  commentsCount: number;
  createdAt: string;
  likeCounts: number,
  ownerId: string,
  updatedAt: string;
  videoId: string;
  videoName: string;
  url: string;
  description: string;
  tags: Array<string>;
  User: Array<IUser>;
}
