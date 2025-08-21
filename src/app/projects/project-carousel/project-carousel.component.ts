import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material

@Component({
  standalone: true,
  selector: 'app-project-carousel',
  templateUrl: './project-carousel.component.html',
  styleUrl: './project-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ProjectCarouselComponent {}
