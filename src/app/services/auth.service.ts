import { Injectable, inject } from '@angular/core';

// rxjs
import { Observable, catchError, from, throwError, map } from 'rxjs';

// firebase auth
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  user,
  User,
  
  idToken
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // inject the auth object
  private readonly auth = inject(Auth);

  // observable for the current user state (emits User object or null)
  public readonly user$: Observable<User | null> = user(this.auth);

  // observable for the current user's ID token (emits User object or null)
  public readonly idToken$: Observable<string | null> = idToken(this.auth);

  // observable for the authentication status (emits true if logged in, false otherwise)
  public readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user)
  );

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

  // HANDLE ERROR
  private handleError(error: unknown): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      switch (firebaseError.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Sign in popup was blocked. Please allow popups for this site.';
          break;
        default:
          errorMessage = firebaseError.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }

    console.error('Auth Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
