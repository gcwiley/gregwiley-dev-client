import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

// firebase libraries
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// configures Angular's HttpClient service to be available for injection.
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

// auth interceptor
import { authInterceptor } from './interceptors/auth.interceptor';

// environment variables
import { environment } from '../environments/environment';

// routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
