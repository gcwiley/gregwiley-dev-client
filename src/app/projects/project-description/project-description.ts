import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// project interface
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.html',
  styleUrl: './project-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ProjectDescription {
  public readonly project = input.required<Project>();
}
