import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular fire auth
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

// import angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
})
export class AuthStatusComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  public userEmail: string | null = null;
  private unsubscribeAuthListener: (() => void) | undefined;
  private auth: Auth = inject(Auth);

  ngOnInit(): void {
    this.unsubscribeAuthListener = onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.displayName ?? null;
    });
  }

  ngOnDestroy(): void {
    // the 'unsubscribeAuthListener' function is called to remove the listener
    if (this.unsubscribeAuthListener) {
      this.unsubscribeAuthListener();
    }
  }
}
