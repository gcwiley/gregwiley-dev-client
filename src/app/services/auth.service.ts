import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, throwError, map } from 'rxjs';

// firebase auth
import {
  Auth,
  createUserWithEmailAndPassword,
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

  // CREATE NEW USER
  public signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(catchError((error) => this.handleError(error)));
  }

  // SIGN IN USER
  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // SIGN IN WITH GOOGLE
  public signInWithGoogle(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // SIGN OUT CURRENT USER
  public signOutUser(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // RESET USER PASSWORD
  public sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // allow authenticated users to change their password - CHANGE USER PASSWORD
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

  // DELETE USER ACCOUNT
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
  private handleError(error: unknown): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    // Check for Firebase specific error codes
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/requires-recent-login':
          errorMessage =
            'Please log out and log back in to perform this action.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in cancelled.';
          break;
        default:
          errorMessage = firebaseError.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }

    console.error('Auth Error:', errorMessage);
    // Return a new Error object with the friendly message
    return throwError(() => new Error(errorMessage));
  }
}
