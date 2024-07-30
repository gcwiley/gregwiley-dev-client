import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

// import the post service
import { PostService } from '../../services/post.service';

// import the post interface
import { Post } from '../../types/post.interface';

@Component({
   selector: 'app-post-list',
   templateUrl: './post-list.component.html',
   styleUrl: './post-list.component.scss',
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule],
})
export class PostListComponent implements OnInit {
   // create member variables
   posts: Post[] = [];

   constructor(private postService: PostService, private router: Router) {}

   ngOnInit(): void {
      this.getPosts();
   }

   // gets all posts from the database
   getPosts(): void {
      this.postService.getPosts().subscribe((posts) => {
         this.posts = posts;
      });
   }

   // deletes a post
   onDeletePost(id: string): void {
      this.postService.deletePost(id).subscribe(() => {
         // navigates user back to the post list page
         this.router.navigateByUrl('/posts');
      });
   }
}
