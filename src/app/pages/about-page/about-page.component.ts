import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
   NavbarComponent,
   AnnouncementBarComponent,
   FooterComponent,
} from '../../components/';

// about component
import { SkillListComponent } from '../../components';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrls: ['./about-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      NavbarComponent,
      AnnouncementBarComponent,
      FooterComponent,
      SkillListComponent,
   ],
})
export class AboutPageComponent {}
