import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// rxjs
import { filter, first, switchMap } from 'rxjs';

// project service
import { ProjectService } from '../services/project.service';

// custom dialog
import { CustomConfirmDialog, CustomConfirmDialogService } from '../services/custom-confirm-dialog.service';

@Directive({
   standalone: true,
   selector: '[appProjectDelete]',
})
export class ProjectDeleteDirective {
   public id = input.required<string>({ alias: 'appProjectDelete' });
   
   @Output() public deleted = new EventEmitter<string>();

   // constructor initialized the directive dependencies
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
            filter((res) => !!res),
            switchMap(() => this.projectService.deleteProjectById(this.id()))
         )
         .subscribe({
            next: () => {
               // when data is emitted, it emits the deleted event
               this.deleted.emit(this.id());
               // opens a success snackbar
               this.snackBar.open('Project Deleted', 'Close');
            },
            error: (error) => {
               console.error(error)
               this.snackBar.open('Failed', 'Close');
            },
         });
   }
}
