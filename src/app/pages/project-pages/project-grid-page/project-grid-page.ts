import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { Navbar, Footer } from '../../../components';

// project components
import { ProjectGrid } from '../../../projects';

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
export class ProjectGridPage {}
