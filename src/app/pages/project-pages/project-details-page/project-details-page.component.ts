import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../shared';

// import project components
import { ProjectDetailsComponent, ProjectDescriptionComponent, ProjectTagsComponent } from '../../../projects';

// import the project type
import { Project } from '../../../types/project.interface';

// import the project service
import { ProjectService } from '../../../services/project.service';

@Component({
   standalone: true,
   selector: 'app-project-details-page',
   templateUrl: './project-details-page.component.html',
   styleUrls: ['./project-details-page.component.scss'],
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent, ProjectDetailsComponent, ProjectDescriptionComponent, ProjectTagsComponent, RouterModule],
})
export class ProjectDetailsPageComponent implements OnInit {
   project!: Project | undefined;

   // inject the project service
   constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

   ngOnInit(): void {
      this.getProject();
   }

   // GET project by Id - fix this
   getProject(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.projectService.getProject(id).subscribe((project) => (this.project = project));
   }
}
