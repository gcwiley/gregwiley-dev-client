import { Component, Input } from '@angular/core';

// import pipe
import { SimpleTruncatePipe } from 'src/app/pipes/simple-truncate.pipe';

// import angular material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// import the product type
import { Project } from 'src/app/types/project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, SimpleTruncatePipe],
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
