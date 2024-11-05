import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// import angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared';

// import the auth service fix this!
import { AuthService } from '../../services/auth.service';

// Signin Component
@Component({
   standalone: true,
   selector: 'app-signin',
   templateUrl: './signin-page.component.html',
   styleUrls: ['./signin-page.component.scss'],
   imports: [
      CommonModule,
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
   year = new Date().getFullYear();

   formBuilder = inject(FormBuilder);

   // inject the router and the auth service
   constructor(private router: Router, private auth: AuthService) {}

   // create the signin form with email and password fields
   signinForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required],
   });

   // Sign in with email and password
   // if successful, navigate admin to the main page
   onSubmitSignIn() {
      this.auth.SignInWithEmailAndPassword(this.signinForm.value.email ?? '', this.signinForm.value.password ?? '');
   }
}
