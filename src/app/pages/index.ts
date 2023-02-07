import { NgModule } from '@angular/core';

// pages
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard-page/dashboard-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SigninComponent } from './signin-page/signin-page.component';
// add new page componets here

@NgModule({
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
export class Pages {}
