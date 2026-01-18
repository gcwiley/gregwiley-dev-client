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
import { MatDividerModule } from '@angular/material/divider';

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
    AsyncPipe,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
],
})
export class Navbar {
  // inject dependencies
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly themeService = inject(ThemeService);

  // expose authenticated status for template use
  public readonly isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

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
