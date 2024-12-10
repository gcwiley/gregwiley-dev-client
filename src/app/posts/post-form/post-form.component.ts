import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { PostService } from '../../services/post.service';

// import the post interfaces
import { Post, PostCategory } from '../../types/post.interface';

// import post data values
import { POST_CATEGORIES } from '../../../assets/data/post-data';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ]
})
export class PostFormComponent implements OnInit {
   public mode = 'create';
   private id!: string | null;
   private post!: Post;

   // set up data values
   categories: PostCategory[] = POST_CATEGORIES;

   // inject the Form builder
   private formBuilder = inject(FormBuilder)

   constructor(
      private router: Router,
      public route: ActivatedRoute,
      private postService: PostService
   ) {}

   // create the post form
   postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      datePublished: ['', Validators.required],
      category: ['', Validators.required],
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
                  datePublished: this.post.datePublished,
                  category: this.post.category,
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
            this.router.navigateByUrl('/posts');
         });
      } else {
         this.postService.updatePost(this.id!, this.postForm.value).subscribe(() => {
            // navigates user back to homepage
            this.router.navigateByUrl('/posts');
         });
      }
   }
}
