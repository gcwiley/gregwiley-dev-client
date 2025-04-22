import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent],
})
export class ResourcesPageComponent {}
