import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

// import angular material modules
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// import the project service
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-count',
  templateUrl: './project-count.component.html',
  styleUrls: ['./project-count.component.scss'],
  standalone: true,
  imports: [NgIf, MatListModule, MatCardModule],
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
