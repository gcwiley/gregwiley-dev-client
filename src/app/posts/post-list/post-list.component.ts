import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

// import the post service
import { PostService } from 'src/app/services/post.service';

// import the post type
import { Post } from 'src/app/types/post.interface';

@Component({
   selector: 'app-post-list',
   templateUrl: './post-list.component.html',
   styleUrls: ['./post-list.component.scss'],
   standalone: true,
   imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterModule],
})
export class PostListComponent implements OnInit {
   // set up the data source
   dataSource = new MatTableDataSource<Post>();

   // columns to display
   columnsToDisplay = ['title', 'author', 'createdAt', 'updatedAt', 'editPost', 'deletePost'];

   constructor(private postService: PostService, private router: Router) {}

   ngOnInit(): void {
      this.postService.getPosts().subscribe((posts) => {
         this.dataSource.data = posts;
      });
   }

   // deletes a post
   onDeletePost(id: string): void {
      this.postService.deletePost(id).subscribe(() => {
         // navigates admin back to the admin admin page
         this.router.navigateByUrl('/admin');
      });
   }
}
