import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, throwError, map } from 'rxjs';

// firebase auth
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  user,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // injects the auth object
  private readonly auth = inject(Auth);

  // observable for the current user state (emits User object or null)
  public readonly user$: Observable<User | null> = user(this.auth);

  // observable for the authentication status (emits true if logged in, false otherwise)
  public readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user) // User|null to boolean
  )

  // asynchronously signs in using an email and password
  public signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(this.handleError)
    );
  }

  // authenticates a firebase client using a popup-based OAuth authentication flow
  public signInWithGoogle(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError(this.handleError)
    );
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
