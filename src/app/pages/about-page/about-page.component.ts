import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// import shared components
import { HeaderComponent } from 'src/app/shared';
import { FooterComponent } from 'src/app/shared';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, HeaderComponent, FooterComponent],
})
export class AboutPageComponent implements OnInit {
  // creating member variables
  cols = 4; // Amount of columns in the grid list.
  rowHeight = '300px'; // row height
  colspan = 1;
  rowspan = 1;

  constructor(private breakpointObserver: BreakpointObserver) {}

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
  }
}
