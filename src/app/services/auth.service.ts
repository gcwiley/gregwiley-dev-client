import { Injectable } from '@angular/core';

import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // inject the auth
   constructor(private auth: Auth) {}

   // sign in with email and password
   async SignInWithEmailAndPassword(email: string, password: string) {
      return await signInWithEmailAndPassword(this.auth, email, password);
   }

   // sign out user
   async signOut() {
      return await signOut(this.auth);
   }
}
