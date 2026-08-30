import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// rxjs
import { debounceTime, distinctUntilChanged } from 'rxjs';

// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
  ],
})
export class SearchBar implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public readonly placeholder = input<string>('Search projects');
  public readonly debounceMs = input<number>(300);
  public readonly navigateOnSearch = input<boolean>(true);

  public readonly searchTerm = output<string>();

  public readonly searchControl = new FormControl('', { nonNullable: true });

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => {
        const trimmed = term.trim();
        this.searchTerm.emit(trimmed);
        if (this.navigateOnSearch() && trimmed.length > 0) {
          this.router.navigate(['/projects'], {
            queryParams: { query: trimmed },
          });
        }
      });
  }

  public onClear(): void {
    this.searchControl.setValue('');
    this.searchTerm.emit('');
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    const term = this.searchControl.value.trim();
    if (this.navigateOnSearch() && term.length > 0) {
      this.router.navigate(['/projects'], {
        queryParams: { query: term },
      });
    }
  }
}