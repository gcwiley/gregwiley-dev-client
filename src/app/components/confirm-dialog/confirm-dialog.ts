import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// angular material
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
   title: string;
   message: string;
   confirmText: string;
   cancelText: string;
   color: 'primary' | 'accent' | 'warn';
}

@Component({
   selector: 'app-confirm-dialog',
   templateUrl: './confirm-dialog.html',
   styleUrl: './confirm-dialog.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatDialogModule, MatButtonModule, MatDialogModule],
})
export class ConfirmDialog {
   // inject dependencies
   public readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
