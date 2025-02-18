import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//  interface for components that can be deactivated
export interface CanComponentDeactivate {
   canDeactivate(): Observable<boolean> | boolean;
}

@Injectable({
   providedIn: 'root',
})
// service for handling component deactivation
export class CanDeactivateGuardService {
   public canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> {
      return component.canDeactivate ? component.canDeactivate() : true;
   }
}
