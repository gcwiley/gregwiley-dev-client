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

  private projectService = inject(ProjectService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  private isDeleting = signal(false); // signal state
  private readonly snackBarDuration = 5000;

  @HostListener('click')
  public onClick(): void {
    if (this.isDeleting()) return; // read signal
    this.isDeleting.set(true); // set signal

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
        finalize(() => this.isDeleting.set(false)), // reset signal
      )
      .subscribe(() => {
        this.deleted.emit(this.id());
        this.snackBar.open('Project successfully deleted.', 'Close', {
          duration: this.snackBarDuration,
        });
      });
  }
}
