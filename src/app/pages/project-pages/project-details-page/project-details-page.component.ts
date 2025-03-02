import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../components';

// import project components
import { ProjectDetailsComponent, ProjectDescriptionComponent } from '../../../projects';

// import the project interface
import { Project } from '../../../types/project.interface';

// import the project service
import { ProjectService } from '../../../services/project.service';

@Component({
   standalone: true,
   selector: 'app-project-details-page',
   templateUrl: './project-details-page.component.html',
   styleUrls: ['./project-details-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      NavbarComponent,
      AnnouncementBannerComponent,
      FooterComponent,
      ProjectDetailsComponent,
      ProjectDescriptionComponent,
      RouterModule,
   ],
})
export class ProjectDetailsPageComponent implements OnInit {
   project!: Project | undefined;

   // inject the project service
   constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

   ngOnInit(): void {
      this.getProject();
   }

   // GET project by ID
   getProject(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.projectService.getProjectById(id).subscribe((project) => (this.project = project));
   }
}
