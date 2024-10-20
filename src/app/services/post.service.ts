import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// import the message service
import { MessageService } from './message.service';

// import the post interface
import { Post } from '../types/post.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class PostService {
   // URL to web api
   private postsUrl = '/api/posts';

   // inject "HttpClient" into the Post service
   constructor(private http: HttpClient, private messageService: MessageService) {}

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

   // Handle Http operation that failed
   // let the app continue
   // @param operation - name of the operation that failed
   // @param result - optional value to return as the observable result

   private handleError<T>(result?: T) {
      return (error: Error): Observable<T> => {
         if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
               // a client-side or network error occurred. handle it accordingly
               console.error('An error occurred:', error.error);
            } else {
               // the backend returned an unsuccessful response code.
               // the response body may contain clues as to what went wrong
               console.error(`Backend returned code ${error.status}, body was `, error.error);
            }
         } else {
            // handle other types of errors
            console.error(error);
         }
         // let the app keep running by returning an empty result
         return of(result as T);
      };
   }

   // Log a postService message with postService
   private log(message: string): void {
      return this.messageService.add(`PostService: ${message}`);
   }
}
