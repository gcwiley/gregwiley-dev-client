import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material

@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class SearchBar {}
