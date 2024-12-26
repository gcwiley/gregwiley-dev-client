import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared';

@Component({
   selector: 'app-error-page',
   templateUrl: './error-page.component.html',
   styleUrl: './error-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent],
})
export class ErrorPageComponent {}
