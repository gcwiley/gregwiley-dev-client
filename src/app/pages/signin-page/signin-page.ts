import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// rxjs
import { catchError, of } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

// auth service
import { AuthService } from '../../services/auth.service';

// constants
import { SNACK_BAR_DURATION_MS } from '../../constants/ui.constants';

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  NETWORK_ERROR: 'A network error occurred. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

@Component({
  selector: 'app-signin',
  templateUrl: './signin-page.html',
  styleUrls: ['./signin-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SigninPage implements OnInit {
  public readonly isLoading = signal(false);
  public readonly showPassword = signal(false);
  public readonly googleLoading = signal(false);
  public readonly errorMessage = signal<string | null>(null);
  public readonly year = new Date().getFullYear();

  public signinForm!: FormGroup;

  // inject dependencies
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public toggleShowPassword(): void {
    this.showPassword.update((show) => !show);
  }

  public onSubmitSignIn(): void {
    this.errorMessage.set(null);

    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { email, password } = this.signinForm.value;

    this.authService
      .signInWithEmailAndPassword(email, password)
      .pipe(
        catchError((error) => {
          const message = this.getErrorMessage(error.code);
          this.errorMessage.set(message);
          return of(null);
        }),
      )
      .subscribe({
        next: (user) => {
          this.isLoading.set(false);
          if (user) {
            this.router.navigateByUrl('/');
          } else if (this.errorMessage()) {
            this.snackBar.open(this.errorMessage()!, 'Close', {
              duration: SNACK_BAR_DURATION_MS,
            });
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.snackBar.open(ERROR_MESSAGES.UNKNOWN_ERROR, 'Close', {
            duration: SNACK_BAR_DURATION_MS,
          });
        },
      });
  }

  public onSignInWithGoogle(): void {
    if (this.googleLoading()) return;

    this.googleLoading.set(true);

    this.authService
      .signInWithGoogle()
      .pipe(
        catchError((error) => {
          console.error('Google sign-in error', error);
          this.snackBar.open(
            'Google sign-in failed. Please try again.',
            'Close',
            {
              duration: SNACK_BAR_DURATION_MS,
            },
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

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return ERROR_MESSAGES.INVALID_CREDENTIALS;
      case 'auth/network-request-failed':
        return ERROR_MESSAGES.NETWORK_ERROR;
      default:
        return ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  public get formControls(): Record<string, AbstractControl> {
    return this.signinForm.controls;
  }
}
