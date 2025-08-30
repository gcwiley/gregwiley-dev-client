import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavbarComponent, MenuComponent, FooterComponent } from '../../../components';

// project components
import { ProjectGridComponent } from '../../../projects';

@Component({
  standalone: true,
  selector: 'app-project-grid-page',
  templateUrl: './project-grid-page.component.html',
  styleUrls: ['./project-grid-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    NavbarComponent,
    MenuComponent,
    FooterComponent,
    ProjectGridComponent,
  ],
})
export class ProjectGridPageComponent {}
