import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// firebase auth
import { Auth, authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  // inject the auth and router
  const auth = inject(Auth);
  const router = inject(Router);

  // guard correctly checks whether a user is authenticated by observing 'authState'
  return authState(auth).pipe(
    take(1),
    map((user) => {
      // if user is not authenticated, it redirects them to '/signin'
      return !!user || router.createUrlTree(['/signin']);
    })
  );
};
