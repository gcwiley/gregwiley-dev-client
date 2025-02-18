// this code defines an angular authentication guard (AuthGuard) and related utilities for controlling access to routes based on user authentication status

// imports necessary modules
import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, UnaryFunction, of, pipe } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

// a function type that takes an ActivatedRouteSnapshot(information about the route) and 'RouterStateSnapshot' (information about the router state) and returns an AuthPipe
export type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | string | unknown[]>>;

export const loggedIn: AuthPipe = map((user) => !!user);

@Injectable({
   providedIn: 'any',
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router, private auth: Auth) {}

   canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const authPipeFactory = (next.data['authGuardPipe'] as AuthPipeGenerator) || (() => loggedIn);
      return user(this.auth).pipe(
         take(1),
         authPipeFactory(next, state),
         map((can) => {
            if (typeof can === 'boolean') {
               return can;
            } else if (Array.isArray(can)) {
               return this.router.createUrlTree(can);
            } else return this.router.parseUrl(can as string);
         })
      );
   };
}

export const canActivate = (pipe: AuthPipeGenerator) => ({
   canActivate: [AuthGuard],
   data: { authGuardPipe: pipe },
});

export const isNotAnonymous: AuthPipe = map((user) => !!user && !user.isAnonymous);
// comment
export const idTokenResult = switchMap((user: User | null) => (user ? user.getIdTokenResult() : of(null)));
// comment
export const emailVerified: AuthPipe = map((user) => !!user && user.emailVerified);
// comment
export const customClaims = pipe(
   idTokenResult,
   map((idTokenResult) => (idTokenResult ? idTokenResult.claims : []))
);
// comment
export const hasCustomClaim: (claim: string) => AuthPipe = (claim) =>
   pipe(
      customClaims,
      // eslint-disable-next-line no-prototype-builtins
      map((claims) => claims.hasOwnProperty(claim))
   );
// comment
export const redirectUnauthorizedTo: (redirect: string | unknown[]) => AuthPipe = (redirect) =>
   pipe(
      loggedIn,
      map((loggedIn) => loggedIn || redirect)
   );
// comment
export const redirectLoggedInTo: (redirect: string | unknown[]) => AuthPipe = (redirect) =>
   pipe(
      loggedIn,
      map((loggedIn) => (loggedIn && redirect) || true)
   );
