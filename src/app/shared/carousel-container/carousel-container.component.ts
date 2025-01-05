import { Component } from '@angular/core';

// import angular material modules
import { MatIconModule } from '@angular/material/icon';

@Component({
   standalone: true,
   selector: 'app-carousel-container',
   templateUrl: './carousel-container.component.html',
   styleUrl: './carousel-container.component.scss',
   imports: [MatIconModule],
})
export class CarouselContainerComponent {}
