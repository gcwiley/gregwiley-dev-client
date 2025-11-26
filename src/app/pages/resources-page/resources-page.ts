import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { Navbar, Footer } from '../../components';

@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.html',
  styleUrls: ['./resources-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Footer],
})
export class ResourcesPage {}
