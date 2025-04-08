import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      return !!user || router.createUrlTree(['/signin']);
    })
  );
};
