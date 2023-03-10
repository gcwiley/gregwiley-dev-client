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
import { MaterialModule } from './material.module';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

// import pipes
import { PipesModule } from './pipes/pipes.module';

// Main App Component
import { AppComponent } from './app.component';

// Page Components
import { PageComponentsModule } from './pages/pages.module';

// Shared Components
import { SharedComponentsModule } from './shared/shared.module';

// Project Components
import { ProjectComponentsModule } from './projects/projects.module';

// POST COMPONENTS
import { PostComponentsModule } from './posts/post.module';

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
