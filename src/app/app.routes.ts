import { Routes } from '@angular/router';

// import the page components
import {
   AboutPageComponent,
   AdminPageComponent,
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
   },
   {
      path: 'admin',
      component: AdminPageComponent,
   },
   {
      path: 'projects',
      component: ProjectGridPageComponent,
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
   },
   {
      path: 'about',
      component: AboutPageComponent,
   },
   {
      path: 'resources',
      component: ResourcesPageComponent,
   },
   {
      path: '**',
      component: NotFoundPageComponent,
   },
];
