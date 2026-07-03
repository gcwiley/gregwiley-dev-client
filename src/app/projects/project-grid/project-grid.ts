import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  DestroyRef,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

// rxjs
import { Observable, of, BehaviorSubject} from 'rxjs';
import { catchError, startWith, switchMap, map } from 'rxjs/operators';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

// project service, interface, pipes
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.html',
  styleUrl: './project-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
})
export class ProjectGrid implements OnInit {
   private readonly projectService = inject(ProjectService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly pageParams$ = new BehaviorSubject({ page: 1, pageSize: 6 });

  public projects$!: Observable<Project[] | null>;
  public hasError = signal(false);
  public totalPosts = signal(0);
  public pageSize = signal(6);

  public ngOnInit(): void {
    this.projects$ = this.pageParams$.pipe(
      switchMap(({ page, pageSize }) =>
        this.projectService.getProjects(page, pageSize).pipe(
          takeUntilDestroyed(this.destroyRef),
          map((res) => {
            this.totalPosts.set(res.total);
            return res.data;
          }),
          startWith(null),
          catchError(() => {
            this.hasError.set(true);
            return of([]);
          }),
        ),
      ),
    );
  }

  public onPageChange(event: PageEvent): void {
    this.hasError.set(false);
    this.pageSize.set(event.pageSize);
    this.pageParams$.next({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }
}
