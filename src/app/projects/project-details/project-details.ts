import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// project service, interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
})
export class ProjectDetails {
  // inject dependencies
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

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
