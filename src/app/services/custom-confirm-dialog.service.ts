import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// angular material
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialog, ConfirmDialogData } from '../components';

// define the types of dialogs available
export enum CustomConfirmDialog {
  Delete = 'delete',
  UnsavedChanges = 'unsaved',
  ConfirmAction = 'confirm',
}

@Injectable({
  providedIn: 'root',
})
export class CustomConfirmDialogService {
  private dialog = inject(MatDialog);

  public openCustomConfirmDialog(
    type: CustomConfirmDialog,
  ): Observable<boolean> {
    const config = this.getDialogConfig(type);

    return this.dialog
      .open(ConfirmDialog, {
        width: '400px',
        disableClose: true, // user must click a button to close
        data: config,
      })
      .afterClosed();
  }

  private getDialogConfig(type: CustomConfirmDialog): ConfirmDialogData {
    switch (type) {
      case CustomConfirmDialog.Delete:
        return {
          title: 'Confirm Deletion',
          message:
            'Are you sure you want to delete this item? This action cannot be undone.',
          confirmText: 'Delete',
          cancelText: 'Cancel',
          color: 'warn', // red button for dangerous actions
        };

      case CustomConfirmDialog.UnsavedChanges:
        return {
          title: 'Unsaved Changes',
          message: 'You have unsaved changes. Are you sure you want to leave?',
          confirmText: 'Leave',
          cancelText: 'Stay',
          color: 'accent',
        };

      case CustomConfirmDialog.ConfirmAction:
      default:
        return {
          title: 'Confirm Action',
          message: 'Are you sure you want to proceed?',
          confirmText: 'Yes',
          cancelText: 'No',
          color: 'primary',
        };
    }
  }
}
