// define the post interface
export interface Post {
   _id?: string;
   title: string;
   author: string;
   datePublished: string;
   category: string;
   body: string;
   createdAt: string;
   updatedAt: string;
}

// define the post category interface
export interface PostCategory {
   value: string;
   viewValue: string;
}
