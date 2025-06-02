import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// shared components
import {
  NavbarComponent,
  FooterComponent,
  HeroComponent,
} from '../../components';

// project components
import { ProjectGridComponent } from '../../projects';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NavbarComponent,
    FooterComponent,
    ProjectGridComponent,
    HeroComponent,
  ],
})
export class HomePageComponent {}
