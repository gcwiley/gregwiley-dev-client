import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// import the project service
import { ProjectService } from '../../services/project.service';

@Component({
   selector: 'app-project-toolbar',
   templateUrl: './project-toolbar.component.html',
   styleUrls: ['./project-toolbar.component.scss'],
   standalone: true,
   imports: [MatIconModule, MatButtonModule, MatCardModule],
})
export class ProjectToolbarComponent {
   constructor(private projectService: ProjectService, private router: Router) {}

   onDeleteProject(id: string) {
      this.projectService.deleteProject(id).subscribe(() => {
         // navigates admin back to the project grid page
         this.router.navigateByUrl('/projects');
      });
   }
}
