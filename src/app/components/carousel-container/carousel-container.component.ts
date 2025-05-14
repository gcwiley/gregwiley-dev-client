import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatIconModule } from '@angular/material/icon';

@Component({
   standalone: true,
   selector: 'app-carousel-container',
   templateUrl: './carousel-container.component.html',
   styleUrl: './carousel-container.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatIconModule],
})
export class CarouselContainerComponent {}
