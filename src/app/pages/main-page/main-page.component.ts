import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import shared components
import { HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent } from 'src/app/shared';

// import the angular material modules
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// import the project components
import { FeaturedProjectsComponent } from 'src/app/projects';

// import the project service
import { ProjectService } from 'src/app/services/project.service';

import { Project } from 'src/app/types/project.interface';

@Component({
   selector: 'app-main-page',
   templateUrl: './main-page.component.html',
   styleUrls: ['./main-page.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      RouterModule,
      HeaderComponent,
      FooterComponent,
      AnnouncementBannerComponent,
      HeroComponent,
      MatDividerModule,
      MatIconModule,
      MatCardModule,
      FeaturedProjectsComponent,
   ],
})
export class MainPageComponent implements OnInit {
   // create member variables
   recentProjects: Project[] = [];

   constructor(private projectService: ProjectService) {}

   ngOnInit(): void {
      this.getRecentProjects();
   }

   getRecentProjects(): void {
      this.projectService.getRecentlyCreatedProjects().subscribe((recentProjects) => {
         this.recentProjects = recentProjects;
      });
   }
}
