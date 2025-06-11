import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatListModule, MatIconModule],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  project!: Project; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  
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
      return;
    }
    this.projectService
      .getProjectById(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (project) => {
          this.project = project;
        },
        error: (error) => {
          console.error('Error fetching project details:', error);
        },
      });
  }
}
