import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

// angular material
import { MatIconModule } from '@angular/material/icon';

// shared components
import { Navbar, Footer } from '../../../components';

// project service
import { ProjectService } from '../../../services/project.service';

// project components
import { ProjectForm, RecentProjects } from '../../../projects';

@Component({
  selector: 'app-project-form-page',
  templateUrl: './project-form-page.html',
  styleUrl: './project-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectForm,
    RecentProjects,
    RouterModule,
    MatIconModule,
  ],
})
export class ProjectFormPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  public readonly isEditMode = signal(false);

  // fetch recent projects reactively into a Signal
  public readonly recentProjects = toSignal(
    this.projectService.getRecentlyCreatedProjects(),
    { initialValue: [] },
  );

  public ngOnInit(): void {
    this.isEditMode.set(this.route.snapshot.paramMap.has('id'));
  }
}
