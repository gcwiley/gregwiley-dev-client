import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {
  project!: Project; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  
  // inject dependencies
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
      console.error('Project ID not found in route parameters.');
      return;
    }
    this.projectService
      .getProjectById(id)
      .pipe(
        takeUntil(this.destroy$) // unsubscribe when component is destroyed
      )
      .subscribe({
        next: (project) => {
          this.project = project;
        },
        error: (error) => {
          console.error('Error fetching project description:', error);
        },
      });
  }
}
