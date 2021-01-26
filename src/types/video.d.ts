export interface IVideo {
  id: number;
  author: string;
  url: string;
  description: Array<string>,
  tagList: Array<string>,
  likes: number;
  comments: number;
}
