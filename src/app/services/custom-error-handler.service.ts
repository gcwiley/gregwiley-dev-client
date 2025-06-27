import { Injectable, NgZone, inject } from '@angular/core';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService {
  // inject dependencies
  private ngZone = inject(NgZone);
  private snackBar = inject(MatSnackBar);

  public handleError(error: unknown): void {
    this.ngZone.run(() => {
      // opens a snackbar with a message
      this.snackBar.open('There has been an error!', 'DANGER');
    });

    throw error;
  }
}
