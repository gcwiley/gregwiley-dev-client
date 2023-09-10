import { Component } from '@angular/core';

// import shared components
import { HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent } from 'src/app/shared';

// import project grid
import { ProjectGridComponent } from 'src/app/projects';

@Component({
   selector: 'app-project-grid-page',
   templateUrl: './project-grid-page.component.html',
   styleUrls: ['./project-grid-page.component.scss'],
   standalone: true,
   imports: [HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent, ProjectGridComponent],
})
export class ProjectGridPageComponent {}
