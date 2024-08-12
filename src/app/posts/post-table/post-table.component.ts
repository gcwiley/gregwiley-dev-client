import { AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import mat paginator and mat sort
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// import mat dialog here
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

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
export class PostTableComponent implements AfterViewInit {
   // inject MatDialog
   readonly dialog = inject(MatDialog);

   // setup pagination for post table
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // setup sort in table
   @ViewChild(MatSort) sort!: MatSort;

   // set the loading spinner to true
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Post>();

   // columns to display
   columnsToDisplay = ['title', 'author', 'category', 'datePublished', 'createdAt', 'deletePost', 'editPost', 'openDialog'];

   constructor(private postService: PostService, private router: Router) {}

   // a callback method that is invoked immediately after angular has completed initialization of a component's view
   ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getPosts();
   }

   // gets all posts from the post service
   getPosts(): void {
      this.postService.getPosts().subscribe((posts) => {
         this.dataSource.data = posts;
         // sets the loading results to false
         this.isLoadingResults = false;
      });
   }

   // open dialog window
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(PostTableDialogComponent, {
         width: '250px',
         enterAnimationDuration,
         exitAnimationDuration,
      });
   }

   // deletes a post by ID
   onDeletePost(id: string): void {
      this.postService.deletePost(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}

@Component({
   selector: 'app-post-table-dialog',
   templateUrl: './post-table-dialog.html',
   standalone: true,
   imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostTableDialogComponent {
   readonly dialogRef = inject(MatDialogRef<PostTableDialogComponent>);
}
