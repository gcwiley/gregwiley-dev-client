import { Component } from '@angular/core';

// import shared components
import { HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent } from 'src/app/shared';

// import angular material modules
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AnnouncementBannerComponent, HeroComponent, MatButtonModule],
})
export class NotFoundPageComponent {}
