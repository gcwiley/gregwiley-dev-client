import { ApplicationConfig } from '@angular/core';

// import the firebase libraries
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Returns the set of dependency-injection providers to enable animations in an application
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configures Angular's HttpClient service to be available for injection.
import { provideHttpClient } from '@angular/common/http';

// sets up providers necessary to enable Router functionality for the application
import { provideRouter } from '@angular/router';

// import the environmental variables
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
      provideAuth(() => getAuth()),
      // Configures Angular's HttpClient service to be available for injection.
      provideHttpClient(),
   ],
};
