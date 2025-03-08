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
      private router: Router
   ) {}

   // create the signin form with email and password fields
   public signinForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
   });

   // Sign in with email and password, if successful, navigate authenicated user to the main page
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
         .subscribe(() => {
            // redirects user to homepage
            this.router.navigateByUrl('/');
         });
   }
}
