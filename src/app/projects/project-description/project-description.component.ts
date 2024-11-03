import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

// import the project interface
import { Project } from '../../types/project.interface';

// import the project service
import { ProjectService } from '../../services/project.service';

@Component({
   standalone: true,
   selector: 'app-project-description',
   templateUrl: './project-description.component.html',
   styleUrls: ['./project-description.component.scss'],
   imports: [NgIf],
})
export class ProjectDescriptionComponent implements OnInit {
   project!: Project;

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
