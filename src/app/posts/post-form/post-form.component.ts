import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import post service
import { PostService } from '../../services/post.service';

// import post type
import { Post } from '../../types/post.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public mode = 'create';
  private id!: string | null;
  private post!: Post;

  // create post form
  postForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    date: ['', Validators.required],
    body: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // find out if we have an 'id' or not
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
            date: this.post.date,
            body: this.post.body,
          });
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onSavePost() {
    if (this.mode === 'create') {
      this.postService.addPost(this.postForm.value).subscribe(() => {
        // navigates user back to homepage
        this.router.navigateByUrl('/');
      });
    } else
      this.postService
        .updatePost(this.id, this.postForm.value)
        .subscribe(() => {
          // navigates user back to homepage
          this.router.navigateByUrl('/');
        });
  }
}
