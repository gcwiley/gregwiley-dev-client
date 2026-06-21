import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

// firebase auth
import { Auth, idToken } from '@angular/fire/auth';

// rxjs
import { switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  // retrieve the ID token dynamically
  return idToken(auth).pipe(
    take(1),
    switchMap((token) => {
      if (token) {
        // clone the request and the set the Authorization header
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(clonedRequest);
      }
      // if the user isn't logged in, send the request unmodified.
      return next(req);
    }),
  );
};
