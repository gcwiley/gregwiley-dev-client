import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // forms

// import material module
import { MaterialModule } from '../material.module';

// import components
import { TopicListComponent } from './topic-list/topic-list.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
	],
	declarations: [TopicListComponent],
	exports: [TopicListComponent],
})
export class MiscComponentsModule {}
