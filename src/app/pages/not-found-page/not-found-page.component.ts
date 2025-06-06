import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// shared components
import { NavbarComponent, AnnouncementBarComponent, FooterComponent } from '../../components';

// angular material
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NavbarComponent, AnnouncementBarComponent, FooterComponent, MatButtonModule],
})
export class NotFoundPageComponent {}
