import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-announcement-banner',
   templateUrl: './announcement-banner.component.html',
   styleUrls: ['./announcement-banner.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBannerComponent {
   text = 'This site is currently under construction. Please check back later for updates.';
}
