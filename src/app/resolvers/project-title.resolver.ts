import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

// import project service
import { ProjectService } from '../services/project.service.js';

export const projectTitleResolver: ResolveFn<string> = (route) => {
  const projectService = inject(ProjectService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of('Project Details');
  }

  // assumes getProjectById returns an observable with a 'title' property
  return projectService.getProjectById(id).pipe(
    map(project => project ? `${project.title} | Portfolio` : 'Project Details'),
    // fallback in case of error
    catchError(() => of('Project Details')) 
  );
};