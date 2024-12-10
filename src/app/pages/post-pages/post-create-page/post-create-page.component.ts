import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, FooterComponent } from '../../../shared';

// import post components
import { PostFormComponent, RecentPostsComponent } from '../../../posts';

@Component({
    selector: 'app-post-create-page',
    templateUrl: './post-create-page.component.html',
    styleUrl: './post-create-page.component.scss',
    imports: [NavbarComponent, FooterComponent, PostFormComponent, RecentPostsComponent]
})
export class PostCreatePageComponent {}
