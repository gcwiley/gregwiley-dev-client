import { Component } from '@angular/core';

// import angular material

@Component({
  selector: 'app-announcment-banner',
  templateUrl: './announcment-banner.component.html',
  styleUrls: ['./announcment-banner.component.scss'],
  standalone: true,
  imports: [],
})
export class AnnouncmentBannerComponent {
  text = 'gregwiley.dev is currently in development.';
}
