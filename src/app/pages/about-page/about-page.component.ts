import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared';

// import the about component
import { AboutMeComponent, SkillListComponent } from '../../components';

@Component({
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrls: ['./about-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent, AboutMeComponent, SkillListComponent],
})
export class AboutPageComponent {}
