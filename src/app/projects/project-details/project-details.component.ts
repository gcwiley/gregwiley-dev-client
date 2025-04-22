import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule, MatListModule, MatCardModule],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  project: Project | undefined; // initialize explicitly
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
      console.error('Project ID not found is route parameters');
      // optionally navigate away or show an error message
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
          // may need changeDetectorRef.markForCheck() with OnPush
        },
        error: (error) => {
          console.error('Error fetching project details:', error);
          this.project = undefined; // ensure project is undefined on error
        },
      });
  }
}
