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
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // inject the auth object
  private readonly auth = inject(Auth);

  // observable for the current user state (emits User object or null)
  public readonly user$: Observable<User | null> = user(this.auth);

  // observable for the authentication status (emits true if logged in, false otherwise)
  public readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user)
  );

  // asynchronously signs in using an email and password - SIGN IN
  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // authenticates a firebase client using a popup-based OAuth authentication flow - SIGN IN WITH GOOGLE
  public signInWithGoogle(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // signs out the current user. - SIGN OUT CURRENT USER
  public signOutUser(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((error) => this.handleError(error)) // safer syntax
    );
  }

  // send a password reset email to a user - RESET USER PASSWORD
  public sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // allow authenicated users to change their password - CHANGE USER PASSWORD
  public changePassword(newPassword: string): Observable<void> {
    // get the current user
    const currentUser = this.auth.currentUser;

    if (currentUser) {
      // use the updatePassword function with the current user and new password
      return from(updatePassword(currentUser, newPassword)).pipe(
        catchError((error) => this.handleError(error))
      );
    } else {
      // if there's no current user, throw an error
      return throwError(() => new Error('No user is currently logged in.'));
    }
  }

  // delete the current user's account - DELETE USER ACCOUNT
  // for GDPR compliance and user control, users should be able to delete thier account
  public deleteAccount(): Observable<void> {
    // get current user
    const user = this.auth.currentUser;
    if (user) {
      return from(deleteUser(user)).pipe(
        catchError((error) => this.handleError(error))
      );
    }
    return throwError(() => new Error('No user logged in'));
  }

  // private method that centralizes error handling - HANDLE ERROR
  private handleError(error: Error): Observable<never> {
    console.error('There was an error:', error);
    // throws the error again, so the subscriber can catch it and handle it.
    return throwError(() => error);
  }
}
