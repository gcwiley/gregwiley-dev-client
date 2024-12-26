import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthPipeGenerator, loggedIn } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { user } from '@angular/fire/auth';
import { Observable, map, take } from 'rxjs';

// Custom Auth Guard Service

// this service provides a custom implementation of an authentication guard
// the integrates with Angular Fire's Auth-guard for localized route redirection.

@Injectable({
   providedIn: 'root',
})
export class CustomAuthGuardService {
   constructor(private router: Router, private auth: Auth) {}

   // determines if the user can activate the requested router
   public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
}

// fix this!