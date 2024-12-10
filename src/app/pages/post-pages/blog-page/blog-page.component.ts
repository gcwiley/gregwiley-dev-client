import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, FooterComponent } from '../../../shared';

// import post components
import { PostListComponent, RecentPostsComponent } from '../../../posts';

@Component({
    selector: 'app-blog-page',
    templateUrl: './blog-page.component.html',
    styleUrl: './blog-page.component.scss',
    imports: [NavbarComponent, FooterComponent, PostListComponent, RecentPostsComponent]
})
export class BlogPageComponent {}
