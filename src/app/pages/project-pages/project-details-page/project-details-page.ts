import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import  { } from 

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// material components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { Navbar, Footer } from '../../../components';

// project service and interface
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../types/project.interface';

// project components
import {
  ProjectDetails,
  ProjectDescription,
  ProjectTags,
} from '../../../projects';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.html',
  styleUrl: './project-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    Navbar,
    Footer,
    ProjectDescription,
    ProjectDetails,
    ProjectTags,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
})
export class ProjectDetailsPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  // comment
  public readonly project$: Observable<Project | undefined> =
    this.route.paramMap.pipe(
      map((pm) => pm.get('id')),
      filter((id): id is string => !!id),
      switchMap((id) =>
        this.projectService.getProjectById(id).pipe(
          catchError((error) => {
            console.error('Error fetching project:', error);
            return of(undefined);
          }),
        ),
      ),
    );

  // comment
  public goBack(): void {
    this.router.navigate(['/projects']);
  }
}
