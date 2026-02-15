import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { forkJoin } from 'rxjs';

// angular cdk
import { SelectionModel } from '@angular/cdk/collections';

// angular material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// project service, interface, and directive
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';
import { ProjectDeleteDirective } from '../../directives/project-delete.directive';

// snackbar duration
import { SNACK_BAR_DURATION_MS } from '../../constants/ui.constants';

@Component({
  standalone: true,
  selector: 'app-project-table',
  templateUrl: './project-table.html',
  styleUrl: './project-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    ProjectDeleteDirective,
  ],
})
export class ProjectTable implements AfterViewInit {
  readonly selection = new SelectionModel<Project>(true, []);
  readonly isLoadingResults = signal(true);
  readonly dataSource = new MatTableDataSource<Project>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly columnsToDisplay = [
    'select',
    'title',
    'status',
    'category',
    'language',
    'startDate',
    'openProject',
    'editProject',
    'deleteProject',
  ];

  // inject dependencies
  private readonly projectService = inject(ProjectService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getProjects();
  }

  // get all projects from project service
  public getProjects(): void {
    this.isLoadingResults.set(true);
    this.projectService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (projects) => {
          this.dataSource.data = projects;
          this.isLoadingResults.set(false);
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
          this.isLoadingResults.set(false);
          this.snackBar.open('Error fetching projects.', 'Close', {
            duration: SNACK_BAR_DURATION_MS,
          });
        },
      });
  }

  public onProjectDeleted(deletedId: string): void {
    this.dataSource.data = this.dataSource.data.filter(
      (p) => p._id !== deletedId,
    );

    const deletedItem = this.selection.selected.find(
      (p) => p._id === deletedId,
    );
    if (deletedItem) {
      this.selection.deselect(deletedItem);
    }
  }

  // whether the number of selected projects matches the total number of rows
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // select all rows if they are not all selected; otherwise clear selection
  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  // the label for the checkbox on the passed row
  public checkboxLabel(row?: Project): string {
    if (!row) {
      // label for the header checkbox
      return `${this.isAllSelected() ? 'Deselect' : 'Select'} all projects`;
    }
    // label for a row checkbox
    // using row.title assumes 'title' is a unique and descriptive property
    return `${this.selection.isSelected(row) ? 'Deselect' : 'Select'} project ${
      row.title
    }`;
  }

  public trackByProjectId(_index: number, project: Project): string {
    return project._id;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteSelected(): void {
    const selected = this.selection.selected;
    if (!selected.length) return;

    const count = selected.length;
    const confirmed = confirm(
      `Delete ${count} project(s)? This cannot be undone.`,
    );
    if (!confirmed) return;

    forkJoin(selected.map((p) => this.projectService.deleteProjectById(p._id)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const deletedIds = new Set(selected.map((p) => p._id));
          this.dataSource.data = this.dataSource.data.filter(
            (p) => !deletedIds.has(p._id),
          );
          this.selection.clear();
          this.snackBar.open(`${count} project(s) deleted.`, 'Close', {
            duration: SNACK_BAR_DURATION_MS,
          });
        },
        error: () => {
          this.snackBar.open('Failed to delete some projects.', 'Close', {
            duration: SNACK_BAR_DURATION_MS,
          });
        },
      });
  }

  public statusClass(status: string): string {
    return `status-chip ${status.toLowerCase().replace(/\s+/g, '')}`;
  }
}
