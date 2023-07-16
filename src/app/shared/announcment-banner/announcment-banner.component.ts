import { Component } from '@angular/core';

// import angular material
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-announcment-banner',
  templateUrl: './announcment-banner.component.html',
  styleUrls: ['./announcment-banner.component.scss'],
  standalone: true,
  imports: [MatToolbarModule],
})
export class AnnouncmentBannerComponent {
  text = 'gregwiley.dev is currently in development.';
}
