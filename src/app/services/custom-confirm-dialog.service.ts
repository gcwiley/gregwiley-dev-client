import { Injectable, inject } from '@angular/core';

// rxjs
import { first, map, Observable } from 'rxjs';

// confirm dialog service
import { ConfirmDialogService } from './confirm-dialog.service';

export enum CustomConfirmDialog {
   Delete,
   UnsavedWork,
}

@Injectable({
   providedIn: 'root',
})
export class CustomConfirmDialogService {
   // inject dependencies
   private confirm = inject(ConfirmDialogService);
   
   public openCustomConfirmDialog(type: CustomConfirmDialog): Observable<boolean> {
      const title = this.getTitle(type);
      const content = this.getContent(type);
      return this.open(title, content);
   }

   private getTitle(type: CustomConfirmDialog) {
      switch (type) {
         case CustomConfirmDialog.Delete:
            // fix this
            return 'custom-confirm-dialog.delete-post.content';
         case CustomConfirmDialog.UnsavedWork:
            return 'fix-this!';
         default:
            return 'fix-this!';
      }
   }

   private getContent(type: CustomConfirmDialog) {
      switch (type) {
         case CustomConfirmDialog.Delete:
            return 'custom-confirm-dialog.delete-post.content';
         case CustomConfirmDialog.UnsavedWork:
            return 'fix-this!';
         default:
            return 'fix-this!';
      }
   }

   private open(title: string, content: string): Observable<boolean> {
      return this.confirm.open(title, content).pipe(
         first(),
         map((res) => !!res)
      );
   }
}
