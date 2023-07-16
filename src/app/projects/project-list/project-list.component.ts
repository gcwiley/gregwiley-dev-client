import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';

// import angular material modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

// import the project service
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
})
export class ProjectListComponent implements OnInit {
  // Set the Data Source
  dataSource = new MatTableDataSource();

  // columns to display
  columnsToDisplay = ['actions', 'title', 'status', 'category', 'language'];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.dataSource.data = projects;
    });
  }

  onDeleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(() => {
      // navigates admin back to the admin page
      this.router.navigateByUrl('/admin');
    });
  }
}
