import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// angular material 
import { MatDialog } from '@angular/material/dialog';

// dialog component
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
   providedIn: 'root',
})
export class ConfirmDialogService {
   // inject dependencies
   private dialog = inject(MatDialog);

   public open(title: string, content: string): Observable<boolean> {
      // uses the MatDialog service to open a dialog
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         // sets the dialog to have a small width
         width: 'sm',
         // passes data to the component, the content is set to the title that will be displayed on the dialog
         data: { title, content },
      });
      // subscribes to the dialog's closing event.
      return dialogRef.afterClosed();
   }
}
