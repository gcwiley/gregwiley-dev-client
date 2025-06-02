import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent, FooterComponent } from '../../../components';

// project components
import { ProjectDetailsComponent, ProjectDescriptionComponent } from '../../../projects';

@Component({
  standalone: true,
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    FooterComponent,
    ProjectDetailsComponent,
    ProjectDescriptionComponent,
  ],
})
export class ProjectDetailsPageComponent {}
