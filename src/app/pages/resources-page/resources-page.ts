import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { Navbar, Footer } from '../../components';

@Component({
  standalone: true,
  selector: 'app-resources-page',
  templateUrl: './resources-page.html',
  styleUrls: ['./resources-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Footer],
})
export class ResourcesPage {}
