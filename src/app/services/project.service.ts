import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import message service
import { MessageService } from './message.service';

// import the project model
import { Project } from '../types/project';

@Injectable({ providedIn: 'root' })

export class ProjectService {
  private projectsUrl = 'api/projects';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // inject "HttpClient" into the Project service
  constructor(private http: HttpClient, private messageService: MessageService) {}

  // GET: projects from the server
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      tap((_) => this.log('fetched projects')),
      catchError(this.handleError<Project[]>('getProjects', []))
    );
  }

  // GET: project by ID. Will 404 if id not found
  getProject(id: string | null): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap((_) => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  // GET: project count from database
  getProjectCount(): Observable<number> {
    return this.http.get<number>('/api/project-count');
  }

  // GET: recent projects added
  getRecentProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/recent-projects');
  }

  // SAVE METHODS //

  // POST: add a new Project to the server
  addProject(newProject: Project | any): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, newProject, this.httpOptions).pipe(
      tap((newProject: Project) => this.log(`added project with id=${newProject._id}`)),
      catchError(this.handleError<Project>('addHero'))
    );
  }

  // DELETE project by ID from the server
  deleteProject(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  updateProject(id: any, project: any): Observable<any> {
    const url = `${this.projectsUrl}/${id}`;

    return this.http.patch(url, project, this.httpOptions).pipe(
      tap((_) => this.log(`updated project id=${project._id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  // Handle Http operation that failed
  // let the app continue
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by return an empty result
      return of(result as T);
    };
  }

  // Log a ProjectService message with ProjectService
  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }
}
