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

// PAGES
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';
import { SigninComponent } from './pages/signin-page/signin-page.component';

// Project Components
import { ProjectGridComponent } from './projects/project-grid/project-grid.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectTableComponent } from './projects/project-table/project-table.component';
import { RecentProjectsComponent } from './projects/recent-projects/recent-projects.component';
import { ProjectCountComponent } from './projects/project-count/project-count.component';

// Shared Components
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from './shared/hero/hero.component';
import { FooterComponent } from './shared/footer/footer.component';

// Theme Picker Component
import { ThemePickerComponent } from './shared/theme-picker/theme-picker.component';

// POST COMPONENTS
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostListComponent } from './posts/post-list/post-list.component';

// PIPES
import { SimpleTruncatePipe } from './pipes/simple-truncate.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectGridComponent,
    ProjectDetailsComponent,
    ProjectTableComponent,
    ProjectFormComponent,
    BannerComponent,
    FooterComponent,
    NavMenuComponent,
    HeaderComponent,
    MainPageComponent,
    SigninComponent,
    NotFoundPageComponent,
    AboutPageComponent,
    DashboardComponent,
    ProjectCountComponent,
    RecentProjectsComponent,
    ThemePickerComponent,
    PostFormComponent,
    PostListComponent,
    SimpleTruncatePipe,
    TruncatePipe,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
