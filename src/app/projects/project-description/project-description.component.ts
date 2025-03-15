import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NgIf],
})
export class ProjectDescriptionComponent implements OnInit {
   project!: Project;

   constructor(
      private route: ActivatedRoute,
      private projectService: ProjectService
   ) {}

   public ngOnInit(): void {
      this.getProjectById();
   }

   // GET project by id
   public getProjectById(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.projectService
         .getProjectById(id)
         .subscribe((project) => (this.project = project));
   }
}
