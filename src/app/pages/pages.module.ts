import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // for the forms

// import the material module
import { MaterialModule } from '../material.module';

// import the project components module
import { ProjectComponentsModule } from '../projects/projects.module';

// import the shared components module
import { SharedComponentsModule } from '../shared/shared.module';

// import the issue components module
import { IssueComponentsModule } from '../issues/issue.module';

// import individual page components
import { AboutPageComponent } from './about-page/about-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardComponent } from './dashboard-page/dashboard-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SigninComponent } from './signin-page/signin-page.component';
import { SupportPageComponent } from './support-page/support-page.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		ProjectComponentsModule,
		SharedComponentsModule,
		IssueComponentsModule,
	],
	declarations: [
		AboutPageComponent,
		CreatePageComponent,
		DashboardComponent,
		DetailsPageComponent,
		MainPageComponent,
		NotFoundPageComponent,
		SigninComponent,
		SupportPageComponent,
	],
	exports: [
		AboutPageComponent,
		CreatePageComponent,
		DashboardComponent,
		DetailsPageComponent,
		MainPageComponent,
		NotFoundPageComponent,
		SigninComponent,
		SupportPageComponent,
	],
})
export class PageComponentsModule {}
