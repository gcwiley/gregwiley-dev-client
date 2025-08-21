import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// rxjs
import { Observable, map } from 'rxjs';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

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
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    LogoComponent,
  ],
})
export class NavbarComponent {
  // inject dependencies
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // expose authenticated status for template use
  public isAuthenticated: Observable<boolean> = this.authService.isAuthenticated$;

  // expose user email for template use
  public userEmail$: Observable<string | null> = this.authService.user$.pipe(
    map((user) => user?.email ?? null)
  );

  // signs out current user
  public onClickSignOut(): void {
    this.authService.signOutUser().subscribe({
      next: () => {
        this.snackBar.open('Successfully signed out', 'Close', { duration: 5000 }); // success feedback
        this.router.navigateByUrl('/signin'); // redirects user to signin page
      },
      error: (error) => {
        console.error('Error signing out:', error);
        this.snackBar.open('Error signing out. Please try again.', 'Close', { duration: 5000 }); // error feedback
      },
    });
  }
}
