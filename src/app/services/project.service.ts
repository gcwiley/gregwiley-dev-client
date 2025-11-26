import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// project interfaces
import { Project, ProjectInput } from '../types/project.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsUrl = '/api/projects'; // URL to web api

  // inject "HttpClient" into the project service
  private http = inject(HttpClient);

  // GET: all projects from the server - GET ALL PROJECTS
  public getProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>(this.projectsUrl).pipe(
      map((res) => res.data), // extract the array
      catchError((error) => this.handleError(error)) // safer syntax
    );
  }

  // GET: a individual project by ID - GET PROJECT BY ID
  public getProjectById(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .get<{ success: boolean; message?: string; data: Project }>(url)
      .pipe(
        map((res) => res.data), // unwrap the backend wrapper
        catchError((error) => this.handleError(error)) // safe syntax
      );
  }

  // GET: projects whose name contains search term - SEARCH PROJECTS
  public searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if no search term, return an empty project array
      return of([]);
    }

    const params = new HttpParams().set('query', term);
    return this.http
      .get<{ data: Project[] }>(this.projectsUrl, { params })
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  // GET: project the count from database - PROJECT COUNT
  public getProjectCount(): Observable<number> {
    return this.http.get<{ data: number }>('/api/projects/count').pipe(
      map((res) => res.data), // extract the array
      catchError((error) => this.handleError(error))
    );
  }

  // GET: recently created projects added to database - RECENTLY CREATED
  public getRecentlyCreatedProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>('/api/projects/recent').pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // GET: featured projects for carousel - FEATURED PROJECTS
  public getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>('/api/projects/favorites').pipe(
      map((res) => res.data), // extract the array.
      catchError(this.handleError)
    );
  }

  // SAVE METHODS //

  // POST: add a new Project to the server
  public addProject(newProject: ProjectInput): Observable<Project> {
    return this.http
      .post<Project>(this.projectsUrl, newProject, {
        headers: headers,
      })
      .pipe(catchError(this.handleError));
  }

  // DELETE: a project by ID from the server - DELETE PROJECT BY ID
  public deleteProjectById(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .delete<Project>(url, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  // PATCH: update the project in the database - UPDATE PROJECT BY ID
  public updateProjectById(
    id: string,
    body: Partial<Project>
  ): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .patch<{ data: Project }>(url, body, { headers: headers })
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  // PATCH: set a project as a favorite or not - FAVORITE PROJECT
  public setProjectFavorite(
    id: string,
    favorite: boolean
  ): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .patch<{ data: Project }>(url, { favorite }, { headers })
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  // enhanced error handler that centralized error handling - HANDLE ERROR
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // client-side/network error
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // backend error
      errorMessage = `Backend returned code ${
        error.status
      }, body was ${JSON.stringify(error.error)}`;
    }
    console.error('There was an error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
