import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import the shared components
import { HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent } from 'src/app/shared';

// import the favorite project components
import { FavoriteProjectsComponent } from 'src/app/projects';

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
      FavoriteProjectsComponent,
   ],
})
export class MainPageComponent {}
