import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

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

// define constants for error messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  NETWORK_ERROR: 'A network error occurred. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
})
export class SigninComponent implements OnInit {
  public signinForm!: FormGroup;
  public isLoading = false;
  public errorMessage: string | null = null;
  public showPassword = false; // to toggle password on/off

  // inject dependencies
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  public ngOnInit(): void {
    this.initializeForm();
  }

  // create the signin form with email and password fields
  private initializeForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Example: Minimum password length
    });
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  // sign in with email and password, if successfull, navigate authenicated user to the home page
  public onSubmitSignIn(): void {
    this.errorMessage = null;
    if (this.signinForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.signinForm.value;

    this.authService
      .signInWithEmailAndPassword(email, password)
      .pipe(
        catchError((error) => {
          let message = ERROR_MESSAGES.UNKNOWN_ERROR;
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            message = ERROR_MESSAGES.INVALID_CREDENTIALS;
          } else if (error.code === 'auth/network-request-failed') {
            message = ERROR_MESSAGES.NETWORK_ERROR;
          }
          this.errorMessage = message;
          return of(null); // Return an observable of null to continue the stream
        })
      )
      .subscribe({
        next: (user) => {
          this.isLoading = false;
          if (user) {
            this.router.navigateByUrl('/');
          } else {
            this.snackBar.open(this.errorMessage!, 'CLOSE');
          }
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open(ERROR_MESSAGES.UNKNOWN_ERROR, 'CLOSE');
        },
      });
  }

  // Getter for easy access to form controls in the template
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  get formControls(): { [key: string]: AbstractControl } {
    return this.signinForm.controls;
  }
}
