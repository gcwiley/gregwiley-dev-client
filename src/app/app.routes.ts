import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  // admin page
  {
    path: 'admin',
    title: 'Admin Dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin-page/admin-page.component').then((m) => m.AdminPageComponent),
  },
  // projects page
  {
    path: 'projects',
    title: 'Projects',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-grid-page/project-grid-page.component').then(
        (m) => m.ProjectGridPageComponent
      ),
  },
  // individual project page
  {
    path: 'projects/:id',
    // title: 'Project Details',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-details-page/project-details-page.component').then(
        (m) => m.ProjectDetailsPageComponent
      ),
  },
  // create project page
  {
    path: 'create',
    title: 'Create Project',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-create-page/project-create-page.component').then(
        (m) => m.ProjectCreatePageComponent
      ),
  },
  // edit project page
  {
    path: 'project/:id',
    title: 'Edit Project',
    canActivate: [authGuard],
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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  // resources page
  {
    path: 'resources',
    title: 'Resources',
    canActivate: [authGuard],
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
  // redirect to page not found - wildcare route should be last!
  {
    path: '**',
    redirectTo: '/404',
  },
];
