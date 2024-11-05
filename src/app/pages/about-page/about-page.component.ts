import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared';

// import the about component
import { AboutMeComponent, SkillListComponent } from '../../components';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrls: ['./about-page.component.scss'],
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent, AboutMeComponent, SkillListComponent],
})
export class AboutPageComponent {}
