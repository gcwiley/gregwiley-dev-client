import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Import Project Type
import { Project } from '../../types/project';

// Import Project Service
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {

  isLoading = true;
  project!: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getProject();
  }

  // GET project by id
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.projectService
      .getProject(id)
      .subscribe((project) => (this.project = project));
    this.isLoading = false;
  }
}
