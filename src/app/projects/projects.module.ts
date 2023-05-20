import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // forms

// import the material module
import { MaterialModule } from '../material.module';

// import the pipes module
import { PipesModule } from '../pipes/pipes.module';

// import project components
import { ProjectCountComponent } from './project-count/project-count.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RecentProjectsComponent } from './recent-projects/recent-projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectSearchComponent } from './project-search/project-search.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		PipesModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
	],
	declarations: [
		ProjectCountComponent,
		ProjectDetailsComponent,
		ProjectFormComponent,
		ProjectGridComponent,
		ProjectListComponent,
		RecentProjectsComponent,
  ProjectCardComponent,
  ProjectSearchComponent,
	],
	exports: [
		ProjectCountComponent,
		ProjectDetailsComponent,
		ProjectFormComponent,
		ProjectGridComponent,
		ProjectListComponent,
		RecentProjectsComponent,
	],
})
export class ProjectComponentsModule {}
