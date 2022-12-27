import { EventEmitter, Injectable } from '@angular/core';

export interface DocSiteTheme {
  name: string;
  displayName?: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}

@Injectable()
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current-name';

  onThemeUpdate: EventEmitter<DocSiteTheme> = new EventEmitter<DocSiteTheme>();

  storeTheme(theme: DocSiteTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch (error) {
      console.error('Error message', error);
    }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemed(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch (error) {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (error) {
      console.error('Error message', error);
    }
  }
}
