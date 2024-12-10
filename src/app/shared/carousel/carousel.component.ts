import {
   AfterContentInit,
   Component,
   ContentChildren,
   Directive,
   ElementRef,
   HostBinding,
   Inject,
   Input,
   Optional,
   QueryList,
   ViewChild,
   ViewEncapsulation,
} from '@angular/core';

// import interface for focusable items
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';

// import keycodes
import { LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';

// import animation module
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

// import the angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import NgIf - find out what this does.
import { NgIf } from '@angular/common';

// decorator that marks a class as an angular directive
@Directive({
   // eslint-disable-next-line @angular-eslint/directive-selector
   selector: '[carousel-item]',
   standalone: true,
})
export class CarouselItemDirective implements FocusableOption {
   // comment here
   @HostBinding('attr.role') readonly role = 'listitem';
   @HostBinding('tabindex') tabindex = '-1';

   constructor(readonly element: ElementRef<HTMLElement>) {}

   focus(): void {
      this.element.nativeElement.focus({ preventScroll: true });
   }
}

// decorator that marks a class a component
@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, MatButtonModule, MatIconModule]
})
export class CarouselComponent implements AfterContentInit {
   // find out what this does
   @Input('aria-label') ariaLabel: string | undefined;
   @ContentChildren(CarouselItemDirective) items!: QueryList<CarouselItemDirective>;
   @ViewChild('list') list!: ElementRef<HTMLElement>;
   @HostBinding('class.animations-disabled') readonly animationsDisabled: boolean;

   // set member variables
   position = 0;
   showPrevArrow = false;
   showNextArrow = true;
   index = 0;
   private _keyManager!: FocusKeyManager<CarouselItemDirective>;

   onKeydown({ keyCode }: KeyboardEvent) {
      const manager = this._keyManager;
      const previousActiveIndex = manager.activeItemIndex; // index of the currently active item

      // if the keycode is left arrow
      if (keyCode === LEFT_ARROW) {
         manager.setPreviousItemActive(); // Sets the active item to a previous enabled item in the list.
         // if the keycode is right arrow
      } else if (keyCode === RIGHT_ARROW) {
         manager.setNextItemActive(); // Sets the active item to the next enabled item in the list.
      } else if (keyCode === TAB && !manager.activeItem) {
         manager.setFirstItemActive(); // Sets the active item to the first enabled item in the list.
      }

      if (manager.activeItemIndex != null && manager.activeItemIndex !== previousActiveIndex) {
         this.index = manager.activeItemIndex;
         this._updateItemTabIndices();

         if (this._isOutOfView(this.index)) {
            this._scrollToActiveItem();
         }
      }
   }

   constructor(@Optional() @Inject(ANIMATION_MODULE_TYPE) animationsModule?: string) {
      this.animationsDisabled = animationsModule === 'NoopAnimations';
   }

   ngAfterContentInit(): void {
      this._keyManager = new FocusKeyManager<CarouselItemDirective>(this.items);
   }

   // Goes to the next set of items
   next() {
      for (let i = this.index; i < this.items.length; i++) {
         if (this._isOutOfView(i)) {
            this.index = i;
            this._scrollToActiveItem();
            break;
         }
      }
   }

   // goes to the previous set of items
   previous() {
      for (let i = this.index; i > -1; i--) {
         if (this._isOutOfView(i)) {
            this.index = i;
            this._scrollToActiveItem();
            break;
         }
      }
   }

   // updates the 'tabindex' of each of the items based on thier active state
   private _updateItemTabIndices() {
      this.items.forEach((item: CarouselItemDirective) => {
         if (this._keyManager != null) {
            item.tabindex = item === this._keyManager.activeItem ? '0' : '-1';
         }
      });
   }

   // scrolls an item into the viewport
   private _scrollToActiveItem() {
      if (!this._isOutOfView(this.index)) {
         return;
      }

      const itemsArray = this.items.toArray();
      let targetItemIndex = this.index;

      // only shift the carousel by one if we are going forward.
      // this looks better compared to moving the carousel by an entire page
      if (this.index > 0 && !this._isOutOfView(this.index - 1)) {
         targetItemIndex = itemsArray.findIndex((_, i) => !this._isOutOfView(i)) + 1;
      }

      this.position = itemsArray[targetItemIndex].element.nativeElement.offsetLeft;
      this.list.nativeElement.style.transform = `translateX(-${this.position}px)`;
      this.showPrevArrow = this.index > 0;
      this.showNextArrow = false;

      for (let i = itemsArray.length - 1; i > -1; i--) {
         if (this._isOutOfView(i, 'end')) {
            this.showNextArrow = true;
            break;
         }
      }
   }

   // checks whether an item at a spcific index is outside of the viewport
   private _isOutOfView(index: number, side?: 'start' | 'end') {
      const { offsetWidth, offsetLeft } = this.items.toArray()[index].element.nativeElement;

      if ((!side || side === 'start') && offsetLeft - this.position < 0) {
         return true;
      }

      return (!side || side === 'end') && offsetWidth + offsetLeft - this.position > this.list.nativeElement.clientWidth;
   }
}
