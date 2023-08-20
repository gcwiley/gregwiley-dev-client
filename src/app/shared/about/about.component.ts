import { Component } from '@angular/core';

// import angular material modules
import { MatCardModule } from '@angular/material/card';

// import bio text
import { biographyText } from 'src/assets/data/bio-info';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class AboutMeComponent {
  bioText = biographyText;
}
