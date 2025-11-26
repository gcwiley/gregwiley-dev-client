import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatIconModule } from '@angular/material/icon';

// shared components
import { Navbar, Footer } from '../../../components';

// project components
import { ProjectForm, RecentProjects } from '../../../projects';

@Component({
  selector: 'app-project-create-page',
  templateUrl: './project-create-page.html',
  styleUrls: ['./project-create-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectForm,
    RecentProjects,
    RouterModule,
    MatIconModule,
  ],
})
export class ProjectCreatePage {}
