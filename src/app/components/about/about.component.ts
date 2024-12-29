import { ChangeDetectionStrategy, Component } from '@angular/core';

// import angular material modules
import { MatCardModule } from '@angular/material/card';

// import the bio text
import { biographyText } from '../../../assets/data/bio-info';

@Component({
   selector: 'app-about',
   templateUrl: './about.component.html',
   styleUrls: ['./about.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatCardModule],
})
export class AboutMeComponent {
   bioText = biographyText;
}
