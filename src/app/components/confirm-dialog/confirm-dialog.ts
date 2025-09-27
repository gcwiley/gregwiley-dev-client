import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
   title: string;
   content: string;
}

@Component({
   standalone: true,
   selector: 'app-confirm-dialog',
   templateUrl: './confirm-dialog.html',
   styleUrl: './confirm-dialog.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatDialogModule, MatButtonModule, MatDialogModule],
})
export class ConfirmDialog {
   // inject dependencies
   public data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
   public dialogRef = inject<MatDialogRef<ConfirmDialog>>(MatDialogRef);
}
