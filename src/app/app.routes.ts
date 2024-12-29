import { Routes } from '@angular/router';

// fix this!

// import the page components
import {
   AboutPageComponent,
   AdminPageComponent,
   ErrorPageComponent,
   HomePageComponent,
   NotFoundPageComponent,
   ProjectCreatePageComponent,
   ProjectDetailsPageComponent,
   ProjectGridPageComponent,
   ResourcesPageComponent,
   SigninComponent,
} from './pages';

export const routes: Routes = [
   {
      path: '',
      component: HomePageComponent,
      canActivate: [],
      pathMatch: 'full',
      title: 'gregwiley.dev',
   },
   {
      path: 'admin',
      component: AdminPageComponent,
      canActivate: [],
      title: 'Admin Dashboard',
   },
   {
      path: 'projects',
      component: ProjectGridPageComponent,
      title: 'My Projects',
   },
   {
      path: 'projects/:id',
      component: ProjectDetailsPageComponent,
   },
   {
      path: 'create-project',
      component: ProjectCreatePageComponent,
   },
   {
      path: 'edit-project/:id',
      component: ProjectCreatePageComponent,
   },
   {
      path: 'signin',
      component: SigninComponent,
      title: 'Sign In',
   },
   {
      path: 'about',
      component: AboutPageComponent,
      title: 'About Me',
   },
   {
      path: 'resources',
      component: ResourcesPageComponent,
      title: 'Resources',
   },
   {
      path: 'error',
      component: ErrorPageComponent,
      title: 'Error',
   },
   {
      path: '**',
      component: NotFoundPageComponent,
      title: 'Not Found Page',
   },
];
