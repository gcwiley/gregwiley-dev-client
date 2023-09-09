import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// import shared components
import { HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent } from 'src/app/shared';

// import post list and recent posts components
import { PostListComponent, RecentPostsComponent } from 'src/app/posts';

@Component({
   selector: 'app-blog-page',
   templateUrl: './blog-page.component.html',
   styleUrls: ['./blog-page.component.scss'],
   standalone: true,
   imports: [HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent],
})
export class BlogPageComponent {}
