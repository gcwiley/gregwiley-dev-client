import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import the route guard
import { RouteGuard } from './guards/route.guard';

// import the about page
import { AboutPageComponent } from './pages/about-page/about-page.component';

// import the create page
import { CreatePageComponent } from './pages/create-page/create-page.component';

// import the Admin Page
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';

// import the details Page
import { DetailsPageComponent } from './pages/details-page/details-page.component';

// import the main page
import { MainPageComponent } from './pages/main-page/main-page.component';

// import the Not Found Page
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

// import the sign in page
import { SigninComponent } from './pages/signin-page/signin-page.component';

// import the issues page
import { IssuesPageComponent } from './pages/issues-page/issues-page.component';

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
	{
		path: 'issues',
		component: IssuesPageComponent,
		canActivate: [RouteGuard],
	},
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
