import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, FooterComponent } from '../../../shared';

// import project components
import { ProjectDetailsComponent, ProjectDescriptionComponent, ProjectTagsComponent } from '../../../projects';

@Component({
   selector: 'app-project-details-page',
   templateUrl: './project-details-page.component.html',
   styleUrls: ['./project-details-page.component.scss'],
   standalone: true,
   imports: [
      NavbarComponent,
      FooterComponent,
      ProjectDetailsComponent,
      ProjectDescriptionComponent,
      ProjectTagsComponent,
   ],
})
export class ProjectDetailsPageComponent {}
