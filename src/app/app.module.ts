// Angular Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // used for Templete Forms
import { ReactiveFormsModule } from '@angular/forms'; // used for Reactive Forms
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

// Set Up Firebase
import { AngularFireModule } from '@angular/fire/compat';

// Load environment - follow up
import { environment } from '../environments/environment';

// Angular Material Modules
import { MaterialModule } from './material-module';

// Main App Component
import { AppComponent } from './app.component';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

// Page Components
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SigninComponent } from './pages/signin-page/signin-page.component';

// Shared Components
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeroComponent } from './shared/hero/hero.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';

// Project Components
import { ProjectCountComponent } from './projects/project-count/project-count.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectGridComponent } from './projects/project-grid/project-grid.component';
import { ProjectTableComponent } from './projects/project-table/project-table.component';
import { RecentProjectsComponent } from './projects/recent-projects/recent-projects.component';

// POST COMPONENTS
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostListComponent } from './posts/post-list/post-list.component';

// PIPES
import { Pipes } from './pipes/index';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostListComponent,
    AboutPageComponent,
    DashboardComponent,
    MainPageComponent,
    NotFoundPageComponent,
    SigninComponent,
    ProjectCountComponent,
    ProjectDetailsComponent,
    ProjectFormComponent,
    ProjectGridComponent,
    ProjectTableComponent,
    RecentProjectsComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    Pipes,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
