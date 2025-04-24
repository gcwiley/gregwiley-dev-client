import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent, AnnouncementBarComponent, FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, AnnouncementBarComponent, FooterComponent],
})
export class ResourcesPageComponent {}
