import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import {
   NavbarComponent,
   AnnouncementBannerComponent,
   FooterComponent,
} from '../../components/';

// import the about component
import { SkillListComponent } from '../../components';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrls: ['./about-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      NavbarComponent,
      AnnouncementBannerComponent,
      FooterComponent,
      SkillListComponent,
   ],
})
export class AboutPageComponent {}
