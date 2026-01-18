import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-announcement-bar',
  templateUrl: './announcement-bar.html',
  styleUrls: ['./announcement-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule],
})
export class AnnouncementBar {
  public readonly dismissed = signal(false);

  public dismiss(): void {
    this.dismissed.set(true);
  }
}
