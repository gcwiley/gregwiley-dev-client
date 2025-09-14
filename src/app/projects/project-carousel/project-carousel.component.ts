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
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule,
  ],
})
export class ProjectCarouselComponent {
  public projects = input<Project[]>([]);

  @ViewChild('projectCarouselWrapper', { read: ElementRef })
  projectCarouselWrapper?: ElementRef<HTMLDivElement>;

  public nextSlide(): void {
    const element = this.projectCarouselWrapper?.nativeElement;
    if (!element) return;
    const scrollAmount = element.clientWidth; // scroll by visible width
    element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  public previousSlide(): void {
    const element = this.projectCarouselWrapper?.nativeElement;
    if (!element) return;
    const scrollAmount = element.clientWidth;
    element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  public trackById(index: number, item: Project): string {
    return item._id;
  }
}
