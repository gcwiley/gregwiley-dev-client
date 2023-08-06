import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// import shared components
import { HeaderComponent, FooterComponent } from 'src/app/shared';

// import project details component
import { ProjectDetailsComponent } from 'src/app/projects';

// import the project type
import { Project } from 'src/app/types/project.interface';

// import the project service
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    ProjectDetailsComponent,
  ],
})
export class DetailsPageComponent implements OnInit {
  // set the default values of the grid list here
  cols = 4; // sets the number of columns in the grid
  rowHeight = 'fit'; // sets the height of the rows in the grid
  gutterSize = '0px'; // sets the gutter size of the grid

  // set the default values of the grid tile here
  colspan = 3;

  project!: Project;

  constructor(
    private route: ActivatedRoute,
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
          this.cols = 1; // grid list changes to 1 column
          this.colspan = 1; // grid tile takes up one column
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.colspan = 1; // grid tile takes up one column
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
          this.colspan = 1; // grid tile takes up one column
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 1;
          this.colspan = 1; // grid tile takes up one column
        }
      });
  }

  ngOnInit(): void {
    this.layoutChanges();
    this.getProject();
  }

  // GET project by id
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id).subscribe((project) => (this.project = project));
  }
}
