import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// shared components
import { NavbarComponent, FooterComponent } from '../../../components';

// project components
import { ProjectDetailsComponent, ProjectDescriptionComponent } from '../../../projects';

// project service and interface
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    FooterComponent,
    ProjectDetailsComponent,
    ProjectDescriptionComponent,
    RouterModule,
  ],
})
export class ProjectDetailsPageComponent implements OnInit, OnDestroy {
  project!: Project; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction

  // inject depdencies
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public ngOnInit(): void {
    this.getProjectById();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getProjectById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Project ID not found in route parameters');
      return;
    }
    this.projectService
      .getProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project) => {
          this.project = project;
        },
        error: (error) => {
          console.error('Error fetching project data:', error);
        },
      });
  }
}
