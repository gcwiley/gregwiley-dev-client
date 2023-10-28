import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// import angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

// import the post service
import { PostService } from 'src/app/services/post.service';

// import the post interface
import { Post } from 'src/app/types/post.interface';

@Component({
   selector: 'app-post-grid',
   templateUrl: './post-grid.component.html',
   styleUrls: ['./post-grid.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      RouterModule,
      MatGridListModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule
   ]
})
export class PostGridComponent implements OnInit {
     // creating member variables
  posts: Post[] = [];

  // set up the grid list demensions
  cols = 4; // Amount of columns in the grid list.
  rowHeight = '250px'; // row height
  gutterSize = '0px';

  // set up the grid list dimensions
  colspan = 1; // comment
  rowspan = 1; // comment

  constructor(
    private postService: PostService,
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
    this.getPosts();
    this.layoutChanges();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
