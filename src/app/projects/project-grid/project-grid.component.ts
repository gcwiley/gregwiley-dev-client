import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // used for both type of Forms
import { RouterModule } from '@angular/router';

// import angular material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import simple truncate pipe
import { SimpleTruncatePipe } from 'src/app/pipes/simple-truncate.pipe';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project interface
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SimpleTruncatePipe,
  ],
})
export class ProjectGridComponent implements OnInit {
  // creating member variables
  projects: Project[] = [];

  // set up the grid list demensions
  cols = 4; // Amount of columns in the grid list.
  rowHeight = '300px'; // row height
  gutterSize = '15px'; 

  // set up the grid list dimensions
  colspan = 1; // comment 
  rowspan = 1; // comment

  constructor(
    private projectService: ProjectService,
    private breakpointObserver: BreakpointObserver
  ) {}

  // responsive code
  layoutChanges(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        // check to see if viewport is in table portrait mode
        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        }
      });
  }

  ngOnInit(): void {
    this.getProjects();
    this.layoutChanges();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
