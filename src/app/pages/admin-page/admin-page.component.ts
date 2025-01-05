import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

// import the project table component
import { ProjectTableComponent } from '../../projects';

@Component({
   standalone: true,
   selector: 'app-admin-page',
   templateUrl: './admin-page.component.html',
   styleUrls: ['./admin-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      CommonModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatTabsModule,
      MatTooltip,
      ProjectTableComponent,
      RouterModule,
   ],
})
export class AdminPageComponent {
   events: string[] = [];
   opened!: boolean;
}
