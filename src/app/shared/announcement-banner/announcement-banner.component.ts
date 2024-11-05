import { Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-announcement-banner',
   templateUrl: './announcement-banner.component.html',
   styleUrls: ['./announcement-banner.component.scss'],
   imports: [],
})
export class AnnouncementBannerComponent {
   text = 'gregwiley.dev is currently in development. Features may change.';
}
