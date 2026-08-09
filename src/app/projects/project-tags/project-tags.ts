import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// angular material
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-tags',
  templateUrl: './project-tags.html',
  styleUrl: './project-tags.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, MatIconModule],
})
export class ProjectTags {
  @Input() tags: string[] = [];
}
