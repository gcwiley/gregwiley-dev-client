import { Routes } from '@angular/router';

// import the can devacitvate guard
import { CanDeactivateGuardService } from './guards/can-deactivate.guard';

export const routes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
      title: 'Home',
   },
   {
      path: 'admin',
      loadComponent: () => import('./pages/admin-page/admin-page.component').then((m) => m.AdminPageComponent),
      title: 'Admin',
   },
   {
      path: 'projects',
      loadComponent: () =>
         import('./pages/project-pages/project-grid-page/project-grid-page.component').then((m) => m.ProjectGridPageComponent),
      title: 'Projects',
   },
   {
      path: 'projects/:id',
      loadComponent: () =>
         import('./pages/project-pages/project-details-page/project-details-page.component').then((m) => m.ProjectDetailsPageComponent),
   },
   {
      path: 'create',
      title: 'Create Project',
      canDeactivate: [CanDeactivateGuardService],
      loadComponent: () =>
         import('./pages/project-pages/project-create-page/project-create-page.component').then((m) => m.ProjectCreatePageComponent),
   },
   {
      path: 'edit-project/:id',
      loadComponent: () =>
         import('./pages/project-pages/project-create-page/project-create-page.component').then((m) => m.ProjectCreatePageComponent),
   },
   {
      path: 'signin',
      loadComponent: () => import('./pages/signin-page/signin-page.component').then((m) => m.SigninComponent),
      title: 'Sign In',
   },
   {
      path: 'about',
      loadComponent: () => import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
      title: 'About',
   },
   {
      path: 'resources',
      loadComponent: () => import('./pages/resources-page/resources-page.component').then((m) => m.ResourcesPageComponent),
      title: 'Resources',
   },
   {
      path: 'error',
      loadComponent: () => import('./pages/error-page/error-page.component').then((m) => m.ErrorPageComponent),
   },
   {
      path: '404',
      loadComponent: () => import('./pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
      title: 'Page Not Found',
   },
   {
      path: '**',
      redirectTo: '/404',
   },
];
