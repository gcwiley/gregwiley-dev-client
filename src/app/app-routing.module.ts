import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import the route guard
import { RouteGuard } from './guards/route.guard';

// import pages
import {
  AboutPageComponent,
  CreatePageComponent,
  DashboardComponent,
  DetailsPageComponent,
  MainPageComponent,
  NotFoundPageComponent,
  SigninComponent,
} from './pages';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: MainPageComponent, pathMatch: 'full' },
  { path: 'projects/:id', component: DetailsPageComponent },
  {
    path: 'create',
    component: CreatePageComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'edit/:id',
    component: CreatePageComponent,
    canActivate: [RouteGuard],
  },
  { path: 'signin', component: SigninComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [RouteGuard] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
