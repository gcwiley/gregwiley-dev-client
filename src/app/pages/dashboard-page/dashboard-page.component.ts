import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent {

    
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
