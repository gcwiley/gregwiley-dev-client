import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-hero',
   templateUrl: './hero.html',
   styleUrls: ['./hero.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, MatButtonModule],
})
export class Hero {
   // make these inputs so the component is reusable
   public title = input<string>('Greg Wiley');
   public subtitle = input<string>('Full Stack Web Developer')
}
