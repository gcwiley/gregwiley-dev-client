import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, throwError } from 'rxjs';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  signInAnonymously,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // injects the auth object
  private readonly auth = inject(Auth);

  // comment here!

  // creates a new user account associated with the specified email address and password
  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(this.handleError)
    );
  }

  // asynchronously signs in using an email and password
  public signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(this.handleError)
    );
  }

  // authenticates a firebase client using a popul-based OAuth authentication flow
  public signInWithGoogle(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError(this.handleError)
    );
  }

  // Asynchronously signs in as an anonymous user.
  public signInAnonymously(): Observable<UserCredential> {
    return from(signInAnonymously(this.auth)).pipe(catchError(this.handleError));
  }

  // signs out the current user. - does not return any specific user data.
  public signOutUser(): Observable<void> {
    return from(signOut(this.auth)).pipe(catchError(this.handleError));
  }

  // private method that centralizes error handling
  private handleError(error: Error): Observable<never> {
    // use a logging service instead of console.error
    // replace this with a more robust logging mechanism - a dedicated logging service
    // logs error to console
    console.error('There was an error', error);
    // throws the error again, so the subscriber can catch it and handle it.
    return throwError(() => error);
  }
}
