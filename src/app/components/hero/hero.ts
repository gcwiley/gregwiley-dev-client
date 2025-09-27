import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';

@Component({
   standalone: true,
   selector: 'app-hero',
   templateUrl: './hero.html',
   styleUrls: ['./hero.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, MatButtonModule],
})
export class Hero {
   title = 'Gregory Wiley';
   subtitle = 'Full Stack Web Developer';
}
