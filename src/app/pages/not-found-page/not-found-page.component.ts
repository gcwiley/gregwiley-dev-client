import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import the shared components
import { NavbarComponent, FooterComponent, HeroComponent } from '../../shared';

// import angular material modules
import { MatButtonModule } from '@angular/material/button';

@Component({
   standalone: true,
   selector: 'app-not-found-page',
   templateUrl: './not-found-page.component.html',
   styleUrls: ['./not-found-page.component.scss'],
   imports: [RouterModule, NavbarComponent, FooterComponent, HeroComponent, MatButtonModule],
})
export class NotFoundPageComponent {}
