import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// import the angular material modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// material data source - follow up
import { MatTableDataSource } from '@angular/material/table';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project type
import { Project } from 'src/app/types/project.interface';

@Component({
   selector: 'app-project-list',
   templateUrl: './project-list.component.html',
   styleUrls: ['./project-list.component.scss'],
   standalone: true,
   imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
})
export class ProjectListComponent implements OnInit {
   // set up the data source
   dataSource = new MatTableDataSource<Project>();

   // columns to display
   columnsToDisplay = ['title', 'status', 'category', 'language', 'startDate', 'favoriteProject', 'editProject', 'deleteProject'];

   constructor(private projectService: ProjectService, private router: Router) {}

   // this method executes right away
   ngOnInit(): void {
      this.getProjects();
   }

   // gets all projects from project service
   getProjects(): void {
      this.projectService.getProjects().subscribe((projects) => {
         this.dataSource.data = projects;
      });
   }

   // favorites a project
   onFavoriteProject(): void {
      window.alert('You have add this project to favorites!');
   }

   // deletes a project
   onDeleteProject(id: string): void {
      this.projectService.deleteProject(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}
