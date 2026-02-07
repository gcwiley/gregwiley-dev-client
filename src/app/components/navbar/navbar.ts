import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// rxjs
import { Observable, map } from 'rxjs';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

// constants
import { SNACK_BAR_DURATION } from '../../constants/ui.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly themeService = inject(ThemeService);

  public readonly isDark$ = this.themeService.isDark$;

  public readonly isAuthenticated$: Observable<boolean> =
    this.authService.isAuthenticated$;

  public readonly userEmail$: Observable<string | null> =
    this.authService.user$.pipe(map((user) => user?.email ?? null));

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public onClickSignOut(): void {
    this.authService.signOutUser().subscribe({
      next: () => {
        this.snackBar.open('You have successfully signed out.', 'Close', {
          duration: SNACK_BAR_DURATION,
        });
        this.router.navigateByUrl('/signin');
      },
      error: (error) => {
        console.error('Error signing out:', error);
        this.snackBar.open('Error signing out. Please try again.', 'Close', {
          duration: SNACK_BAR_DURATION,
        });
      },
    });
  }
}
