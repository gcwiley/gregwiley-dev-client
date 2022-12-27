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

// Admin  Dashboard Component
import { DashboardComponent } from './admin/dashboard/dashboard.component';

// Project Components
import { ProjectGridComponent } from './projects/project-grid/project-grid.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectTableComponent } from './projects/project-table/project-table.component';
import { RecentProjectsComponent } from './projects/recent-projects/recent-projects.component';
import { ProjectCountComponent } from './projects/project-count/project-count.component';

// Shared Components
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { BannerComponent } from './shared/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';

// PAGES
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

// Theme Picker Component
import { ThemePickerComponent } from './shared/theme-picker/theme-picker.component';

// Auth Components
import { SigninComponent } from './auth/signin/signin.component';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

// Feedback Page
import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';

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
    MainPageComponent,
    SigninComponent,
    FeedbackFormComponent,
    FeedbackListComponent,
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
