import { Component, OnInit } from '@angular/core';

// Import Project Service
import { ProjectService } from '../../services/project.service';

// Import project type
import { Project } from 'src/app/types/project';

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss'],
})
export class RecentProjectsComponent implements OnInit {
  recentProjects!: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getRecentProjects();
  }

  getRecentProjects(): void {
    this.projectService
      .getRecentProjects()
      .subscribe((recentProjects) => (this.recentProjects = recentProjects));
  }
}
