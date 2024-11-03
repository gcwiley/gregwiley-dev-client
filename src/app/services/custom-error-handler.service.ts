import { Injectable, NgZone } from '@angular/core';

// import angular material modules
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root',
})
export class CustomErrorHandlerService {
   constructor(private ngZone: NgZone, private snackBar: MatSnackBar) {}

   public handleError(error: unknown): void {
      this.ngZone.run(() => {
         // opens a snackbar with a message
         this.snackBar.open('error.unexpected-exception', 'danger');
      });

      throw error;
   }
}
