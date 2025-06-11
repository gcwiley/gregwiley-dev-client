import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
   standalone: true,
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
})
export class HeaderComponent implements OnInit {
   isDark: boolean | undefined;

   constructor(public auth: AngularFireAuth, private router: Router, private overlayContainer: OverlayContainer) {}

   ngOnInit(): void {


   

   // signs out the current user
   onClickSignOut(): void {
      this.auth.signOut().then(() => {
         // navigates user to the sign in page
         this.router.navigateByUrl('/signin');
      });
   }
}
