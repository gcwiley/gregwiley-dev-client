import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project interface
import { Project } from '../../types/project.interface';

@Component({
    selector: 'app-recent-projects',
    templateUrl: './recent-projects.component.html',
    styleUrls: ['./recent-projects.component.scss'],
    imports: [CommonModule, MatListModule, MatIconModule]
})
export class RecentProjectsComponent implements OnInit {
   recentProjects!: Project[];

   constructor(private projectService: ProjectService) {}

   ngOnInit(): void {
      this.getRecentProjects();
   }

   getRecentProjects(): void {
      this.projectService.getRecentlyCreatedProjects().subscribe((recentProjects) => (this.recentProjects = recentProjects));
   }
}
