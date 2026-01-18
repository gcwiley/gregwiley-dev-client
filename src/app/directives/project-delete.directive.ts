import {
  Directive,
  HostListener,
  output,
  input,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap, catchError, finalize, EMPTY } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// project service
import { ProjectService } from '../services/project.service';

import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appProjectDelete]',
})
export class ProjectDeleteDirective {
  public id = input.required<string>({ alias: 'appProjectDelete' });

  public deleted = output<string>();

  private readonly projectService = inject(ProjectService);
  private readonly confirm = inject(CustomConfirmDialogService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  private isDeleting = signal(false); 
  private readonly snackBarDuration = 5000;

  @HostListener('click')
  public onClick(): void {
    if (this.isDeleting()) return; 
    this.isDeleting.set(true);

    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.projectService.deleteProjectById(this.id())),
        catchError((error) => {
          console.error('Error deleting project:', error);
          this.snackBar.open('Unable to delete project.', 'Close', {
            duration: this.snackBarDuration,
          });
          return EMPTY;
        }),
        finalize(() => this.isDeleting.set(false)),
      )
      .subscribe(() => {
        this.deleted.emit(this.id());
        this.snackBar.open('Project successfully deleted.', 'Close', {
          duration: this.snackBarDuration,
        });
      });
  }
}
