import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true,
})
export class HeroComponent {
  title = 'Gregory Wiley';

  subtitle = 'Full Stack Web Developer';
}
