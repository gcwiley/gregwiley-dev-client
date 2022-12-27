import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  constructor(public auth: AngularFireAuth, private router: Router) {}

  onClickSignOut(): void {
    this.auth.signOut().then(() => this.router.navigateByUrl('/signin'));
  }
}
