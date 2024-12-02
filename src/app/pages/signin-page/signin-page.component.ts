import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { from } from 'rxjs';

// import firebase auth
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared';

// Signin Component
@Component({
   standalone: true,
   selector: 'app-signin',
   templateUrl: './signin-page.component.html',
   styleUrls: ['./signin-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      ReactiveFormsModule,
      NgIf,
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
   // create the signin form with email and password fields
   public signinForm = this.formBuilder.nonNullable.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
   });

   // inject the router, form builder, and the firebase auth
   constructor(private router: Router, private formBuilder: FormBuilder, private auth: Auth) {}

   // Sign in with email and password, if successful, navigate admin to the main page
   public onSubmitSignIn(): void {
      // error checking code
      if (this.signinForm.invalid) {
         return;
      }

      from(signInWithEmailAndPassword(this.auth, this.signinForm.controls.email.value, this.signinForm.controls.password.value)).subscribe(
         () => {
            this.router.navigate(['/']);
         }
      );
   }
}
