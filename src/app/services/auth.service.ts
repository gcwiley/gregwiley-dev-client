import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';

import {
   Auth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
   signOut,
   UserCredential,
} from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // injects the auth object
   private readonly auth = inject(Auth);

   // creates a new user account associated with the specified email address and password
   public createUserWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
      return from(createUserWithEmailAndPassword(this.auth, email, password));
   }

   // asynchronously signs in using an email and password
   public signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
      return from(signInWithEmailAndPassword(this.auth, email, password));
   }

   // authenticates a firebase client using a popul-based OAuth authentication flow
   public signInWithGoogle(): Observable<UserCredential> {
      return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
   }

   // signs out the current user.
   public signOut(): Observable<void> {
      return from(signOut(this.auth));
   }
}
