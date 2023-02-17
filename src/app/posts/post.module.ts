import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // forms

// import material module
import { MaterialModule } from '../material.module';

// import post components
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
// add new post components here

@NgModule({
	imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
	declarations: [PostFormComponent, PostListComponent],
	exports: [PostFormComponent, PostListComponent],
})
export class PostComponentsModule {}
