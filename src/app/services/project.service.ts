import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// import the project interface
import { Project } from '../types/project.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class ProjectService {
   // URL to web api
   private projectsUrl = '/api/projects';

   // inject "HttpClient" into the Project service
   constructor(private http: HttpClient) {}

   // GET: all projects from the server
   getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.projectsUrl, { headers: headers })
   }

   // GET: a individual project by ID. Will 404 error if the ID is not found
   getProject(id: string | null): Observable<Project> {
      const url = `${this.projectsUrl}/${id}`;
      return this.http.get<Project>(url)
   }

   // GET projects whose name contains search term - SEARCH PROJECT
   searchProjects(term: string): Observable<Project[]> {
      if (!term.trim()) {
         // if no search term, return an empty project arrary
         return of([]);
      }
      return this.http.get<Project[]>(`${this.projectsUrl}/?name=${term}`)
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
   addProject(newProject: Project | object): Observable<Project> {
      return this.http.post<Project>(this.projectsUrl, newProject, { headers: headers })
   }

   // DELETE a project by ID from the server
   deleteProjectById(id: string): Observable<Project> {
      // create the url
      const url = `${this.projectsUrl}/${id}`;
      return this.http.delete<Project>(url, { headers: headers })
   }

   // PUT: update the project in the database
   updateProject(id: string, project: Project | object): Observable<object> {
      // create the url
      const url = `${this.projectsUrl}/${id}`;
      return this.http.patch(url, project, { headers: headers })
   }
}
