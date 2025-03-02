import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import { HeaderComponent, AnnouncementBannerComponent, FooterComponent } from '../../components';

@Component({
    standalone: true,
    selector: 'app-resources-page',
    templateUrl: './resources-page.component.html',
    styleUrls: ['./resources-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, AnnouncementBannerComponent, FooterComponent]
})
export class ResourcesPageComponent {}
