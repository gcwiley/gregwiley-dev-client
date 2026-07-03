import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

// configures Firebase services to be available for injection
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// configures AngularFire's Auth Service to be available for injection.
import { provideAuth, getAuth } from '@angular/fire/auth';

// configures Angular's HttpClient service to be available for injection.
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

// auth interceptor
import { authInterceptor } from './interceptors/auth.interceptor';

// environment variables 
import { environment } from '../environments/environment';

// app routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    // Firebase configuration 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // AngularFire Auth configuration
    provideAuth(() => getAuth()),
    // Angular HttpClient configuration with auth interceptor
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
