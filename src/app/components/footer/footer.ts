import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class Footer {
  version = VERSION.full;
  year = new Date().getFullYear();
}
