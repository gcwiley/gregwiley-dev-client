import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	// inject the auth service from firebase auth module in the constructor method
	// use the auth service to sign in and sign out users
	constructor(private auth: AngularFireAuth) {}

	// Sign in a user with an email address and password with firebase auth service and observable
	// returns a promise that resolves when the user is signed in
	SigninUserwithEmailAndPassword(
		email: string,
		password: string
	): Promise<firebase.auth.UserCredential> {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	// signs out the current user with firebase auth service.
	SignOutUser(): Promise<void> {
		return this.auth.signOut();
	}
}
