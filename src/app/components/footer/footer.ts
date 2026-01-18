import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class Footer {
  public readonly version = VERSION.full;
  public readonly year = new Date().getFullYear();
}
