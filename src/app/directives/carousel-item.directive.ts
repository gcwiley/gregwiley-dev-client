import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
   selector: '[appCarouselItem]',
   standalone: true,
})
export class CarouselItemDirective implements FocusableOption {
   @HostBinding('attr.role') readonly role = 'listitem';
   @HostBinding('tabindex') tabindex = '-1';

   constructor(readonly element: ElementRef<HTMLElement>) {}

   public focus(): void {
      this.element.nativeElement.focus({ preventScroll: true });
   }
}
