import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

// import mat dialog here
import {
   MatDialog,
   MatDialogActions,
   MatDialogClose,
   MatDialogContent,
   MatDialogRef,
   MatDialogTitle,
} from '@angular/material/dialog';

// DIALOG BOX COMPONENT
@Component({
   selector: 'app-dialog-post-table',
   templateUrl: 'post-table-dialog.html',
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatButtonModule],
})
export class DialogProjectListComponent {
   readonly dialogRef = inject(MatDialogRef<DialogProjectList>);
}

// import the post service
import { PostService } from '../../services/post.service';

// import the post interface
import { Post } from '../../types/post.interface';

@Component({
   selector: 'app-post-table',
   templateUrl: './post-table.component.html',
   styleUrl: './post-table.component.scss',
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      CommonModule,
      MatRippleModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      RouterModule,
   ],
})
export class PostTableComponent implements OnInit {
   // set up dialog box
   // readonly dialog = inject(MatDialog);

   // opens the dialog box
   // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   //    this.dialog.open(DialogProjectList, {
   //       width: '250px',
   //       enterAnimationDuration,
   //       exitAnimationDuration,
   //    });
   // }

   // fix this later!
   resultsLength = 0;
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Post>();

   // columns to display
   columnsToDisplay = [
      'title',
      'author',
      'category',
      'datePublished',
      'createdAt',
      'deletePost',
      'editPost',
      'openDialog',
   ];

   constructor(private postService: PostService, private router: Router) {}

   ngOnInit(): void {
      this.getPosts();
   }

   // gets all posts from the post service
   getPosts(): void {
      this.postService.getPosts().subscribe((posts) => {
         this.dataSource.data = posts;
      });
   }

   // deletes a post
   onDeletePost(id: string): void {
      this.postService.deletePost(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}
