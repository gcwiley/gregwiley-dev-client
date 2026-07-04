import {
  Directive,
  HostBinding,
  HostListener,
  inject,
  input,
  signal,
  computed,
} from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Directive({
  selector: '[appScrollFab]',
})
export class ScrollFabDirective {
  // configurable scroll threshold (px) before the button appears
  public threshold = input<number>(300);

  private readonly document = inject(DOCUMENT);
  private readonly scrollY = signal(0);

  // computed visibility - reacts automatically when scrollY or threshold changes
  protected readonly isVisible = computed(
    () => this.scrollY() > this.threshold(),
  );

  // bind the host element's visibility to the computed signal
  @HostBinding('style.display')
  get display(): string {
    return this.isVisible() ? 'flex' : 'none';
  }

  // update scroll position on every window scroll event
  // angular automatically removes this listener when the directive is destroyed
  @HostListener('window:scroll')
  public onScroll(): void {
    const doc = this.document.documentElement;
    this.scrollY.set(doc.scrollTop || this.document.body.scrollTop);
  }

  // scroll to top when the FAB is clicked
  @HostListener('click')
  public scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
