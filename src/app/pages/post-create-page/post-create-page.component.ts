import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// import shared components
import { HeaderComponent, AnnouncementBannerComponent, FooterComponent } from 'src/app/shared';

// import post components
import { PostFormComponent, RecentPostsComponent } from 'src/app/posts';

@Component({
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    HeaderComponent,
    AnnouncementBannerComponent,
    FooterComponent,
    PostFormComponent,
    RecentPostsComponent,
  ],
})
export class PostCreatePageComponent implements OnInit {
  // set the default values of the grid list here
  cols = 4; // sets the number of columns in the grid
  rowHeight = 'fit'; // sets the height of the rows in the grid
  gutterSize = '10px'; // sets the gutter size of the grid

  // set the default values of the grid tile here
  colspan = 3;

  constructor(private breakpointObserver: BreakpointObserver) {}

  // responsive code
  layoutChanges(): void {
    this.breakpointObserver
      .observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
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
  }
}
