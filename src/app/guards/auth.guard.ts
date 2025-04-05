import { Injectable, inject, NgZone } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  constructor(private ngZone: NgZone) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return authState(this.auth).pipe(
      take(1),
      map((user) => {
        return this.ngZone.run(() => {
          if (user) {
            return true; // user is signed in, allow navigation
          } else {
            console.log('Access Denied: User is not logged in.');
            return this.router.createUrlTree(['/signin']);
          }
        });
      })
    );
  }
}
