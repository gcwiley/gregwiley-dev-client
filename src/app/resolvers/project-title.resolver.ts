import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

import { ProjectService } from '../services/project.service';

const DEFAULT_TITLE = 'Project Details | Portfolio';

export const projectTitleResolver: ResolveFn<string> = (route) => {
  const projectService = inject(ProjectService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of(DEFAULT_TITLE);
  }

  return projectService.getProjectById(id).pipe(
    map((project) =>
      project ? `${project.title} | Portfolio` : DEFAULT_TITLE,
    ),
    catchError(() => of(DEFAULT_TITLE)),
  );
};