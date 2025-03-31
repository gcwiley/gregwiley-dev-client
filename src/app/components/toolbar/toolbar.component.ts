import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  public userEmail: string | null | undefined = null;
  private authSubscription: Subscription | undefined;
  // instead of injecting AngularFireAuth, we inject the Auth service using the inject() function
  // this is how you get dependencies in the modular SDK
  private auth: Auth = inject(Auth);

  ngOnInit(): void {
    // the subscription is created directly
    this.authSubscription = new Subscription(() => {
      // we use the 'onAuthStateChanged' function to listen to authenication state changes. 
      // this function takes the 'Auth' instance and a callback function
      onAuthStateChanged(this.auth, (user) => {
        this.isLoggedIn = !!user;
        this.userEmail = user?.displayName
      });
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
