import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';

// import angular material modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project type
import { Project } from 'src/app/types/project.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [NgFor, NgIf, MatTableModule, MatIconModule, MatButtonModule],
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  // set the data source
  dataSource = new MatTableDataSource<Project>();

  // columns to display
  columnsToDisplay = ['title', 'status', 'category', 'language'];

  // colums to display with expand
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  @ViewChild(MatSort) sort!: MatSort;

  expandedProject!: Project | null;

  constructor(private projectService: ProjectService, private router: Router) {}

  // this method executes right away
  ngOnInit(): void {
    this.getProjects();
  }

  // this method executes after the view is done rendering
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // gets all projects from service
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
