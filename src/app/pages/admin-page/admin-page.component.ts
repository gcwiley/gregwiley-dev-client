import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

// import the project list component
import { ProjectListComponent } from '../../projects';

// import the post list component
import { PostListComponent } from '../../posts';

@Component({
   selector: 'app-admin-page',
   templateUrl: './admin-page.component.html',
   styleUrls: ['./admin-page.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatTabsModule,
      ProjectListComponent,
      PostListComponent,
      RouterModule,
   ],
})
export class AdminPageComponent {
   private breakpointObserver = inject(BreakpointObserver);

   constructor(public auth: AngularFireAuth, private router: Router) {}

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
   );

   // signs out the current user
   onClickSignOut(): void {
      this.auth.signOut().then(() => {
         // navigates user to the sign in page
         this.router.navigateByUrl('/signin');
      });
   }
}
