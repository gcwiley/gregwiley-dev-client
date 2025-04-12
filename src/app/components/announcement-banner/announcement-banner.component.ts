import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-announcement-banner',
   templateUrl: './announcement-banner.component.html',
   styleUrls: ['./announcement-banner.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBannerComponent {
   text = 'Pardon our dust! We are building something great and will be live shortly.';
}
