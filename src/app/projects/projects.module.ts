import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // forms

// import material module
import { MaterialModule } from '../material.module';

// import project components
import { ProjectCountComponent } from './project-count/project-count.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { RecentProjectsComponent } from './recent-projects/recent-projects.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
	],
	declarations: [
		ProjectCountComponent,
		ProjectDetailsComponent,
		ProjectFormComponent,
		ProjectGridComponent,
		ProjectTableComponent,
		RecentProjectsComponent,
	],
	exports: [
		ProjectCountComponent,
		ProjectDetailsComponent,
		ProjectFormComponent,
		ProjectGridComponent,
		ProjectTableComponent,
		RecentProjectsComponent,
	],
})
export class ProjectComponentsModule {}
