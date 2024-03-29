import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// import anguar material components
import { MatButtonModule } from '@angular/material/button';

const STORAGE_KEY = 'docs-cookies';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrls: ['./cookie-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class CookiePopupComponent {
  // whether the user has accepted the cookie disclaimer
  hasAccepted!: boolean;

  constructor() {
    // needs to be a try/catch, because some browsers will throw error when using
    // local storage in private mode
    try {
      this.hasAccepted = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (error) {
      this.hasAccepted = false;
    }
  }

  // accepts the cookie disclaimer
  accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      this.hasAccepted = true;
    }
  }
}
