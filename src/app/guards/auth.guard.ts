import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthPipeGenerator, loggedIn } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, UnaryFunction, of, pipe } from 'rxjs';
import { map, swithMap, take } from 'rxjs/operators';

// comment
export type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;

// comment
export type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | string | unknown[]>>;

export const loggedIn: AuthPipe = map((user) => !!user);

@Injectable({
   providedIn: 'root',
})
export class AuthGuard {
   constructor(private router: Router, private auth: Auth) {}

   public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot);
}
