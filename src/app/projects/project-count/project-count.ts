import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// project service
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-count',
  templateUrl: './project-count.html',
  styleUrl: './project-count.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatTooltipModule],
})
export class ProjectCount {
  private readonly projectService = inject(ProjectService);

  // optional input override; if no provided, fetches automatically from ProjectService
  public readonly countInput = input<number | null>(null);

  // reactive fetched count from ProjectService
  private readonly fetchedCount = toSignal(
    this.projectService.getProjectCount(),
    {
      initialValue: 0,
    },
  );

  // effective count resolving input or fetched value
  public readonly count = computed(() => {
    const inputVal = this.countInput();
    return inputVal !== null ? inputVal : (this.fetchedCount() ?? 0);
  });

  // pluralization label
  public readonly label = computed(() => {
    return this.count() === 1 ? 'Project' : 'Projects';
  });
}
