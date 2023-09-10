import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

// import the project service
import { ProjectService } from '../../services/project.service';

// import project interface
import { Project } from 'src/app/types/project.interface';

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
})
export class RecentProjectsComponent implements OnInit {
  recentProjects!: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getRecentProjects();
  }

  getRecentProjects(): void {
    this.projectService.getRecentlyCreatedProjects()
      .subscribe((recentProjects) => (this.recentProjects = recentProjects));
  }
}
