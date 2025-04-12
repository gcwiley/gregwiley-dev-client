import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
   standalone: true,
   selector: 'app-project-grid',
   templateUrl: './project-grid.component.html',
   styleUrls: ['./project-grid.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule],
})
export class ProjectGridComponent implements OnInit {
   // inject services using inject() function (alternative to constructur injection)
   private projectService = inject()

   // create the member variables
   projects: Project[] = [];

   // set up the grid list demensions
   cols = 5; // controls the amount of columns in the grid list.
   rowHeight = '1:1'; // row height
   gutterSize = '0px';

   // set up the grid list dimensions
   colspan = 1; 
   rowspan = 1; 

   constructor(private projectService: ProjectService, private breakpointObserver: BreakpointObserver) {}

   public ngOnInit(): void {
      this.getProjects();
      this.layoutChanges();
   }

   // responsive code
   public layoutChanges(): void {
      this.breakpointObserver
         .observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
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

   public getProjects(): void {
      this.projectService.getProjects().subscribe((projects) => {
         console.log('PROJECTS', projects)
         this.projects = projects;
      });
   }
}
