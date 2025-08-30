import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';

// rxjs
import { filter, first, switchMap, catchError, throwError } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// project service
import { ProjectService } from '../services/project.service';

// custom dialog service
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  standalone: true,
  selector: '[appProjectDelete]',
})
export class ProjectDeleteDirective {
  public id = input.required<string>({ alias: 'appProjectDelete' });
  private readonly snackBarDuration = 5000;

  @Output() public deleted = new EventEmitter<string>();

  //initialize the directive dependencies
  private projectService = inject(ProjectService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  @HostListener('click')
  public onClick(): void {
    // opens a custom confirmation dialog of type Delete
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.projectService.deleteProjectById(this.id())),
        catchError((error) => {
          console.error('Error deleting project:', error); // log the error
          this.snackBar.open('Unable to delete project.', 'Close', { duration: this.snackBarDuration }); // show error snackbar
          return throwError(() => new Error('Project deletion failed.')); // re-throw a new error
        })
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          // opens a success snackbar
          this.snackBar.open('Project successfully deleted.', 'Close', { duration: this.snackBarDuration});
        },
      });
  }
}
