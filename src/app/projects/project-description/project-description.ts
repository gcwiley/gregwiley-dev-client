import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.html',
  styleUrls: ['./project-description.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class ProjectDescription {
  // inject dependencies
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public project$: Observable<Project | undefined> = this.route.paramMap.pipe(
    map((pm) => pm.get('id')),
    filter((id): id is string => !!id),
    switchMap((id) =>
      this.projectService.getProjectById(id).pipe(
        catchError((error) => {
          console.error('Error fetching project:', error);
          return of(undefined); // signal not found/error to template
        })
      )
    )
  );
}
