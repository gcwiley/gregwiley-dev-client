import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatIconModule } from '@angular/material/icon';

// shared components
import {
   Navbar,
   Footer,
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
      MatIconModule,
   ],
})
export class AboutPage {}
