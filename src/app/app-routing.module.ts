import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Route Guard
import { RouteGuard } from './route.guard';

// Main HomePage
import { MainPageComponent } from './pages/main-page/main-page.component';

// Admin Page - Admin Dashboard
import { DashboardComponent } from './admin/dashboard/dashboard.component';

// Project Components
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';

// Feedback Component
import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';

// Auth Components
import { SigninComponent } from './auth/signin/signin.component';

// About Page
import { AboutPageComponent } from './pages/about-page/about-page.component';

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
  { path: 'feedback', component: FeedbackFormComponent },
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
