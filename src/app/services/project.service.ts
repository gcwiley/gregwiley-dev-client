import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// project interfaces
import { Project, ProjectInput } from '../types/project.interface';

// define a standard wrapper for your backend response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  // ideally, move this to environment.apiUrl
  private readonly API_URL = '/api/projects';

  private http = inject(HttpClient);

  // GET: - GET ALL PROJECTS
  public getProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse<Project[]>>(this.API_URL).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - GET PROJECT BY ID
  public getProjectById(id: string): Observable<Project> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<ApiResponse<Project>>(url).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - SEARCH PROJECTS
  public searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if no search term, return an empty project array
      return of([]);
    }

    const params = new HttpParams().set('query', term);
    return this.http.get<ApiResponse<Project[]>>(this.API_URL, { params }).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - PROJECT COUNT
  public getProjectCount(): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.API_URL}/count`).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - RECENTLY CREATED PROJECTS
  public getRecentlyCreatedProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse<Project[]>>(`${this.API_URL}/recent`).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - FEATURED PROJECTS
  public getFeaturedProjects(): Observable<Project[]> {
    return this.http
      .get<ApiResponse<Project[]>>(`${this.API_URL}/favorites`)
      .pipe(
        map((res) => res.data),
        catchError((error) => this.handleError(error)),
      );
  }

  // SAVE METHODS //

  // POST: - NEW PROJECT
  public addProject(newProject: ProjectInput): Observable<Project> {
    return this.http.post<ApiResponse<Project>>(this.API_URL, newProject).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // DELETE: - DELETE PROJECT BY ID
  public deleteProjectById(id: string): Observable<Project> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<ApiResponse<Project>>(url).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // PATCH: - UPDATE PROJECT BY ID
  public updateProjectById(
    id: string,
    body: Partial<Project>,
  ): Observable<Project> {
    const url = `${this.API_URL}/${id}`;
    return this.http.patch<ApiResponse<Project>>(url, body).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // PATCH: - FAVORITE PROJECT
  public setProjectFavorite(
    id: string,
    favorite: boolean,
  ): Observable<Project> {
    const url = `${this.API_URL}/${id}`;
    return this.http.patch<ApiResponse<Project>>(url, { favorite }).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // - HANDLE ERROR
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
