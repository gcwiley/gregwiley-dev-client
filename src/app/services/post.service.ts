import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// import the post interface
import { Post } from '../types/post.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class PostService {
   // URL to web api
   private postsUrl = '/api/posts';

   // inject "HttpClient" into the Post service
   constructor(private http: HttpClient) {}

   // GET: all posts from the server
   getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.postsUrl, { headers: headers })
   }

   // GET: a post by ID. Will 404 if id not found
   getPost(id: string | null): Observable<Post> {
      const url = `${this.postsUrl}/${id}`;
      return this.http.get<Post>(url, { headers: headers })
   }

   // GET posts whose name contains search term - SEARCH
   searchPosts(term: string): Observable<Post[]> {
      if (!term.trim()) {
         // if no search term, return an empty post arrary
         return of([]);
      }
      return this.http.get<Post[]>(`${this.postsUrl}/?name=${term}`)
   }

   // GET: post count from database
   getPostCount(): Observable<number> {
      return this.http.get<number>('/api/post-count', { headers: headers });
   }

   // GET: recent posts added
   getRecentPosts(): Observable<Post[]> {
      return this.http.get<Post[]>('/api/recent-posts', { headers: headers });
   }

   // GET: favorite posts
   getFavoritePosts(): Observable<Post[]> {
      return this.http.get<Post[]>('/api/favorite-posts');
   }

   // SAVE METHODS //

   // POST: add a new post to the server
   addPost(newPost: Post | object): Observable<Post> {
      return this.http.post<Post>(this.postsUrl, newPost, { headers: headers })
   }

   // DELETE a post by ID from the server
   deletePost(id: string): Observable<Post> {
      const url = `${this.postsUrl}/${id}`;
      return this.http.delete<Post>(url, { headers: headers })
   }

   // PUT: update the post in the database
   updatePost(id: string, post: Post | object): Observable<object> {
      // create the url
      const url = `${this.postsUrl}/${id}`;
      return this.http.put(url, post, { headers: headers })
   }

   
}
