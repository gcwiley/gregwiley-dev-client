import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  standalone: true,
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.html',
  styleUrls: ['./project-details-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectDetails,
    ProjectDescription,
  ],
})
export class ProjectDetailsPage {}
