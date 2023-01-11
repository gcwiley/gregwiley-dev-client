import { Component, OnInit } from '@angular/core';

// Import the Project Service
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-count',
  templateUrl: './project-count.component.html',
  styleUrls: ['./project-count.component.css'],
})
export class ProjectCountComponent implements OnInit {
  count!: number;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjectCount();
  }

  getProjectCount(): void {
    this.projectService.getProjectCount().subscribe((count) => (this.count = count));
  }
}
