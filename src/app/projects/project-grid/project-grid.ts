import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import {
  Breakpoints,
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

// angular material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.html',
  styleUrls: ['./project-grid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ProjectGrid implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);

  // observable streams
  public projects$!: Observable<Project[] | null>;
  public cols$!: Observable<number>;
  public hasError = signal(false);

  // static grid properties (readonly since they don't change)
  public readonly rowHeight = '1:1';
  public readonly gutterSize = '1rem';
  public readonly colspan = 1;
  public readonly rowspan = 1;

  public ngOnInit(): void {
    this.projects$ = this.projectService.getProjects().pipe(
      takeUntilDestroyed(this.destroyRef),
      startWith(null),
      catchError(() => {
        this.hasError.set(true);
        return of([]);
      }),
    );

    this.cols$ = this.breakpointObserver
      .observe([
        // define breakpoints to observe
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((state: BreakpointState) => {
          // map breakpoint state to number of columns
          if (state.breakpoints[Breakpoints.XSmall]) {
            return 1; // e.g. handset portrait
          }
          if (state.breakpoints[Breakpoints.Small]) {
            return 2; // e.g. handset landscape / tablet portrait
          }
          if (state.breakpoints[Breakpoints.Medium]) {
            return 3; // e.g. tablet landscape
          }
          // default for large/x-large or none of the above match
          return 4;
        }),
      );
  }

  public trackByProjectId(_index: number, project: Project): string {
    return project._id; // Assuming your Project interface has an '_id' property
  }
}
