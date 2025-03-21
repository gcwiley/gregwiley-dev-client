import {
   AfterViewInit,
   Component,
   ViewChild,
   ChangeDetectionStrategy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SelectionModel } from '@angular/cdk/collections';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

// import mat paginator and mat sort
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project type
import { Project } from '../../types/project.interface';

@Component({
   standalone: true,
   selector: 'app-project-table',
   templateUrl: './project-table.component.html',
   styleUrls: ['./project-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      CommonModule,
      MatRippleModule,
      MatTableModule,
      MatCheckboxModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      RouterModule,
   ],
})
export class ProjectTableComponent implements AfterViewInit {
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
   columnsToDisplay = [
      'select',
      'title',
      'status',
      'category',
      'language',
      'startDate',
      'openProject',
      'editProject',
      'deleteProject',
      'openDialog',
   ];

   constructor(
      private projectService: ProjectService,
      private router: Router
   ) {}

   // a callback method that is invoked immediately after angular has completed initialization of a component's view
   public ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getProjects();
   }

   // gets all projects from the project service
   public getProjects(): void {
      this.projectService.getProjects().subscribe((projects) => {
         this.dataSource.data = projects;
         // sets the loading results to false
         this.isLoadingResults = false;
      });
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

   // the label for the checkbox on the passed row - fix this later
   public checkboxLabel(row?: Project): string {
      if (!row) {
         return `${this.isAllSelected() ? 'deslect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
   }
}
