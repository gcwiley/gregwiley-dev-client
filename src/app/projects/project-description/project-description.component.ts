import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import angular material modules
import { MatCardModule } from '@angular/material/card';

// import the project type
import { Project } from 'src/app/types/project.interface';

// import the project service
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class ProjectDescriptionComponent implements OnInit {
  project!: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProject();
  }

  // GET project by id
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id).subscribe((project) => (this.project = project));
  }
}
