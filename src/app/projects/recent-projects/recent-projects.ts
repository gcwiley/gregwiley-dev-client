import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.html',
  styleUrls: ['./recent-projects.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class RecentProjects implements OnInit {
  public recentProjects$!: Observable<Project[]>;
  public isLoading = true;

  // inject dependencies
  private projectService = inject(ProjectService);

  public ngOnInit(): void {
    // get the observable stream of recently added projects
    this.recentProjects$ = this.projectService
      .getRecentlyCreatedProjects()
      .pipe(
        catchError((error) => {
          console.error('Error getting recent projects.', error);
          this.isLoading = false;
          return of([]);
        })
      );
    this.recentProjects$.subscribe(() => (this.isLoading = false));
  }
}
