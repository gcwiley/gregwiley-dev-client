import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d";

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, RouterLink],
})
export class MenuComponent {}
