import { Injectable } from '@angular/core';

import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // comment 
   constructor(private auth: Auth) {}

   // comment
   async SignInWithEmailAndPassword(email: string, password: string) {
      return await signInWithEmailAndPassword(this.auth, email, password);
   }

   // comment
   async signOut() {
      return await signOut(this.auth);
   }
}
