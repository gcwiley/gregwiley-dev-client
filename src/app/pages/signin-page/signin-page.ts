import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

// rxjs
import { catchError, of } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

// auth service
import { AuthService } from '../../services/auth.service';

// constants
import { SNACK_BAR_DURATION_MS } from '../../constants/ui.constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin-page.html',
  styleUrl: './signin-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
})
export class SignInPage {
  public readonly googleLoading = signal(false);
  public readonly year = new Date().getFullYear();

  // inject dependencies
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  public onSignInWithGoogle(): void {
    if (this.googleLoading()) return;

    this.googleLoading.set(true);

    this.authService
      .signInWithGoogle()
      .pipe(
        catchError((error) => {
          console.error('Google sign-in error', error);
          this.snackBar.open(
            error?.message ?? 'Google sign-in failed. Please try again.',
            'Close',
            { duration: SNACK_BAR_DURATION_MS },
          );
          return of(null);
        }),
      )
      .subscribe({
        next: (credential) => {
          this.googleLoading.set(false);
          if (credential) {
            this.router.navigateByUrl('/');
          }
        },
        error: () => {
          this.googleLoading.set(false);
        },
      });
  }
}
