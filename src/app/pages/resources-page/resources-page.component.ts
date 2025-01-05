import { Component } from '@angular/core';

// import the shared components
import { HeaderComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared';

@Component({
    standalone: true,
    selector: 'app-resources-page',
    templateUrl: './resources-page.component.html',
    styleUrls: ['./resources-page.component.scss'],
    imports: [HeaderComponent, AnnouncementBannerComponent, FooterComponent]
})
export class ResourcesPageComponent {}
