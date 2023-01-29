import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Signin Component
@Component({
  selector: 'app-signin',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninComponent {
  hide = true;

  signinForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  // Sign in with email and password - FIX THIS!
  onSubmitSignIn() {
    console.log('Email', this.signinForm.value.email);
    console.log('Password', this.signinForm.value.password);
    // sign in with email and password using firebase auth
    this.auth
      .signInWithEmailAndPassword(
        // FIX THIS!
        this.signinForm.value.email,
        this.signinForm.value.password
      )
      .then((user) => {
        // sign in successful
        console.log('Sign in successful', user);
        this.router.navigate(['/']);
      })
      // sign in error
      .catch((error) => {
        console.log('Sign in error', error);
      });
  }
}
