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

@Component({
   selector: 'app-post-grid',
   templateUrl: './post-grid.component.html',
   styleUrls: ['./post-grid.component.scss'],
   standalone: true,
})
export class PostGridComponent implements OnInit {
   
}
