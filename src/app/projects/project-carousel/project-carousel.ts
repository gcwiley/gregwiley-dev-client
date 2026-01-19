import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  input,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  NgZone,
  computed,
} from '@angular/core';

import { RouterModule } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// rxjs
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

// project interface
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-carousel',
  templateUrl: './project-carousel.html',
  styleUrl: './project-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class ProjectCarousel implements AfterViewInit, OnDestroy {
  public readonly projects = input<Project[]>([]);

  // Computed signal for cleaner template access
  protected readonly hasMultipleProjects = computed(
    () => this.projects().length > 1
  );

  @ViewChild('projectCarouselWrapper', { read: ElementRef })
  private projectCarouselWrapper?: ElementRef<HTMLDivElement>;

  private readonly destroy$ = new Subject<void>();
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);

  // autoplay configuration
  private autoplayId: ReturnType<typeof setInterval> | null = null;
  private readonly autoplayIntervalMs = 5000;
  private isPaused = false;

  // visual state
  protected activeIndex = 0;
  protected canPrev = false;
  protected canNext = false;

  public ngAfterViewInit(): void {
    const element = this.projectCarouselWrapper?.nativeElement;
    if (!element) return;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(element, 'scroll')
        .pipe(debounceTime(60), takeUntil(this.destroy$))
        .subscribe(() => {
          this.ngZone.run(() => this.updateNavState());
        });

      fromEvent(window, 'resize')
        .pipe(debounceTime(120), takeUntil(this.destroy$))
        .subscribe(() => {
          this.ngZone.run(() => this.updateNavState());
        });
    });

    // Delay initial state update to ensure DOM is ready
    requestAnimationFrame(() => {
      this.updateNavState();
      this.startAutoplay();
    });
  }

  public ngOnDestroy(): void {
    this.stopAutoplay();
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected nextSlide(): void {
    const children = this.getCarouselItems();
    if (children.length === 0) return;

    const targetIndex =
      this.activeIndex >= children.length - 1 ? 0 : this.activeIndex + 1;
    this.scrollToItem(children[targetIndex]);
  }

  protected previousSlide(): void {
    const children = this.getCarouselItems();
    if (children.length === 0) return;

    const targetIndex =
      this.activeIndex <= 0 ? children.length - 1 : this.activeIndex - 1;
    this.scrollToItem(children[targetIndex]);
  }

  protected goTo(index: number): void {
    const children = this.getCarouselItems();
    if (children.length === 0) return;

    const safeIndex = Math.max(0, Math.min(index, children.length - 1));
    this.scrollToItem(children[safeIndex]);
  }

  protected pauseAutoplay(): void {
    this.isPaused = true;
    this.stopAutoplay();
  }

  protected resumeAutoplay(): void {
    this.isPaused = false;
    this.startAutoplay();
  }

  protected trackById(_index: number, item: Project): string {
    return item._id;
  }

  // Extract repeated DOM query into helper method
  private getCarouselItems(): HTMLElement[] {
    const element = this.projectCarouselWrapper?.nativeElement;
    if (!element) return [];

    return Array.from(
      element.querySelectorAll('.project-carousel-item')
    ) as HTMLElement[];
  }

  private scrollToItem(item?: HTMLElement): void {
    if (!item) return;

    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) return;

    const left = Math.max(
      0,
      item.offsetLeft - (el.clientWidth - item.clientWidth) / 2
    );
    el.scrollTo({ left, behavior: 'smooth' });

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setTimeout(() => this.updateNavState(), 300);
    });
  }

  private updateNavState(): void {
    const element = this.projectCarouselWrapper?.nativeElement;
    if (!element) {
      this.canPrev = this.canNext = false;
      this.activeIndex = 0;
      this.cdr.markForCheck();
      return;
    }

    const { scrollLeft, clientWidth, scrollWidth } = element;
    this.canPrev = scrollLeft > 1;
    this.canNext = scrollLeft + clientWidth < scrollWidth - 1;

    // Compute active index by nearest center
    const children = this.getCarouselItems();
    if (children.length === 0) {
      this.activeIndex = 0;
      this.cdr.markForCheck();
      return;
    }

    const center = scrollLeft + clientWidth / 2;
    let bestIndex = 0;
    let bestDist = Infinity;

    for (let idx = 0; idx < children.length; idx++) {
      const child = children[idx];
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = idx;
      }
    }

    this.activeIndex = bestIndex;
    this.cdr.markForCheck();
  }

  private startAutoplay(): void {
    if (this.autoplayId !== null || this.isPaused) return;
    if (!this.projectCarouselWrapper) return;
    if (this.projects().length <= 1) return;

    this.autoplayId = setInterval(() => {
      this.nextSlide();
    }, this.autoplayIntervalMs);
  }

  private stopAutoplay(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = null;
    }
  }

  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.goTo(this.projects().length - 1);
        break;
    }
  }
}