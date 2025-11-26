import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
})
export class ProjectDetails {
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
