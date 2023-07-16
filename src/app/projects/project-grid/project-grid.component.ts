import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // used for both type of Forms
import { RouterModule } from '@angular/router';

// import angular material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// import pipe
import { PipesModule } from 'src/app/pipes/pipes.module';

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
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    PipesModule,
  ],
})
export class ProjectGridComponent implements OnInit {
  // creating member variables
  projects: Project[] = [];
  cols = 4; // Amount of columns in the grid list.
  rowHeight = '300px'; // row height
  colspan = 1;
  rowspan = 1;

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
        // set the default values
        this.cols = 4;
        this.rowHeight = '300px';

        const breakpoints = result.breakpoints;

        // check to see if viewport is in table portrait mode
        if (breakpoints[Breakpoints.TabletPortrait]) {
          // set the number of cols to 1
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          // set the number of cols to 1
          this.cols = 1;
          this.rowHeight = '300px';
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          // set the number of cols to 1
          this.cols = 1;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          // set the number of cols to 2
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
