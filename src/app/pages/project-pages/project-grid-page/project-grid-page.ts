import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// shared components
import { Navbar, Footer } from '../../../components';

// project components
import { ProjectGrid } from '../../../projects';

// project service and interface
import { ProjectService } from '../../../services/project.service';
// import { Project } from '../../../types/project.interface';

@Component({
  selector: 'app-project-grid-page',
  templateUrl: './project-grid-page.html',
  styleUrls: ['./project-grid-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectGrid,
  ],
})
export class ProjectGridPage {
  // inject dependencies
  private projectService = inject(ProjectService);
  private router = inject(Router);
}
