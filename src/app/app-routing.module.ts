import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Route Guard
import { RouteGuard } from './guards/route.guard';

// Main HomePage
import { MainPageComponent } from './pages/main-page/main-page.component';

// About Page
import { AboutPageComponent } from './pages/about-page/about-page.component';

// Blog Page

// Admin Page - Admin Dashboard
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';

// Project Components
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';

// Sign In Page
import { SigninComponent } from './pages/signin-page/signin-page.component';

// Not Found Page
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: MainPageComponent, pathMatch: 'full' },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  {
    path: 'create',
    component: ProjectFormComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'edit/:id',
    component: ProjectFormComponent,
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
