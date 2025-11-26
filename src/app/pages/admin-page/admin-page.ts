import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

// project components
import { ProjectTable } from '../../projects';

@Component({
   selector: 'app-admin-page',
   templateUrl: './admin-page.html',
   styleUrls: ['./admin-page.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltip,
    ProjectTable,
    RouterModule
],
})
export class AdminPage {
   events: string[] = [];
   opened!: boolean;
}
