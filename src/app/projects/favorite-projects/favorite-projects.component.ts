import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

// import simple truncate pipe
import { SimpleTruncatePipe } from 'src/app/pipes/simple-truncate.pipe';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project interface
import { Project } from '../../types/project.interface';

@Component({
   selector: 'app-favorite-projects',
   templateUrl: './favorite-projects.component.html',
   styleUrls: ['./favorite-projects.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      RouterModule,
      MatGridListModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule,
      SimpleTruncatePipe,
   ],
})
export class FavoriteProjectsComponent implements OnInit {
   // create member variables
   recentProjects: Project[] = [];

   // set up the grid list demensions
   cols = 4; // Amount of columns in the grid list.
   rowHeight = '250px'; // row height
   gutterSize = '25px';

   // set up the grid list dimensions
   colspan = 1; // comment
   rowspan = 1; // comment

   constructor(private projectService: ProjectService, private breakpointObserver: BreakpointObserver) {}

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
      this.getRecentlyCreatedProjects();
      this.layoutChanges();
   }

   getRecentlyCreatedProjects(): void {
      this.projectService.getRecentlyCreatedProjects().subscribe((recentProjects) => {
         this.recentProjects = recentProjects;
      });
   }
}
