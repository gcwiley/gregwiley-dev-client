// this code defines an angular authentication guard (AuthGuard) and related utilities for controlling access to routes based on user authentication status

// imports necessary modules
import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, UnaryFunction, of, pipe } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';



// a function type that takes an ActivatedRouteSnapshot(information about the route) and 'RouterStateSnapshot' (information about the router state) and returns an AuthPipe
export type AuthPipeGenerator = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => AuthPipe;
export type AuthPipe = UnaryFunction<
  Observable<User | null>,
  Observable<boolean | string | unknown[]>
>;

export const loggedIn: AuthPipe = map((user) => !!user);

@Injectable({
  providedIn: 'any',
})
export class AuthGuard implements CanActivate {
   // inject AuthService
  constructor(private router: Router, private auth: Auth) {}

}
