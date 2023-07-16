import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// import shared components
import { HeaderComponent } from 'src/app/shared';
import { FooterComponent } from 'src/app/shared';

// import the project type
import { Project } from 'src/app/types/project.interface';

// import the project service
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, HeaderComponent, FooterComponent],
})
export class DetailsPageComponent implements OnInit {
  // creating member variables
  project!: Project;
  cols = 4; // Amount of columns in the grid list.
  rowHeight = '300px'; // row height
  colspan = 1;
  rowspan = 1;

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
	this.layoutChanges();
    this.getProject();
  }

  // GET project by id
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id).subscribe((project) => (this.project = project));
  }
}
