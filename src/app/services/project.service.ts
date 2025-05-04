import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

// project interface
import { Project, ProjectInput } from '../types/project.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsUrl = '/api/projects'; // URL to web api

  // inject "HttpClient" into the project service
  constructor(private http: HttpClient) {}

  // GET: all projects from the server - GET PROJECTS
  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(catchError(this.handleError));
  }

  // GET: a individual project by ID. Will 404 error if the ID is not found - GET PROJECT BY ID
  public getProjectById(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(catchError(this.handleError));
  }

  // GET projects whose name contains search term - SEARCH PROJECTS
  public searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if no search term, return an empty project arrary
      return of([]);
    }

    const params = new HttpParams().set('name', term);
    return this.http
      .get<Project[]>(this.projectsUrl, { params })
      .pipe(catchError(this.handleError));
  }

  // GET: project the count from database - PROJECT COUNT
  public getProjectCount(): Observable<number> {
    return this.http.get<number>('/api/project-count').pipe(catchError(this.handleError));
  }

  // GET: recently created projects added to database _ RECENTLY CREATED
  public getRecentlyCreatedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/recent-projects').pipe(catchError(this.handleError));
  }

  // GET: featured projects for carousel - FEATURED PROJECTS
  public getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/favorite-projects').pipe(catchError(this.handleError));
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

  // DELETE a project by ID from the server - DELETE PROJECT BY ID
  public deleteProjectById(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete<Project>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // PATCH: update the project in the database - UPDATE PROJECT BY ID
  public updateProjectById(id: string, body: Partial<Project>): Observable<object> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.patch(url, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // private method that centralizes error handling - HANDLE ERROR
  private handleError(error: Error): Observable<never> {
    // NOTE: use a logging service instead of console.error
    // replace this with a more robust logging mechcanism - a dedicated logging service
    // logs error to console
    console.error('There was an error', error);
    // throws the error again, so the subscriber can catch it and handle the error
    return throwError(() => error);
  }
}
