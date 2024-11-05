import { Component } from '@angular/core';

// import the shared components
import { HeaderComponent, AnnouncementBannerComponent, FooterComponent } from '../../../shared';

// import the project components
import { ProjectFormComponent, RecentProjectsComponent } from '../../../projects';

@Component({
   standalone: true,
   selector: 'app-project-create-page',
   templateUrl: './project-create-page.component.html',
   styleUrls: ['./project-create-page.component.scss'],
   imports: [
      HeaderComponent,
      AnnouncementBannerComponent,
      FooterComponent,
      ProjectFormComponent,
      RecentProjectsComponent,
   ],
})
export class ProjectCreatePageComponent {}
