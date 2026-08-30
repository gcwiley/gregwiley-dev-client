import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

// project interface
import { Project } from '../../types/project.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.html',
  styleUrl: './recent-projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    RouterLink
],
})
export class RecentProjects {
  public readonly recentProjects = input.required<Project[]>();
}
