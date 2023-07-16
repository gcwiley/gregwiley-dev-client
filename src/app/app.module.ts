// Angular Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // used for both type of Forms
import { HttpClientModule } from '@angular/common/http';

// Set Up Firebase
import { AngularFireModule } from '@angular/fire/compat';

// Load environment - follow up
import { environment } from '../environments/environment';

// Angular Material Modules
import { MaterialModule } from './material.module';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

// import pipes
import { PipesModule } from './pipes/pipes.module';

// Main App Component
import { AppComponent } from './app.component';

// Page Components
import { PageComponentsModule } from './pages';

// Shared Components
import { SharedComponentsModule } from './shared';

// Project Components
import { ProjectComponentsModule } from './projects';

// POST COMPONENTS
import { PostComponentsModule } from './posts';

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
		AngularFireModule.initializeApp(environment.firebase),
		PageComponentsModule,
		ProjectComponentsModule,
		SharedComponentsModule,
		PipesModule,
		PostComponentsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
