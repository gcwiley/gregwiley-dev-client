import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    LogoComponent,
  ],
})
export class NavbarComponent {
  // inject dependencies
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // loading state
  public isSigningOut = false;

  // signs out current user
  public onClickSignOut(): void {
    if (this.isSigningOut) return;
    this.isSigningOut = true;
    this.authService.signOutUser().subscribe({
      next: () => {
        this.isSigningOut = false;
        this.router.navigateByUrl('/signin');
      },
      error: (error) => {
        this.isSigningOut = false;
        console.error(error);
        this.snackBar.open('Error signing out.', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
