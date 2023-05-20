import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin-page.component.html',
	styleUrls: ['./signin-page.component.scss'],
})
export class SigninComponent implements OnInit {
	// inject the router, form builder, and auth service
	constructor(private router: Router, private authService: AuthService) {}

	signinForm!: FormGroup;

	ngOnInit(): void {
		// create the sign in form with email and password fields
		this.signinForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	// Sign in with email and password
	// if successful, navigate user to the main page
	onSubmitSignIn() {
		this.authService
			.SigninUserwithEmailAndPassword(
				this.signinForm.value.email!,
				this.signinForm.value.password!,
			)
			.then(() => {
				// navigates user to the main page
				this.router.navigateByUrl('/');
			})
			// if error, display the error message
			.catch((error) => {
				window.alert(error.message);
			});
	}
}
