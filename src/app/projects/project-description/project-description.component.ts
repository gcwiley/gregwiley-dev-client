import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule],
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {
  project!: Project; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  public hasError = false;
  public isLoading = false;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

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
      this.hasError = true;
      this.isLoading = false;
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
          this.hasError = true;
          console.error('Error fetching project description:', error);
        },
      });
  }
}
