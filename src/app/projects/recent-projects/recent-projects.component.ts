import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
   standalone: true,
   selector: 'app-recent-projects',
   templateUrl: './recent-projects.component.html',
   styleUrls: ['./recent-projects.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentProjectsComponent implements OnInit {
   // use an observable directly
   public recentProjects$!: Observable<Project[]>;
   public errorLoadingProjects = false; // flag for error state

   constructor(private projectService: ProjectService) {}

   public ngOnInit(): void {
      this.loadRecentProjects();
   }

   // renamed for clarity, could also just assign directly in ngOnInit
   private loadRecentProjects(): void {
      this.recentProjects$ = this.projectService.getRecentlyCreatedProjects().pipe(
         catchError((error) => {
            console.error('Error loading recent projects:', error);
            this.errorLoadingProjects = true;
            // return an emtpy array or EMPTY observable to gracefully handle errors
            // this prevents the observable stream from breaking
            return EMPTY; 
         })
      )
   }
}
