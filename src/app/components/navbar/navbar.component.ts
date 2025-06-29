import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// shared components
import { LogoComponent } from '../logo/logo.component';

// auth service
import { AuthService } from '../../services/auth.service';

@Component({
   standalone: true,
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, LogoComponent],
})
export class NavbarComponent {
   // inject dependencies
   public authService = inject(AuthService);
   public router = inject(Router);

   // signs out current user - Fix this!
   public onClickSignOut(): void {
      this.authService.signOutUser().subscribe(() => {
         // redirects user to sign in page
         this.router.navigateByUrl('signin');
      })
   }
}
