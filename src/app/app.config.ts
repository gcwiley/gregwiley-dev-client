// import the config function
import { ApplicationConfig, inject } from '@angular/core';

// sets up providers necessary to enable Router functionality for the application
import { provideRouter } from '@angular/router';

// Returns the set of dependency-injection providers to enable animations in an application
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import the firebase libraries
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Configures Angular's HttpClient service to be available for injection.
import { provideHttpClient } from '@angular/common/http';

// import the env variables
import { environment } from '../environments/environment';

// import the routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
      // sets up providers necessary to enable Router functionality for the application
      provideRouter(routes),
      // Returns the set of dependency-injection providers to enable animations in an application
      provideAnimationsAsync(),
      // Creates and initializes a @firebase/app#FirebaseApp instance.
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      // initializes an Auth instance
      provideAuth(() => {
         const auth = getAuth(inject(FirebaseApp));
         return auth;
      }),
      // Configures Angular's HttpClient service to be available for injection.
      provideHttpClient(),
   ],
};
