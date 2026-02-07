import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

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

// project service, interface, and directive
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';
import { ProjectDeleteDirective } from '../../directives/project-delete.directive';

// snackbar duration
import { SNACK_BAR_DURATION } from '../../constants/ui.constants';

@Component({
  standalone: true,
  selector: 'app-project-table',
  templateUrl: './project-table.html',
  styleUrls: ['./project-table.scss'],
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
    RouterModule,
    ProjectDeleteDirective,
  ],
})
export class ProjectTable implements AfterViewInit {
  selection = new SelectionModel<Project>(true, []);

  // setup pagination for project table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // setup sort in table
  @ViewChild(MatSort) sort!: MatSort;

  // set the loading spinner to true
  isLoadingResults = true;

  // set up the data source
  dataSource = new MatTableDataSource<Project>();

  // columns to display
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
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getProjects();
  }

  // get all projects from project service
  public getProjects(): void {
    this.isLoadingResults = true;
    this.projectService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (projects) => {
          this.dataSource.data = projects;
          this.isLoadingResults = false;
          this.cdr.markForCheck()
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
          this.isLoadingResults = false;
          this.cdr.markForCheck();
          this.snackBar.open('Error fetching projects.', 'Close', {
            duration: SNACK_BAR_DURATION
          });
        },
      });
  }

  public onProjectDeleted(deletedId: string): void {
    // create a NEW array reference so OnPush detects the change
    const updatedData = (this.dataSource.data = this.dataSource.data.filter(
      (p) => p._id !== deletedId,
    ));
    this.dataSource.data = updatedData;

    // clear selection if the deleted item was selected
    const deletedItem = this.selection.selected.find(
      (p) => p._id === deletedId,
    );
    if (deletedItem) {
      this.selection.deselect(deletedItem);
    }
  }

  // whether the number of selected projects matches the total number of rows
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // select all rows if they are not all selected; otherwise clear selection
  public toggleAllRows() {
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
    // label for a rew checkbox
    // using row.title assumes 'title' is a unique and descriptive property
    return `${this.selection.isSelected(row) ? 'Deselect' : 'Select'} project ${
      row.title
    }`;
  }
}
