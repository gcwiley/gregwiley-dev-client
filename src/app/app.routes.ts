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
  // --- PROJECT ROUTES ---
  {
    path: 'projects',
    canActivate: [authGuard], // secures all child routes
    children: [
      // project grid page
      {
        path: '',
        title: 'Projects',
        loadComponent: () =>
          import(
            './pages/project-pages/project-grid-page/project-grid-page'
          ).then((m) => m.ProjectGridPage),
      },
      // project create page (must be before :id)
      {
        path: 'create',
        title: 'Create Project',
        canDeactivate: [canDeactivateGuard],
        loadComponent: () => import('./pages/project-pages/project-form-page/project-form-page').then(
          (m) => m.ProjectFormPage
        )
      },
      {
        path: ':id',
        title: projectTitleResolver, // dynamic title
        loadComponent: () =>
          import(
            './pages/project-pages/project-details-page/project-details-page'
          ).then((m) => m.ProjectDetailsPage),
      },
      {
        path: ':id/edit',
        title: 'Edit Project',
        canDeactivate: [canDeactivateGuard],
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
  