import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { Navbar, Footer } from '../../../components';

// project components
import { ProjectGrid } from '../../../projects';

// import project service and interface
import { ProjectService } from '../../../services/project.service';
// import { Project } from '../../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-grid-page',
  templateUrl: './project-grid-page.html',
  styleUrls: ['./project-grid-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    Navbar,
    Footer,
    ProjectGrid,
  ],
})
export class ProjectGridPage {
  // inject services
  private projectService = inject(ProjectService);
  private router = inject(Router);
}
