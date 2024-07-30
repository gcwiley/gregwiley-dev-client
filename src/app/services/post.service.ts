import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import the message service
import { MessageService } from './message.service';

// import the post interface
import { Post } from '../types/post.interface';

@Injectable({ providedIn: 'root' })
export class PostService {
   private postsUrl = '/api/posts'; // URL to web api

   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
   };

   // inject "HttpClient" into the Post service
   constructor(private http: HttpClient, private messageService: MessageService) {}

   // GET: all posts from the server
   getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.postsUrl).pipe(
         tap(() => this.log('fetched posts')),
         catchError(this.handleError<Post[]>('get Posts', []))
      );
   }

   // GET: a post by ID. Will 404 if id not found
   getPost(id: string | null): Observable<Post> {
      const url = `${this.postsUrl}/${id}`;
      return this.http.get<Post>(url).pipe(
         tap(() => this.log(`fetched post id=${id}`)),
         catchError(this.handleError<Post>(`get Post id=${id}`))
      );
   }

   // GET posts whose name contains search term - SEARCH
   searchPosts(term: string): Observable<Post[]> {
      if (!term.trim()) {
         // if no search term, return an empty post arrary
         return of([]);
      }
      return this.http.get<Post[]>(`${this.postsUrl}/?name=${term}`).pipe(
         tap((x) => (x.length ? this.log(`found posts matching "${term}"`) : this.log(`no posts matching "${term}"`))),
         catchError(this.handleError<Post[]>('search Posts', []))
      );
   }

   // GET: post count from database
   getPostCount(): Observable<number> {
      return this.http.get<number>('/api/post-count');
   }

   // GET: recent posts added
   getRecentPosts(): Observable<Post[]> {
      return this.http.get<Post[]>('/api/recent-posts');
   }

   // GET: favorite posts
   getFavoritePosts(): Observable<Post[]> {
      return this.http.get<Post[]>('/api/favorite-posts');
   }

   // SAVE METHODS //

   // POST: add a new post to the server
   addPost(newPost: Post | object): Observable<Post> {
      return this.http.post<Post>(this.postsUrl, newPost, this.httpOptions).pipe(
         tap((newPost: Post) => this.log(`added post with id=${newPost._id}`)),
         catchError(this.handleError<Post>('add Post'))
      );
   }

   // DELETE a post by ID from the server
   deletePost(id: string): Observable<Post> {
      const url = `${this.postsUrl}/${id}`;

      return this.http.delete<Post>(url, this.httpOptions).pipe(
         tap(() => this.log(`deleted post id=${id}`)),
         catchError(this.handleError<Post>('deletePost'))
      );
   }

   // PUT: update the post in the database
   updatePost(id: string, post: Post | object): Observable<object> {
      // create the url
      const url = `${this.postsUrl}/${id}`;

      return this.http.put(url, post, this.httpOptions).pipe(
         tap(() => this.log(`updated post id=${id}`)),
         catchError(this.handleError<object>('updatePost'))
      );
   }

   // Handle Http operation that failed
   // let the app continue
   // @param operation - name of the operation that failed
   // @param result - optional value to return as the observable result

   private handleError<T>(operation = 'operation', result?: T) {
      return (error: Error): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead

         // TODO: better job of transforming error for user consumption
         this.log(`${operation} failed: ${error.message}`);

         // let the app keep running by return an empty result
         return of(result as T);
      };
   }

   // Log a postService message with postService
   private log(message: string): void {
      return this.messageService.add(`PostService: ${message}`);
   }
}
