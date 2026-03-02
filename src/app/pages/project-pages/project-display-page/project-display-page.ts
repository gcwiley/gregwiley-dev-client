import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { Navbar, Footer } from '../../../components';

// project components
import { ProjectGrid } from '../../../projects';

@Component({
  selector: 'app-project-display-page',
  templateUrl: './project-display-page.html',
  styleUrl: './project-display-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Footer, ProjectGrid],
})
export class ProjectDisplayPage {}
