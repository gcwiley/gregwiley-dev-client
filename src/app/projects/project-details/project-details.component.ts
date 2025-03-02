import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
   standalone: true,
   selector: 'app-project-details',
   templateUrl: './project-details.component.html',
   styleUrls: ['./project-details.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, CommonModule, MatListModule, MatCardModule],
})
export class ProjectDetailsComponent implements OnInit {
   project!: Project | undefined;

   // inject the project and router services
   constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

   public ngOnInit(): void {
      this.getProject();
   }

   // GET project by id
   public getProject(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.projectService.getProjectById(id).subscribe((project) => (this.project = project));
   }
}
