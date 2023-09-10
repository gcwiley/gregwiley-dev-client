import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import the route guard
import { RouteGuard } from './guards/route.guard';

// import pages
import {
   AboutPageComponent,
   BlogPageComponent,
   DashboardComponent,
   ProjectDetailsPageComponent,
   MainPageComponent,
   NotFoundPageComponent,
   PostCreatePageComponent,
   ProjectCreatePageComponent,
   ResourcesPageComponent,
   SigninComponent,
} from './pages';

const routes: Routes = [
   { path: '', redirectTo: '/projects', pathMatch: 'full' },
   { path: 'projects', component: MainPageComponent, pathMatch: 'full' },
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
   { path: 'admin', component: DashboardComponent, canActivate: [RouteGuard] },
   { path: '**', component: NotFoundPageComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
