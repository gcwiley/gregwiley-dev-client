import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  // admin page
  {
    path: 'admin',
    title: 'Admin Dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin-page/admin-page').then((m) => m.AdminPage),
  },
  // projects page
  {
    path: 'projects',
    title: 'Projects',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-grid-page/project-grid-page').then(
        (m) => m.ProjectGridPage
      ),
  },
  // individual project page
  {
    path: 'projects/:id',
    // title: 'Project Details',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-details-page/project-details-page').then(
        (m) => m.ProjectDetailsPage
      ),
  },
  // create project page
  {
    path: 'create',
    title: 'Create Project',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-create-page/project-create-page').then(
        (m) => m.ProjectCreatePage
      ),
  },
  // edit project page
  {
    path: 'project/:id',
    title: 'Edit Project',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/project-pages/project-create-page/project-create-page').then(
        (m) => m.ProjectCreatePage
      ),
  },
  // sign in page
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page').then((m) => m.SigninPage),
  },
  // about page
  {
    path: 'about',
    title: 'About',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
  // resources page
  {
    path: 'resources',
    title: 'Resources',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/resources-page/resources-page').then(
        (m) => m.ResourcesPage
      ),
  },
  // error page
  {
    path: 'error',
    title: 'Error Page',
    loadComponent: () =>
      import('./pages/error-page/error-page').then((m) => m.ErrorPage),
  },
  // page not found
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
  // redirect to page not found - wildcard route should be last!
  {
    path: '**',
    redirectTo: '/404',
  },
];
