import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// project interface
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-carousel',
  templateUrl: './project-carousel.component.html',
  styleUrl: './project-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ProjectCarouselComponent {
  public projects = input<Project[]>([]);

  @ViewChild('projectCarouselWrapper')
  projectCarouselWrapper!: ElementRef<HTMLDivElement>;

  public nextSlide(): void {
    const scrollAmount = this.projectCarouselWrapper.nativeElement.offsetWidth;
    this.projectCarouselWrapper.nativeElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  public previousSlide(): void {
    const scrollAmount = this.projectCarouselWrapper.nativeElement.offsetWidth;
    this.projectCarouselWrapper.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }
}
