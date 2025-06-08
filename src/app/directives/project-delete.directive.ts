import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, first, switchMap } from 'rxjs';

// project service
import { ProjectService } from '../services/project.service';

// custom dialog
import { CustomConfirmDialog, CustomConfirmDialogService } from '../services/custom-confirm-dialog.service';

@Directive({
   selector: '[appProjectDelete]',
   standalone: true,
})
export class ProjectDeleteDirective {
   
   public id = input.required<string>({ alias: 'appProjectDelete' });
   
   @Output() public deleted = new EventEmitter<string>();

   // constructor initialized the directive dependencies
   constructor(private projectService: ProjectService, private confirm: CustomConfirmDialogService, private snackbar: MatSnackBar) {}

   @HostListener('click')

   public onClick(): void {
      // opens a custom confirmation dialog of type Delete
      this.confirm
         .openCustomConfirmDialog(CustomConfirmDialog.Delete)
         .pipe(
            first(),
            filter((res) => !!res),
            switchMap(() => this.projectService.deleteProjectById(this.id()))
         )
         .subscribe({
            next: () => {
               // when data is emitted, it emits the deleted event
               this.deleted.emit(this.id());
               // opens a success snackbar
               this.snackbar.open('Project Deleted', 'Close');
            },
            error: () => {
               this.snackbar.open('Failed', 'Close');
            },
         });
   }
}
