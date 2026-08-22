import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// project interface
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatIconModule, MatCardModule],
})
export class ProjectDetails {
  public readonly project = input.required<Project>()
}
