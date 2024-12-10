import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// import the auth service
import { AuthService } from '../../services/auth.service';

// import angular material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// import the website logo
import { LogoComponent } from '../logo/logo.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, LogoComponent]
})
export class NavbarComponent {
   constructor(public auth: AuthService, private router: Router) {}

   // signs out the current user
   onClickSignOut(): void {
      this.auth.signOut().then(() => {
         // navigates user to the sign in page
         this.router.navigateByUrl('/signin');
      });
   }
}
