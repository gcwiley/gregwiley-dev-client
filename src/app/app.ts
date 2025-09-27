import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// shared components
import { AnnouncementBar } from './components';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, AnnouncementBar],
})
export class App {
  title = 'gregwiley.dev';
}
