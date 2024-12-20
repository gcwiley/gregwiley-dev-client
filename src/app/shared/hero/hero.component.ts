import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular material modules
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss'],
    imports: [RouterModule, MatButtonModule]
})
export class HeroComponent {
  title = 'Gregory Wiley';

  subtitle = 'Full Stack Web Developer';
}
