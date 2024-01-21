// import angular core modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// set up firebase
import { AngularFireModule } from '@angular/fire/compat';

// Load the environment vars
import { environment } from '../environments/environment';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

// Main App Component
import { AppComponent } from './app.component';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      AppRoutingModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),
   ],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
