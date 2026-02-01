import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Breakpoints,
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// rxjs
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, startWith, takeUntil } from 'rxjs/operators';

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
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ProjectGrid implements OnInit, OnDestroy {
  // inject dependencies
  private readonly projectService = inject(ProjectService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  // observable streams
  public projects$!: Observable<Project[] | null>;
  public cols$!: Observable<number>;

  // static grid properties (readonly since they don't change)
  public readonly rowHeight = '1:1';
  public readonly gutterSize = '1rem';
  public readonly colspan = 1;
  public readonly rowspan = 1;

  // lifecycle management
  private destroy = new Subject<void>();

  public ngOnInit(): void {
    this.projects$ = this.projectService.getProjects().pipe(
      // start with null to trigger the loading spinner immediately
      startWith(null),
      catchError(() => {
        // return empty array on error so the page does not break
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
        takeUntil(this.destroy),
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

  public ngOnDestroy(): void {
    // signal component destruction
    this.destroy.next();
    this.destroy.complete();
  }

  // optional: If you need to track items for *ngFor performance
  public trackByProjectId(index: number, project: Project): string {
    return project._id; // Assuming your Project interface has an '_id' property
  }
}
