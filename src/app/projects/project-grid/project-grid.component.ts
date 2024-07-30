import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import simple truncate pipe
import { SimpleTruncatePipe } from '../../pipes/index';

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
      RouterModule,
      MatGridListModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      SimpleTruncatePipe,
   ],
})
export class ProjectGridComponent implements OnInit {
   // create the member variables
   projects: Project[] = [];

   // set up the grid list demensions
   cols = 5; // Amount of columns in the grid list.
   rowHeight = '1:1'; // row height
   gutterSize = '0px';

   // set up the grid list dimensions
   colspan = 1; // fix this!
   rowspan = 1; // fix this!

   constructor(private projectService: ProjectService, private breakpointObserver: BreakpointObserver) {}

   ngOnInit(): void {
      this.getProjects();
      this.layoutChanges();
   }

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

   getProjects(): void {
      this.projectService.getProjects().subscribe((projects) => {
         this.projects = projects;
      });
   }
}
