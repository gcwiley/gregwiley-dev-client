import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// project interfaces
import { Project, ProjectInput } from '../types/project.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsUrl = '/api/projects'; // URL to web api

  // inject "HttpClient" into the project service
  private http = inject(HttpClient);

  // GET: all projects from the server - GET ALL PROJECTS
  public getProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>(this.projectsUrl).pipe(
      map((res) => res.data), 
      catchError((error) => this.handleError(error))
    );
  }

  // GET: a individual project by ID - GET PROJECT BY ID
  public getProjectById(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .get<{ success: boolean; message?: string; data: Project }>(url)
      .pipe(
        map((res) => res.data), // unwrap the backend wrapper
        catchError((error) => this.handleError(error))
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
        catchError((error) => this.handleError(error))
      );
  }

  // GET: project the count from database - PROJECT COUNT
  public getProjectCount(): Observable<number> {
    return this.http.get<{ data: number }>('/api/projects/count').pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // GET: recently created projects added to database - RECENTLY CREATED
  public getRecentlyCreatedProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>('/api/projects/recent').pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // GET: featured projects for carousel - FEATURED PROJECTS
  public getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>('/api/projects/favorites').pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // SAVE METHODS //

  // POST: add a new Project
  public addProject(newProject: ProjectInput): Observable<Project> {
    return this.http
      .post<Project>(this.projectsUrl, newProject)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // DELETE: a project by ID from the server - DELETE PROJECT BY ID
  public deleteProjectById(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .delete<Project>(url)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // PATCH: update project - UPDATE PROJECT BY ID
  public updateProjectById(
    id: string,
    body: Partial<Project>
  ): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .patch<{ data: Project }>(url, body)
      .pipe(
        map((res) => res.data),
        catchError((error) => this.handleError(error))
      );
  }

  // PATCH: set a project as a favorite or not - FAVORITE PROJECT
  public setProjectFavorite(
    id: string,
    favorite: boolean
  ): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .patch<{ data: Project }>(url, { favorite })
      .pipe(
        map((res) => res.data),
        catchError((error) => this.handleError(error))
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
