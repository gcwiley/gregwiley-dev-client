import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the route guard
import { RouteGuard } from './guards/route.guard';

// import the about page
import { AboutPageComponent } from './pages/about-page/about-page.component';

// import the create page
import { CreatePageComponent } from './pages/create-page/create-page.component';

// Admin Page - Admin Dashboard
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';

// Details Page
import { DetailsPageComponent } from './pages/details-page/details-page.component';

// Main HomePage
import { MainPageComponent } from './pages/main-page/main-page.component';

// Not Found Page
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

// Sign In Page
import { SigninComponent } from './pages/signin-page/signin-page.component';

const routes: Routes = [
	{ path: '', redirectTo: '/projects', pathMatch: 'full' },
	{ path: 'projects', component: MainPageComponent, pathMatch: 'full' },
	{ path: 'projects/:id', component: DetailsPageComponent },
	{
		path: 'create',
		component: CreatePageComponent,
		canActivate: [RouteGuard],
	},
	{
		path: 'edit/:id',
		component: CreatePageComponent,
		canActivate: [RouteGuard],
	},
	{ path: 'signin', component: SigninComponent },
	{ path: 'about', component: AboutPageComponent },
	{ path: 'admin', component: DashboardComponent, canActivate: [RouteGuard] },
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
