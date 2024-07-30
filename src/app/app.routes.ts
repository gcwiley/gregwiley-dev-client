import { Routes } from '@angular/router';

// import the page components
import {
   AboutPageComponent,
   AdminPageComponent,
   HomePageComponent,
   NotFoundPageComponent,
   BlogPageComponent,
   PostCreatePageComponent,
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
      path: 'projects',
      component: ProjectGridPageComponent,
   },
   {
      path: 'projects/:id',
      component: ProjectDetailsPageComponent,
   },
   {
      path: 'projects/create',
      component: ProjectCreatePageComponent,
   },
   {
      path: 'projects/edit/:id',
      component: ProjectCreatePageComponent,
   },
   {
      path: 'posts',
      component: BlogPageComponent,
   },
   { path: 'posts/create', component: PostCreatePageComponent },
   { path: 'posts/edit/:id', component: PostCreatePageComponent },
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
      path: 'admin',
      component: AdminPageComponent,
   },
   {
      path: '**',
      component: NotFoundPageComponent,
   },
];
