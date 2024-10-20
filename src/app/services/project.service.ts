import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// import the message service
import { MessageService } from './message.service';

// import the project interface
import { Project } from '../types/project.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class ProjectService {
   // URL to web api
   private projectsUrl = '/api/projects';

   // inject "HttpClient" into the Project service
   constructor(private http: HttpClient, private messageService: MessageService) {}

   // GET: all projects from the server
   getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.projectsUrl, { headers: headers }).pipe(
         tap(() => this.log('fetched projects')),
         catchError(this.handleError<Project[]>('get Projects', []))
      );
   }

   // GET: a individual project by ID. Will 404 error if the ID is not found
   getProject(id: string | null): Observable<Project> {
      const url = `${this.projectsUrl}/${id}`;
      return this.http.get<Project>(url).pipe(
         tap(() => this.log(`fetched project id=${id}`)),
         catchError(this.handleError<Project>(`get Project id=${id}`))
      );
   }

   // GET projects whose name contains search term - SEARCH PROJECT
   searchProjects(term: string): Observable<Project[]> {
      if (!term.trim()) {
         // if no search term, return an empty project arrary
         return of([]);
      }
      return this.http.get<Project[]>(`${this.projectsUrl}/?name=${term}`).pipe(
         tap((x) => (x.length ? this.log(`found projects matching "${term}"`) : this.log(`no projects matching "${term}"`))),
         catchError(this.handleError<Project[]>('search Projects', []))
      );
   }

   // GET: project the count from database
   getProjectCount(): Observable<number> {
      return this.http.get<number>('/api/project-count');
   }

   // GET: recently created projects added to database
   getRecentlyCreatedProjects(): Observable<Project[]> {
      return this.http.get<Project[]>('/api/recent-projects');
   }

   // GET: featured projects for carousel
   getFeaturedProjects(): Observable<Project[]> {
      return this.http.get<Project[]>('/api/favorite-projects');
   }

   // SAVE METHODS //

   // POST: add a new Project to the server
   // addProject(newProject: Project | object): Observable<Project> {
   //    return this.http.post<Project>(this.projectsUrl, newProject, { headers: headers }).pipe(
   //       tap((newProject: Project) => this.log(`added project with id=${newProject._id}`)),
   //       catchError(this.handleError<Project>('add Project'))
   //    );
   // }

   // ADD PROJECT
   addProject(newProject: Project | object): Observable<Project> {
      return this.http.post<Project>(this.projectsUrl, newProject, { headers: headers }).pipe(
         // check if the response is successful based on status code and body
         map((response: any) => {
            if (response.status === 'success') {
               return response.data; // assuming your server returns data in a 'data' property
            } else {
               throw new Error('Server returned an error');
            }
         }),
         catchError((error: HttpErrorResponse) => {
            console.error('Error creating project:', error);

            if (error.status === 0) {
               // a client-side or network error occurred. handle it accordingly.
               return throwError(() => new Error('An error occurred: ' + error.error.message));
            } else {
               // the backend return an unsuccessful response code.
               // the reponse body may contain clues as to what went wrong
               return throwError(() => new Error(`Backend returned code ${error.status}, body as ${error.error}`));
            }
         })
      );
   }

   // DELETE a project by ID from the server
   deleteProject(id: string): Observable<Project> {
      // create the url
      const url = `${this.projectsUrl}/${id}`;

      return this.http.delete<Project>(url, { headers: headers }).pipe(
         tap(() => this.log(`deleted project id=${id}`)),
         catchError(this.handleError<Project>('deleteProject'))
      );
   }

   // PUT: update the project in the database
   updateProject(id: string, project: Project | object): Observable<object> {
      // create the url
      const url = `${this.projectsUrl}/${id}`;

      return this.http.patch(url, project, { headers: headers }).pipe(
         tap(() => this.log(`updated project id=${id}`)),
         catchError(this.handleError<object>('updateProject'))
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

   // Log a ProjectService message with ProjectService
   private log(message: string): void {
      return this.messageService.add(`ProjectService: ${message}`);
   }
}
