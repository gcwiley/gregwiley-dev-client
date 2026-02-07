import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// firebase auth
import { Auth, authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      if (user) return true;
      return router.createUrlTree(['/signin'], {
        queryParams: { returnUrl: state.url },
      });
    }),
  );
};