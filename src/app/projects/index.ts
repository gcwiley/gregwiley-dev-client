import { NgModule } from '@angular/core';

// project components
import { ProjectCountComponent } from './project-count/project-count.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { RecentProjectsComponent } from './recent-projects/recent-projects.component';
// add new shared components here

@NgModule({
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
export class ProjectComponents {}
