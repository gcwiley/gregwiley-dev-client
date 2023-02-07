import { NgModule } from '@angular/core';

// post components
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
// Note: Add new post components here

@NgModule({
	declarations: [PostFormComponent, PostListComponent],
	exports: [PostFormComponent, PostListComponent],
})
export class PostComponents {}
