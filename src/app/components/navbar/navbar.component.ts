import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// auth service
import { AuthService } from '../../services/auth.service';

@Component({
   standalone: true,
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule ],
})
export class NavbarComponent {
   constructor(public authService: AuthService, private router: Router) {}

   // signs out current user
   public onClickSignOut(): void {
      this.authService.signOutUser().subscribe(() => {
         // redirects user to sign in page
         this.router.navigateByUrl('signin');
      })
   }
}
