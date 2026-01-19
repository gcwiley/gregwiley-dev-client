import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
} from '@angular/core';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const STORAGE_KEY = 'announcement-dismissed';

@Component({
  selector: 'app-announcement-bar',
  templateUrl: './announcement-bar.html',
  styleUrls: ['./announcement-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule],
})
export class AnnouncementBar implements OnInit {
  public readonly dismissed = signal(false);

  public ngOnInit(): void {
    this.dismissed.set(localStorage.getItem(STORAGE_KEY) === 'true');
  }

  public dismiss(): void {
    this.dismissed.set(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  }
}
