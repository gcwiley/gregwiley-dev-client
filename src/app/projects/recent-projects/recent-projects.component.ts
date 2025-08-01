import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentProjectsComponent implements OnInit {
  public recentProjects$!: Observable<Project[]>;

  // inject dependencies
  private projectService = inject(ProjectService);

  public ngOnInit(): void {
    // get the observable stream of recently added projects
    this.recentProjects$ = this.projectService.getRecentlyCreatedProjects().pipe(
      catchError((error) => {
        console.error('Error getting recent projects.', error);
        return of([]);
      })
    );
  }
}
