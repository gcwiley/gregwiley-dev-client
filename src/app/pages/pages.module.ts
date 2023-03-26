import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // forms

// import material module
import { MaterialModule } from '../material.module';

// import project components module
import { ProjectComponentsModule } from '../projects/projects.module';

// import shared components module
import { SharedComponentsModule } from '../shared/shared.module';

// import page components
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard-page/dashboard-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SigninComponent } from './signin-page/signin-page.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		ProjectComponentsModule,
		SharedComponentsModule,
	],
	declarations: [
		AboutPageComponent,
		DashboardComponent,
		MainPageComponent,
		NotFoundPageComponent,
		SigninComponent,
	],
	exports: [
		AboutPageComponent,
		DashboardComponent,
		MainPageComponent,
		NotFoundPageComponent,
		SigninComponent,
	],
})
export class PageComponentsModule {}
