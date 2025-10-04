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
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
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
export class Carousel implements AfterViewInit, OnDestroy {
  public projects = input<Project[]>([]);

  @ViewChild('projectCarouselWrapper', { read: ElementRef })
  projectCarouselWrapper?: ElementRef<HTMLDivElement>;

  private destroy$ = new Subject<void>();

  // autoplay configuration
  private autoplayId: number | null = null;
  private readonly autoplayIntervalMs = 5000;
  private isPaused = false;

  // visual state
  public activeIndex = 0;
  public canPrev = false;
  public canNext = false;

  private cdr = inject(ChangeDetectorRef)

  public ngAfterViewInit(): void {
    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) return;

    // update nav state on scroll (debounced)
    fromEvent(el, 'scroll')
      .pipe(debounceTime(60), takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateNavState();
      });

    // update on resize
    fromEvent(window, 'resize')
      .pipe(debounceTime(120), takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateNavState();
      });

    // initial state & start autoplay
    this.updateNavState();
    this.startAutoplay();
  }

  public ngOnDestroy(): void {
    this.stopAutoplay();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public nextSlide(): void {
    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) return;
    // scroll to next item (find next item's left)
    const children = Array.from(el.querySelectorAll('.project-carousel-item')) as HTMLElement[];
    if (children.length === 0) return;
    const targetIndex = Math.min(this.activeIndex + 1, children.length - 1);
    this.scrollToItem(children[targetIndex]);
  }

  public previousSlide(): void {
    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) return;
    const children = Array.from(el.querySelectorAll('.project-carousel-item')) as HTMLElement[];
    if (children.length === 0) return;
    const targetIndex = Math.max(this.activeIndex - 1, 0);
    this.scrollToItem(children[targetIndex]);
  }

  public goTo(index: number): void {
    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) return;
    const children = Array.from(el.querySelectorAll('.project-carousel-item')) as HTMLElement[];
    const safeIndex = Math.max(0, Math.min(index, children.length - 1));
    this.scrollToItem(children[safeIndex]);
  }

  private scrollToItem(item?: HTMLElement): void {
    if (!item) return;
    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) return;
    const left = Math.max(0, item.offsetLeft - (el.clientWidth - item.clientWidth) / 2);
    el.scrollTo({ left, behavior: 'smooth' });
    // update after animation
    setTimeout(() => this.updateNavState(), 320);
  }

  private updateNavState(): void {
    const el = this.projectCarouselWrapper?.nativeElement;
    if (!el) {
      this.canPrev = this.canNext = false;
      this.activeIndex = 0;
      this.cdr.markForCheck();
      return;
    }
    const { scrollLeft, clientWidth, scrollWidth } = el;
    this.canPrev = scrollLeft > 1;
    this.canNext = scrollLeft + clientWidth < scrollWidth - 1;

    // compute active index by nearest center
    const children = Array.from(el.querySelectorAll('.project-carousel-item')) as HTMLElement[];
    if (children.length === 0) {
      this.activeIndex = 0;
      this.cdr.markForCheck();
      return;
    }
    const center = scrollLeft + clientWidth / 2;
    let bestIndex = 0;
    let bestDist = Infinity;
    children.forEach((ch, idx) => {
      const chCenter = ch.offsetLeft + ch.offsetWidth / 2;
      const dist = Math.abs(center - chCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = idx;
      }
    });
    this.activeIndex = bestIndex;
    this.cdr.markForCheck();
  }

  // autoplay controls
  private startAutoplay(): void {
    if (this.autoplayId !== null || this.isPaused) return;
    if (!this.projectCarouselWrapper) return;
    if ((this.projects?.length || 0) <= 1) return;
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

  // called from template on mouseenter
  public pauseAutoplay(): void {
    this.isPaused = true;
    this.stopAutoplay();
  }

  // called from template on mouseleave
  public resumeAutoplay(): void {
    this.isPaused = false;
    this.startAutoplay();
  }

  // keyboard support
  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousSlide();
    }
  }

  public trackById(index: number, item: Project): string {
    return item._id;
  }
}