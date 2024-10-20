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
      title: 'Home Page',
      pathMatch: 'full',
   },
   {
      path: 'projects',
      component: ProjectGridPageComponent,
      title: 'My Projects',
   },
   {
      path: 'projects/:id',
      component: ProjectDetailsPageComponent,
      title: 'Project Page',
      pathMatch: 'full',
   },
   {
      path: 'projects/create',
      component: ProjectCreatePageComponent,
      title: 'Create New Project',
      pathMatch: 'full',
   },
   {
      path: 'projects/edit/:id',
      component: ProjectCreatePageComponent,
      title: 'Edit Project',
      pathMatch: 'full',
   },
   {
      path: 'posts',
      component: BlogPageComponent,
      title: 'My Blog',
   },
   { path: 'posts/create', component: PostCreatePageComponent, title: 'Create Blog Post', pathMatch: 'full' },
   { path: 'posts/edit/:id', component: PostCreatePageComponent, title: 'Edit Blog Post', pathMatch: 'full' },
   {
      path: 'signin',
      component: SigninComponent,
      title: 'Sign In Page',
   },
   {
      path: 'about',
      component: AboutPageComponent,
      title: 'About Page',
   },
   {
      path: 'resources',
      component: ResourcesPageComponent,
      title: 'Resources Pages',
   },
   {
      path: 'admin',
      component: AdminPageComponent,
      title: 'Admin Page',
   },
   {
      path: '**',
      component: NotFoundPageComponent,
      title: 'Not Found Page',
   },
];
