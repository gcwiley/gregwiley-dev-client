import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
  AnnouncementBannerComponent,
  NavbarComponent,
  AuthStatusComponent,
  FooterComponent,
} from '../../../components';

// project components
import { ProjectFormComponent, RecentProjectsComponent } from '../../../projects';

@Component({
  standalone: true,
  selector: 'app-project-create-page',
  templateUrl: './project-create-page.component.html',
  styleUrls: ['./project-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FooterComponent,
    ProjectFormComponent,
    RecentProjectsComponent,
    AnnouncementBannerComponent,
    AuthStatusComponent,
    NavbarComponent,
  ],
})
export class ProjectCreatePageComponent {}
