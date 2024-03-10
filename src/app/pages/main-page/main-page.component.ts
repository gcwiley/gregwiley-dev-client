import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular material modules
import { MatButtonModule } from '@angular/material/button';

// import the shared components
import { HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent } from 'src/app/shared';

// import the favorite project components
import { ProjectCarouselComponent } from 'src/app/projects';

@Component({
   selector: 'app-main-page',
   templateUrl: './main-page.component.html',
   styleUrls: ['./main-page.component.scss'],
   standalone: true,
   imports: [
      RouterModule,
      MatButtonModule,
      HeaderComponent,
      FooterComponent,
      AnnouncementBannerComponent,
      HeroComponent,
      ProjectCarouselComponent,
   ],
})
export class MainPageComponent {}
