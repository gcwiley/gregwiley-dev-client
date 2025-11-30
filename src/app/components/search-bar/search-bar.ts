import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// rxjs
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
],
})
export class SearchBar implements OnDestroy {
  @Output() public searchTerm = new EventEmitter<string>();

  public searchControl = new FormControl('');

  private sub: Subscription;

  constructor() {
    // emit debounced, trimmed terms
    this.sub = this.searchControl.valueChanges
      .pipe(
        map((v) => (v == null ? '' : String(v).trim())),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((term) => this.searchTerm.emit(term));
  }

  public onClear(): void {
    this.searchControl.setValue('');
    this.searchTerm.emit('');
  }

  public onEnter(evt: KeyboardEvent): void {
    evt.preventDefault();
    const term = (this.searchControl.value ?? '').toString().trim();
    this.searchTerm.emit(term);
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
