import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent, FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, FooterComponent],
})
export class ErrorPageComponent {}
