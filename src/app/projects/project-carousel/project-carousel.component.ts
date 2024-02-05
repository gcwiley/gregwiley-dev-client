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
import { SimpleTruncatePipe } from 'src/app/pipes/simple-truncate.pipe';

// import the project type
import { Project } from '../../types/project.interface';

// import project service
import { ProjectService } from '../../services/project.service';

@Component({
   selector: 'app-project-carousel',
   templateUrl: './project-carousel.component.html',
   styleUrls: ['./project-carousel.component.scss'],
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
export class ProjectCarouselComponent implements OnInit {
   // creating member variables
   projects: Project[] = [];

   // set up the grid list demensions
   cols = 4; // Amount of columns in the grid list.
   rowHeight = '200px'; // row height
   gutterSize = '0px';

   // set up the grid list dimensions
   colspan = 1; // comment
   rowspan = 1; // comment

   constructor(private projectService: ProjectService, private breakpointObserver: BreakpointObserver) {}

   ngOnInit(): void {
      this.layoutChanges();
      this.getFeaturedProjects();
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

   getFeaturedProjects(): void {
      this.projectService.getFeaturedProjects().subscribe((projects) => {
         this.projects = projects;
      });
   }
}
