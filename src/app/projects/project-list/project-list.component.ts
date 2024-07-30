import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

// import mat dialog
// import {
//    MatDialog,
//    MatDialogActions,
//    MatDialogClose,
//    MatDialogContent,
//    MatDialogRef,
//    MatDialogTitle,
// } from '@angular/material/dialog';

// DIALOG BOX COMPONENT
// @Component({
//    selector: 'app-project-list-dialog',
//    templateUrl: 'project-list-dialog.html',
//    standalone: true,
//    changeDetection: ChangeDetectionStrategy.OnPush,
//    imports: [MatButtonModule],
// })
export class DialogProjectListComponent {
   // readonly dialogRef = inject(MatDialogRef<DialogProjectList>);
}

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project type
import { Project } from '../../types/project.interface';

@Component({
   selector: 'app-project-list',
   templateUrl: './project-list.component.html',
   styleUrls: ['./project-list.component.scss'],
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      CommonModule,
      MatRippleModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      RouterModule,
   ],
})
export class ProjectListComponent implements OnInit {
   // sets up the dialog box
   // readonly dialog = inject(MatDialog);

   // opens the dialog box
   // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   //    this.dialog.open(DialogProjectList, {
   //       width: '250px',
   //       enterAnimationDuration,
   //       exitAnimationDuration,
   //    });
   // }

   // fix this later!
   resultsLength = 0;
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Project>();

   // columns to display
   columnsToDisplay = [
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

   constructor(private projectService: ProjectService, private router: Router) {}

   ngOnInit(): void {
      this.getProjects();
   }

   // gets all projects from the project service
   getProjects(): void {
      this.projectService.getProjects().subscribe((projects) => {
         this.dataSource.data = projects;
      });
   }

   // deletes a project
   onDeleteProject(id: string): void {
      this.projectService.deleteProject(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}
