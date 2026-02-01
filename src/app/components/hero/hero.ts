import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

// angular material
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-hero',
   templateUrl: './hero.html',
   styleUrls: ['./hero.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, MatButtonModule, NgOptimizedImage],
})
export class Hero {
   // make these inputs so the component is reusable
   public readonly title = input<string>('Greg Wiley');
   public readonly subtitle = input<string>('Full Stack Web Developer')
}
