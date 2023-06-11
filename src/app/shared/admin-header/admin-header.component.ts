import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  @Output() sideNavToggled = new EventEmitter<void>();

  toggleSidebar() {
    // emits an event containing a given value
    this.sideNavToggled.emit();
  }
}
