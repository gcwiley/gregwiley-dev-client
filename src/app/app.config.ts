// import the config function
import { ApplicationConfig } from '@angular/core';

// sets up providers necessary to enable Router functionality for the application
import { provideRouter } from '@angular/router';

// firebase libraries
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// Configures Angular's HttpClient service to be available for injection.
import { provideHttpClient } from '@angular/common/http';

// env variables
import { environment } from '../environments/environment';

// routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // sets up providers necessary to enable Router functionality for the application
    provideRouter(routes),
    // Creates and initializes a @firebase/app#FirebaseApp instance.
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // initializes an Auth instance - firebase authentication
    provideAuth(() => getAuth()),
    // Configures Angular's HttpClient service to be available for injection.
    provideHttpClient(),
    // find out how this works!
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
};
