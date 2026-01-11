import { Injectable, RendererFactory2, Renderer2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private overlayContainer = inject(OverlayContainer);

  private renderer!: Renderer2;
  private readonly LIGHT_THEME_CLASS = 'light-theme';
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly STORAGE_KEY = 'isDarkMode';

  // reactive state management
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  public isDark$ = this.isDarkSubject.asObservable(); // expose as observable

  constructor() {
    // initialize renderer
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // check storage on initialization
    const storedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (storedTheme) {
      const isDark = storedTheme === 'true';
      this.isDarkSubject.next(isDark);
      this.updateTheme(isDark);
    }
  }

  public toggleTheme(): void {
    const newStatus = !this.isDarkSubject.value;
    this.isDarkSubject.next(newStatus);
    localStorage.setItem(this.STORAGE_KEY, newStatus.toString());
    this.updateTheme(newStatus);
  }

  public isDarkMode(): boolean {
    return this.isDarkSubject.value;
  }

  private updateTheme(isDark: boolean): void {
    const overlayClassList =
      this.overlayContainer.getContainerElement().classList;

    if (isDark) {
      this.renderer.addClass(this.document.body, this.DARK_THEME_CLASS);
      this.renderer.removeClass(this.document.body, this.LIGHT_THEME_CLASS);
      overlayClassList.add(this.DARK_THEME_CLASS);
      overlayClassList.remove(this.LIGHT_THEME_CLASS);
    } else {
      this.renderer.addClass(this.document.body, this.LIGHT_THEME_CLASS);
      this.renderer.removeClass(this.document.body, this.DARK_THEME_CLASS);
      overlayClassList.add(this.LIGHT_THEME_CLASS);
      overlayClassList.remove(this.DARK_THEME_CLASS);
    }
  }
}
