import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
   FooterComponent,
} from '../../components';

// import the auth service
import { AuthService } from '../../services/auth.service';

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
      FooterComponent,
   ],
})
export class SigninComponent {
   constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private snackbar: MatSnackBar
   ) {}

   // create the signin form with email and password fields
   public signinForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
   });

   // sign in with email and password, if successfull, navigate authenicated user to the home page
   public onSubmitSignIn(): void {
      // if the form has validation errors, it returns early without doing anything
      if (this.signinForm.invalid) {
         return;
      }

      this.authService
         .signInWithEmailAndPassword(
            this.signinForm.value.email!,
            this.signinForm.value.password!
         )
         .subscribe({
            next: () => {
               // navigates user to homepage
               this.router.navigateByUrl('/');
            },
            error: () => {
               this.snackbar.open('Unable to sign in', 'CLOSE', {
                  duration: 3000,
               });
            },
         });
   }
}
