import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// import the post service
import { PostService } from 'src/app/services/post.service';

// import the post interface
import { Post } from '../../types/post.interface';

@Component({
   selector: 'app-post-form',
   templateUrl: './post-form.component.html',
   styleUrls: ['./post-form.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class PostFormComponent implements OnInit {
   public mode = 'create';
   private id!: string | null;
   private post!: Post;

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      public route: ActivatedRoute,
      private postService: PostService
   ) {}

   // create the post form
   postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      body: ['', Validators.required],
   });

   ngOnInit(): void {
      // find out if we have a "id" or not
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
         if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            this.postService.getPost(this.id).subscribe((post) => {
               this.post = post;
               // overrides values of initial form controls
               this.postForm.setValue({
                  // set value for every form control
                  title: this.post.title,
                  author: this.post.author,
                  body: this.post.body,
               });
            });
         } else {
            this.mode = 'create';
            this.id = null;
         }
      });
   }

   onSavePost(): void {
    if (this.mode === 'create') {
      this.postService.addPost(this.postForm.value).subscribe(() => {
        // navigates user back to homepage
        this.router.navigateByUrl('/');
      });
    } else {
      this.postService.updatePost(this.postForm.value).subscribe(() => {
        // navigates user back to homepage
        this.router.navigateByUrl('/');
      });
    }
  }
}
