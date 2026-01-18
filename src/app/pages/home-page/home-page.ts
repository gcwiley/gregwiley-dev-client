import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { Observable } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// shared components
import { Navbar, Footer, Hero } from '../../components';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

// project components
import { ProjectCarousel } from '../../projects';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    Navbar,
    Footer,
    ProjectCarousel,
    Hero,
  ],
})
export class HomePage {
  // inject dependencies
  private readonly projectService = inject(ProjectService);

  // expose observable directly;
  public readonly featuredProjects$: Observable<Project[]> =
    this.projectService.getProjects();
}
