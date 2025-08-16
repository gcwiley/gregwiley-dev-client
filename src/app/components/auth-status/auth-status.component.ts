import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// rxjs
import { Observable, map } from 'rxjs';

// auth service
import { AuthService } from '../../services/auth.service';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterModule, MatToolbarModule, MatButtonModule, MatChipsModule],
})
export class AuthStatusComponent {
  // inject dependencies
  private authService = inject(AuthService);
  private router = inject(Router);

  // expose the isAuthenicated observable from thier service
  public isUserLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$;

  // expose user email
  public userEmail$: Observable<string | null> = this.authService.user$.pipe(
    map((user) => user?.email ?? null)
  );

  // signs out current user
  public onClickSignOut(): void {
    this.authService.signOutUser().subscribe(() => {
      // redirects user to signin page
      this.router.navigateByUrl('/signin');
    });
  }
}
