import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular material modules
import { MatButtonModule } from '@angular/material/button';

@Component({
   standalone: true,
   selector: 'app-hero',
   templateUrl: './hero.component.html',
   styleUrls: ['./hero.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, MatButtonModule],
})
export class HeroComponent {
   title = 'Gregory Wiley';

   subtitle = 'Full Stack Web Developer';
}
