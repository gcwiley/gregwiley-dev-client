import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// shared components
import { AuthStatusComponent, AnnouncementBarComponent } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, AuthStatusComponent, AnnouncementBarComponent],
})
export class AppComponent {
  title = 'gregwiley.dev';
}
