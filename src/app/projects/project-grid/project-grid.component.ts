import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

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
  standalone: true,
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
})
export class ProjectGridComponent implements OnInit, OnDestroy {
  // inject dependencies
  private projectService = inject(ProjectService);
  private breakpointObserver = inject(BreakpointObserver);

  // observables for AsyncPipe
  public projects!: Observable<Project[]>;
  // observable for columns based on breakpoints
  public cols!: Observable<number>;

  // static grid properties
  rowHeight = '1:1';
  gutterSize = '0px';
  colspan = 1;
  rowspan = 1;

  // lifecycle management - subject to manage subscription cleanup
  private destroy = new Subject<void>();

  public ngOnInit(): void {
    this.projects = this.projectService.getProjects().pipe(
      catchError(() => {
        // optionally, set the error flag or return an empty array
        return of([])
      })
    );

    this.cols = this.breakpointObserver
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
        })
      );
  }

  public ngOnDestroy(): void {
    // signal component destruction
    this.destroy.next();
    this.destroy.complete();
  }

  // Optional: If you need to track items for *ngFor performance
  public trackByProjectId(index: number, project: Project): string {
   return project._id; // Assuming your Project interface has an 'id' property
}
}
