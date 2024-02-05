import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// import angular material modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import the material data source
import { MatTableDataSource } from '@angular/material/table';



@Component({
   selector: 'app-post-list',
   templateUrl: './post-list.component.html',
   styleUrls: ['./post-list.component.scss'],
   standalone: true,
   imports: [],
})
export class PostListComponent {}
