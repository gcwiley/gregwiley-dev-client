import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// project service
import { ProjectService } from '../../services/project.service';

@Component({
  standalone: true,
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class ProjectDescriptionComponent {
  // inject dependencies
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public project$ = this.route.paramMap.pipe(
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
