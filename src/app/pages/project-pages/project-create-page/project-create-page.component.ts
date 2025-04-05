import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import {
  HeaderComponent,
  AnnouncementBannerComponent,
  AuthStatusComponent,
  FooterComponent,
} from '../../../components';

// import the project components
import { ProjectFormComponent, RecentProjectsComponent } from '../../../projects';

@Component({
  standalone: true,
  selector: 'app-project-create-page',
  templateUrl: './project-create-page.component.html',
  styleUrls: ['./project-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProjectFormComponent,
    RecentProjectsComponent,
    AnnouncementBannerComponent,
    AuthStatusComponent,
  ],
})
export class ProjectCreatePageComponent {}
