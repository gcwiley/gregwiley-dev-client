import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

// import the shared components
import {
  NavbarComponent,
  AnnouncementBannerComponent,
  AuthStatusComponent,
  FooterComponent,
} from '../../components';

// import the auth service
import { AuthService } from '../../services/auth.service';

// define constants for error messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Incorrect email or password.',
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
    NavbarComponent,
    AnnouncementBannerComponent,
    AuthStatusComponent,
    FooterComponent,
  ],
})
export class SigninComponent implements OnInit {
  public signinForm!: FormGroup;
  public isLoading = false;
  public errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // create the sign form with email and password fields
  private initializeForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // minimum password length
    });
  }

  // sign in with email and password, if successfull, navigate authenticated user to the home page
  public onSubmitSignIn(): void {
    this.errorMessage = null;
    if (this.signinForm.invalid) {
      return;
    }
  }
}
