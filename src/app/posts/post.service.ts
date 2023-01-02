import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import the post model
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'api/posts';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // inject 'httpClient' into the project service
  constructor(private http: HttpClient) {}

  // GET: posts from the server
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }


  
}
