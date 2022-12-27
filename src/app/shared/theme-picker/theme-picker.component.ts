import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { StyleManager } from '../style-manager/style-manager';
import { DocSiteTheme, ThemeStorage } from './theme-storage/theme.storage';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  private _queryParamSubscription = Subscription.EMPTY;
  currentTheme: DocSiteTheme | undefined;

  // The below colors need to align with the colors in the theme-picker.scss file
  themes: DocSiteTheme[] = [
    {
      primary: '#1976d2',
      accent: '#d32f2f',
      displayName: 'Indigo/Pink',
      name: 'indigo-pink',
      isDark: false,
    },
    {
      primary: '#303f9f',
      accent: '#c2185b',
      displayName: 'Deep Purple/Pink',
      name: 'deeppurple-amber',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#00796b',
      accent: '#388e3c',
      displayName: 'Teal/Green',
      name: 'teal-green',
      isDark: true,
    },
    {
      primary: '#5d4037',
      accent: '#8d6e63',
      displayName: 'Brown/Blue Grey',
      name: 'brown-bluegrey',
      isDark: true,
    },
  ];

  constructor(
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage,
    private _activatedRoute: ActivatedRoute,
    private liveAnnouncer: LiveAnnouncer,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'theme-example',
      sanitizer.bypassSecurityTrustUrl('assets/img/theme-demo-icon.sng')
    );

    const themeName = this._themeStorage.getStoredThemed();

    if (themeName) {
      this.selectTheme(themeName);
    } else {
      this.themes.find((themes) => {
        this.selectTheme(themes.name);
      });
    }
  }

  ngOnInit(): void {
    this._queryParamSubscription = this._activatedRoute.queryParamMap
      .pipe(map((params: ParamMap) => params.get('theme')))
      .subscribe((themeName: string | null) => {
        if (themeName) {
          this.selectTheme(themeName);
        }
      });
  }

  ngOnDestroy(): void {
    this._queryParamSubscription.unsubscribe();
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.liveAnnouncer.announce(
        `${theme.displayName} theme selected.`,
        'polite',
        3000
      );
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }
}
