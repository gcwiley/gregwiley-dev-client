import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// rxjs
import { Observable } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// shared components
import { Navbar, Menu, Footer, Hero } from '../../components';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

// project components
import { ProjectCarousel } from '../../projects';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    Navbar,
    Menu,
    Footer,
    ProjectCarousel,
    Hero,
    AsyncPipe,
  ],
})
export class HomePage implements OnInit {
  // inject dependencies
  private projectService = inject(ProjectService);

  public featuredProjects$!: Observable<Project[]>;

  public ngOnInit(): void {
    this.featuredProjects$ = this.projectService.getProjects();
  }
}
