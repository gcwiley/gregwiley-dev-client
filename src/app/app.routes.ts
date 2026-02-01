import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { projectTitleResolver } from './resolvers/project-title.resolver';

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
    loadComponent: () =>
      import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
  // resources page
  {
    path: 'resources',
    title: 'Resources',
    loadComponent: () =>
      import('./pages/resources-page/resources-page').then(
        (m) => m.ResourcesPage,
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
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      // admin dashboard - should be empty for /admin
      {
        path: '',
        title: 'Admin Dashboard',
        loadComponent: () =>
          import('./pages/admin-page/admin-page').then((m) => m.AdminPage),
      },
      // create project: /admin/projects/create
      {
        path: 'projects/create',
        title: 'Create Project',
        canDeactivate: [canDeactivateGuard],
        loadComponent: () =>
          import('./pages/project-pages/project-form-page/project-form-page').then(
            (m) => m.ProjectFormPage,
          ),
      },
      // edit project: /admin/projects/:id/edit
      {
        path: 'projects/:id/edit',
        title: 'Edit Project',
        canDeactivate: [canDeactivateGuard],
        loadComponent: () =>
          import('./pages/project-pages/project-form-page/project-form-page').then(
            (m) => m.ProjectFormPage,
          ),
      },
    ],
  },
  // --- PROJECT ROUTES ---
  {
    path: 'projects',
    children: [
      // project grid page
      {
        path: '',
        title: 'Projects',
        loadComponent: () =>
          import('./pages/project-pages/project-grid-page/project-grid-page').then(
            (m) => m.ProjectGridPage,
          ),
      },

      {
        path: ':id',
        title: projectTitleResolver, // dynamic title
        loadComponent: () =>
          import('./pages/project-pages/project-details-page/project-details-page').then(
            (m) => m.ProjectDetailsPage,
          ),
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
  // 404 NOT FOUND PAGE
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage,
      ),
  },
  // wildcard route
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage,
      ),
  },
];
