import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
  Navbar,
  Footer,
} from '../../../components';

// project components
import {
  ProjectForm,
  RecentProjects,
} from '../../../projects';

@Component({
  standalone: true,
  selector: 'app-project-create-page',
  templateUrl: './project-create-page.html',
  styleUrls: ['./project-create-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectForm,
    RecentProjects,
  ],
})
export class ProjectCreatePage {}
