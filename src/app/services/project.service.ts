import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map, retry } from 'rxjs';

// environment
import { environment } from '../../environments/environment';

// project interfaces
import { Project, ProjectInput } from '../types/project.interface';
import {
  ApiResponse,
  PaginatedResponse,
} from '../types/api-response.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly API_URL = `${environment.apiUrl}/projects`;
  private readonly http = inject(HttpClient);

  private readonly DEFAULT_RETRY = { count: 1, delay: 1000 };

  // GET: - GET ALL PROJECTS
  public getProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse<Project[]>>(this.API_URL).pipe(
      retry(this.DEFAULT_RETRY),
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - GET PROJECTS WITH PAGINATION
  public getProjectsPaginated(
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ): Observable<PaginatedResponse<Project>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order);

    return this.http
      .get<PaginatedResponse<Project>>(this.API_URL, { params })
      .pipe(
        retry(this.DEFAULT_RETRY),
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

  // GET: - GET PROJECT COUNT
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

  // HANDLE ERROR
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.status === 0
        ? `A network error occurred: ${error.message}`
        : `Backend returned code ${error.status}, body was ${JSON.stringify(error.error)}`;

    console.error('There was an error:', errorMessage);
    return throwError(() => error);
  }
}
