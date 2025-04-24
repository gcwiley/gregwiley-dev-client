import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent, AnnouncementBarComponent, FooterComponent } from '../../components';

@Component({
   standalone: true,
   selector: 'app-error-page',
   templateUrl: './error-page.component.html',
   styleUrl: './error-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NavbarComponent, AnnouncementBarComponent, FooterComponent],
})
export class ErrorPageComponent {}
