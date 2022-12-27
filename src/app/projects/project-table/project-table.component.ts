import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

// Import Project Service
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
})
export class ProjectTableComponent implements OnInit {
  // Set the Data Source
  dataSource = new MatTableDataSource();

  // columns to display
  columnsToDisplay = ['actions', 'title', 'status', 'category', 'language'];

  constructor(private projectService: ProjectService, private router: Router) {}

  // This method executes right away
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
