import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard.js';
import { projectTitleResolver } from './resolvers/project-title.resolver.js';

export const routes: Routes = [
  // home page
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
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
  // --- AUTHENTICATION ---
  // sign in page
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page').then((m) => m.SigninPage),
  },
  // --- PROTECTED ADMIN ROUTES ---
  // admin page
  {
    path: 'admin',
    title: 'Admin Dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin-page/admin-page').then((m) => m.AdminPage),
  },
  // create page
  {
    path: 'create',
    title: 'Create Project',
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard], // added safety check
    loadComponent: () =>
      import('./pages/project-pages/project-form-page/project-form-page').then(
        (m) => m.ProjectFormPage
      ),
  },
  // --- PROJECT ROUTES ---
  {
    path: 'projects',
    children: [
      {
        path: '',
        title: 'Projects',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './pages/project-pages/project-grid-page/project-grid-page'
          ).then((m) => m.ProjectGridPage),
      },
      {
        path: ':id',
        title: projectTitleResolver, // dynamic title
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './pages/project-pages/project-details-page/project-details-page'
          ).then((m) => m.ProjectDetailsPage),
      },
      {
        path: ':id/edit',
        title: 'Edit Project',
        canActivate: [authGuard], // Only editing needs protection
        canDeactivate: [canDeactivateGuard], // added safety check
        loadComponent: () =>
          import(
            './pages/project-pages/project-form-page/project-form-page'
          ).then((m) => m.ProjectFormPage),
      },
    ],
  },
  // --- ERROR HANDLING ---
  {
    path: 'error',
    title: 'Error',
    loadComponent: () =>
      import('./pages/error-page/error-page').then((m) => m.ErrorPage),
  },
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
  // wildcard route
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
];
  