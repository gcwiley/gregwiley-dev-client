// define the post interface
export interface Post {
  _id?: string | undefined;
  title: string;
  author: string;
  body: string;
  datePublished: Date;
  createdAt: string;
  updatedAt: string;
}

