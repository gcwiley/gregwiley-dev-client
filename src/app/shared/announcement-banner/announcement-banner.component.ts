import { Component } from '@angular/core';

@Component({
    selector: 'app-announcement-banner',
    templateUrl: './announcement-banner.component.html',
    styleUrls: ['./announcement-banner.component.scss'],
    imports: []
})
export class AnnouncementBannerComponent {
   text = 'The site is currently in development.';
}
