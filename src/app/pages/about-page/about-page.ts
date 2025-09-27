import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
   Navbar,
   Footer,
   Menu,
} from '../../components/';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.html',
   styleUrls: ['./about-page.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      Navbar,
      Footer,
      Menu,
   ],
})
export class AboutPage {}
