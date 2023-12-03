import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// import the project service
import { ProjectService } from '../../services/project.service';

@Component({
   selector: 'app-project-actionbar',
   templateUrl: './project-actionbar.component.html',
   styleUrls: ['./project-actionbar.component.scss'],
   standalone: true,
   imports: [MatIconModule, MatButtonModule, MatCardModule],
})
export class ProjectActionBarComponent {
   constructor(private projectService: ProjectService, private router: Router) {}

   // deletes project
   onDeleteProject(id: string) {
      this.projectService.deleteProject(id).subscribe(() => {
         // navigates admin back to the project grid page
         this.router.navigateByUrl('/projects');
      });
   }

   // favorite project
   favoriteProject() {
      console.log('This feature is broken!');
   }
}
