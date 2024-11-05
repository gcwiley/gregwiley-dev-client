import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, CarouselComponent, FooterComponent, LogoComponent } from '../../shared';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project interface
import { Project } from '../../types/project.interface';

@Component({
   standalone: true,
   selector: 'app-home-page',
   templateUrl: './home-page.component.html',
   styleUrls: ['./home-page.component.scss'],
   imports: [
      RouterModule,
      MatCardModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      LogoComponent,
      NavbarComponent,
      AnnouncementBannerComponent,
      CarouselComponent,
      FooterComponent,
   ],
})
export class HomePageComponent implements OnInit {
   recentProjects!: Project[];

   constructor(private projectService: ProjectService) {}

   ngOnInit(): void {
      this.getRecentProjects();
   }

   // get recent projects from server
   getRecentProjects(): void {
      this.projectService
         .getRecentlyCreatedProjects()
         .subscribe((recentProjects) => (this.recentProjects = recentProjects));
   }
}
