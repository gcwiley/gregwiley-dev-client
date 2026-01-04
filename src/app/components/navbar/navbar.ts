import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

// rxjs
import { Observable, map } from 'rxjs';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { Logo } from '../logo/logo';

// auth service
import { AuthService } from '../../services/auth.service';

// theme service
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    Logo
],
})
export class Navbar {
  // inject dependencies
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private themeService = inject(ThemeService);

  // expose authenticated status for template use
  public isAuthenticated: Observable<boolean> = this.authService.isAuthenticated$;

  // expose user email for template use
  public userEmail$: Observable<string | null> = this.authService.user$.pipe(
    map((user) => user?.email ?? null)
  );

  // signs out current user
  public onClickSignOut(): void {
    this.authService.signOutUser().subscribe({
      next: () => {
        this.snackBar.open('You have successfully signed out.', 'Close', { duration: 5000 }); // success feedback
        this.router.navigateByUrl('/signin'); // redirects user to signin page
      },
      error: (error) => {
        console.error('Error signing out:', error);
        this.snackBar.open('Error signing out. Please try again.', 'Close', { duration: 5000 }); // error feedback
      },
    });
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
