import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import the route guard
import { RouteGuard } from './guards/route.guard';

// import the page components
import {
   AboutPageComponent,
   BlogPageComponent,
   AdminPageComponent,
   MainPageComponent,
   NotFoundPageComponent,
   PostCreatePageComponent,
   ProjectCreatePageComponent,
   ProjectDetailsPageComponent,
   ProjectGridPageComponent,
   ResourcesPageComponent,
   SigninComponent,
} from './pages';

const routes: Routes = [
   { path: '', component: MainPageComponent },
   { path: 'projects', component: ProjectGridPageComponent, pathMatch: 'full' },
   { path: 'projects/:id', component: ProjectDetailsPageComponent },
   {
      path: 'create-project',
      component: ProjectCreatePageComponent,
      canActivate: [RouteGuard],
   },
   { path: 'create-post', component: PostCreatePageComponent, canActivate: [RouteGuard] },
   {
      path: 'edit/:id',
      component: ProjectCreatePageComponent,
      canActivate: [RouteGuard],
   },
   { path: 'signin', component: SigninComponent },
   { path: 'about', component: AboutPageComponent },
   { path: 'blog', component: BlogPageComponent },
   { path: 'resources', component: ResourcesPageComponent },
   { path: 'admin', component: AdminPageComponent, canActivate: [RouteGuard] },
   { path: '**', component: NotFoundPageComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
