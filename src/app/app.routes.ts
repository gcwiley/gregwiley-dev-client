import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuardService } from './guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  // admin page
  {
    path: 'admin',
    title: 'Admin Dashboard',
    loadComponent: () =>
      import('./pages/admin-page/admin-page.component').then((m) => m.AdminPageComponent),
  },
  // project page
  {
    path: 'projects',
    title: 'Projects',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-grid-page/project-grid-page.component').then(
        (m) => m.ProjectGridPageComponent
      ),
  },
  // idiv project page
  {
    path: 'projects/:id',
    title: 'Project Details',
    loadComponent: () =>
      import('./pages/project-pages/project-details-page/project-details-page.component').then(
        (m) => m.ProjectDetailsPageComponent
      ),
  },
  // create project page
  {
    path: 'create',
    title: 'Create Project',
    canDeactivate: [CanDeactivateGuardService],
    loadComponent: () =>
      import('./pages/project-pages/project-create-page/project-create-page.component').then(
        (m) => m.ProjectCreatePageComponent
      ),
  },
  // edit project page
  {
    path: 'edit-project/:id',
    title: 'Edit Project',
    loadComponent: () =>
      import('./pages/project-pages/project-create-page/project-create-page.component').then(
        (m) => m.ProjectCreatePageComponent
      ),
  },
  // sign in page
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page.component').then((m) => m.SigninComponent),
  },
  // about page
  {
    path: 'about',
    title: 'About',
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  // resources page
  {
    path: 'resources',
    title: 'Resources',
    loadComponent: () =>
      import('./pages/resources-page/resources-page.component').then(
        (m) => m.ResourcesPageComponent
      ),
  },
  // error page
  {
    path: 'error',
    title: 'Error Page',
    loadComponent: () =>
      import('./pages/error-page/error-page.component').then((m) => m.ErrorPageComponent),
  },
  // page not found
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
  // redirect to page not found
  {
    path: '**',
    redirectTo: '/404',
  },
];
