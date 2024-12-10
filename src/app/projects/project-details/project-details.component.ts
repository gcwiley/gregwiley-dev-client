import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// import the project type
import { Project } from '../../types/project.interface';

// import project service
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    imports: [RouterModule, CommonModule, MatListModule, MatCardModule]
})
export class ProjectDetailsComponent implements OnInit {
   project!: Project | undefined;

   // inject the project and router services
   constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

   ngOnInit(): void {
      this.getProject();
   }

   // GET project by id
   getProject(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.projectService.getProject(id).subscribe((project) => (this.project = project));
   }
}
