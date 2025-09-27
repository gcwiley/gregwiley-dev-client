import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-announcement-bar',
  templateUrl: './announcement-bar.html',
  styleUrls: ['./announcement-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBar {}
