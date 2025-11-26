import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
})
export class Menu {
  // simple nav model so links are easy to change
  public navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
  ];

  public isMobileOpen = false;

  public toggleMobileMenu(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  public closeMobileMenu(): void {
    this.isMobileOpen = false;
  }
}
