import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import angular material modules
import { MatListModule } from '@angular/material/list';

// import the project type
import { Project } from '../../types/project.interface';

// import project service
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  imports: [MatListModule],
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProject();
  }

  // GET project by id
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.projectService.getProject(id).subscribe((project) => (this.project = project));
  }
}
