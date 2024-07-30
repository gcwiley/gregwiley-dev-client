import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// import the post service
import { PostService } from '../../services/post.service';

// import the post interface
import { Post } from '../../types/post.interface';

@Component({
   selector: 'app-recent-posts',
   templateUrl: './recent-posts.component.html',
   styleUrls: ['./recent-posts.component.scss'],
   standalone: true,
   imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentPostsComponent implements OnInit {
   recentPosts!: Post[];

   constructor(private postService: PostService) {}

   ngOnInit(): void {
      this.getRecentPosts();
   }

   getRecentPosts(): void {
      this.postService.getRecentPosts().subscribe((recentPosts) => (this.recentPosts = recentPosts));
   }
}
