// Angular Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // used for Templete Forms
import { ReactiveFormsModule } from '@angular/forms'; // used for Reactive Forms
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

// Set Up Firebase
import { AngularFireModule } from '@angular/fire/compat';

// Load environment - follow up
import { environment } from '../environments/environment';

// Angular Material Modules
import { MaterialModule } from './material-module';

// Main App Component
import { AppComponent } from './app.component';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

// Page Components
import { Pages } from './pages/index';

// Shared Components
import { SharedComponents } from './shared/index';

// Project Components
import { ProjectComponents } from './projects/index';

// POST COMPONENTS
import { PostComponents } from './posts/index';

// PIPES
import { Pipes } from './pipes/index';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		AppRoutingModule,
		HttpClientModule,
		MatNativeDateModule,
		AngularFireModule.initializeApp(environment.firebase),
		Pipes,
		Pages,
		SharedComponents,
		ProjectComponents,
		PostComponents,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
