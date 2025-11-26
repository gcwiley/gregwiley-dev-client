import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatIconModule } from '@angular/material/icon';

// shared components
import {
  Navbar,
  Footer,
} from '../../../components';

// project components
import {
  ProjectDetails,
  ProjectDescription,
} from '../../../projects';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.html',
  styleUrls: ['./project-details-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectDetails,
    ProjectDescription,
    RouterModule,
    MatIconModule,
],
})
export class ProjectDetailsPage {}
