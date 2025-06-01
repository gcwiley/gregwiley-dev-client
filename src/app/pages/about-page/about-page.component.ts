import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
   NavbarComponent,
   FooterComponent,
} from '../../components/';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrls: ['./about-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      NavbarComponent,
      FooterComponent,
   ],
})
export class AboutPageComponent {}
